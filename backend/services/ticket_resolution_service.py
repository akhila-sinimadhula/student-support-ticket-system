from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.ticket import Ticket
from models.ticket_resolution import TicketResolution
from schemas.ticket_resolution import TicketResolutionCreate
from services.ticket_activity_service import create_ticket_activity
from models.pending_action import PendingAction



def create_ticket_resolution(
    db: Session,
    resolution_data: TicketResolutionCreate
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == resolution_data.ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    if ticket.status == "Resolved":
        raise HTTPException(
            status_code=400,
            detail="Ticket is already resolved"
        )

    existing_resolution = (
        db.query(TicketResolution)
        .filter(
            TicketResolution.ticket_id == resolution_data.ticket_id
        )
        .first()
    )

    if existing_resolution is not None:
        raise HTTPException(
            status_code=400,
            detail="Resolution already exists for this ticket"
        )

    resolution = TicketResolution(
        ticket_id=resolution_data.ticket_id,
        resolution_notes=resolution_data.resolution_notes,
        resolved_at=datetime.utcnow()
    )

    ticket.status = "Resolved"
    pending_actions = (
        db.query(PendingAction)
        .filter(
            PendingAction.ticket_id == ticket.id,
            PendingAction.is_completed == False
        )
        .all()
    )

    for action in pending_actions:
        action.status = "Completed"
        action.is_completed = True
        action.completed_at = datetime.utcnow()

        create_ticket_activity(
            db=db,
            ticket_id=ticket.id,
            activity_type="Pending Action Completed",
            description=(
                f"Pending action automatically completed: "
                f"{action.action_description}"
            )
        )

    db.add(resolution)
    db.commit()
    db.refresh(resolution)

    create_ticket_activity(
        db=db,
        ticket_id=ticket.id,
        activity_type="Ticket Resolved",
        description=(
            f"Ticket {ticket.ticket_number} was resolved"
        )
    )

    return resolution


def get_ticket_resolution(
    db: Session,
    ticket_id: int
):
    resolution = (
        db.query(TicketResolution)
        .filter(
            TicketResolution.ticket_id == ticket_id
        )
        .first()
    )

    if resolution is None:
        raise HTTPException(
            status_code=404,
            detail="Resolution not found"
        )

    return resolution