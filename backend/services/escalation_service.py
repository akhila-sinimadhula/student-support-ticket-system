from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.ticket import Ticket
from services.ticket_activity_service import create_ticket_activity


def escalate_ticket(
    db: Session,
    ticket_id: int
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    if ticket.is_escalated:
        raise HTTPException(
            status_code=400,
            detail="Ticket is already escalated"
        )

    ticket.is_escalated = True

    db.commit()
    db.refresh(ticket)

    create_ticket_activity(
        db=db,
        ticket_id=ticket.id,
        activity_type="Ticket Escalated",
        description=(
            f"Ticket {ticket.ticket_number} was escalated"
        )
    )

    return ticket