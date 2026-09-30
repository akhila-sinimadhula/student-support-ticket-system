from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.pending_action import PendingAction
from models.ticket import Ticket
from schemas.pending_action import PendingActionCreate
from services.ticket_activity_service import create_ticket_activity
from services.escalation_service import escalate_ticket
from utils.pending_action_constants import (
    PENDING_ACTION_STATUS_PENDING,
    PENDING_ACTION_STATUS_COMPLETED,
    PENDING_ACTION_STATUS_OVERDUE
)

def create_pending_action(
    db: Session,
    action_data: PendingActionCreate
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == action_data.ticket_id)
        .first()
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    action = PendingAction(
        ticket_id=action_data.ticket_id,
        action_description=action_data.action_description,
        due_at=action_data.due_at
    )

    db.add(action)
    db.commit()
    db.refresh(action)
    create_ticket_activity(
    db=db,
    ticket_id=action.ticket_id,
    activity_type="Pending Action Created",
    description=(
        f"Pending action created: "
        f"{action.action_description}"
    )
)

    return action


def get_pending_actions(
    db: Session,
    ticket_id: int
):
    return (
        db.query(PendingAction)
        .filter(PendingAction.ticket_id == ticket_id)
        .order_by(PendingAction.created_at.asc())
        .all()
    )

def mark_overdue_pending_actions(
    db: Session
):
    current_time = datetime.utcnow()

    overdue_actions = (
        db.query(PendingAction)
        .filter(
            PendingAction.is_completed == False,
            PendingAction.due_at != None,
            PendingAction.due_at < current_time,
            PendingAction.status == PENDING_ACTION_STATUS_PENDING
        )
        .all()
    )

    for action in overdue_actions:
        action.status = PENDING_ACTION_STATUS_OVERDUE

        create_ticket_activity(
            db=db,
            ticket_id=action.ticket_id,
            activity_type="Pending Action Overdue",
            description=(
                f"Pending action overdue: "
                f"{action.action_description}"
            )
        )

        ticket = (
            db.query(Ticket)
            .filter(Ticket.id == action.ticket_id)
            .first()
        )

        if ticket is not None and not ticket.is_escalated:
            escalate_ticket(
                db=db,
                ticket_id=action.ticket_id
            )

    db.commit()

    return overdue_actions

    for action in overdue_actions:
        action.status = PENDING_ACTION_STATUS_OVERDUE
        create_ticket_activity(
        db=db,
        ticket_id=action.ticket_id,
        activity_type="Pending Action Overdue",
        description=(
            f"Pending action overdue: "
            f"{action.action_description}"
        )
        )
        ticket = (
        db.query(Ticket)
        .filter(Ticket.id == action.ticket_id)
        .first()
    )

    if ticket is not None and not ticket.is_escalated:
        escalate_ticket(
            db=db,
            ticket_id=action.ticket_id
        )

    db.commit()

    return overdue_actions
def complete_pending_action(
    db: Session,
    action_id: int
):
    action = (
        db.query(PendingAction)
        .filter(PendingAction.id == action_id)
        .first()
    )

    if action is None:
        raise HTTPException(
            status_code=404,
            detail="Pending action not found"
        )

    if action.is_completed:
        raise HTTPException(
            status_code=400,
            detail="Pending action is already completed"
        )

    action.status = "Completed"
    action.is_completed = True
    action.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(action)
    create_ticket_activity(
    db=db,
    ticket_id=action.ticket_id,
    activity_type="Pending Action Completed",
    description=(
        f"Pending action completed: "
        f"{action.action_description}"
    )
)

    return action