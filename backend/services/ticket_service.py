from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.staff import Staff
from models.student import Student
from models.ticket import Ticket
from schemas.ticket import TicketCreate
from services.ticket_activity_service import create_ticket_activity
from utils.ticket_constants import (
    TICKET_STATUS_OPEN,
    TICKET_STATUS_IN_PROGRESS,
    TICKET_STATUS_PENDING,
    TICKET_STATUS_RESOLVED,
    TICKET_STATUS_CLOSED
)


def create_ticket(db: Session, ticket_data: TicketCreate):
    student = (
        db.query(Student)
        .filter(Student.id == ticket_data.student_id)
        .first()
    )

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    last_ticket = (
        db.query(Ticket)
        .order_by(Ticket.id.desc())
        .first()
    )

    if last_ticket:
        next_number = last_ticket.id + 1
    else:
        next_number = 1

    ticket_number = f"TKT-{next_number:03d}"

    ticket = Ticket(
        ticket_number=ticket_number,
        student_id=ticket_data.student_id,
        subject=ticket_data.subject,
        description=ticket_data.description,
        priority=ticket_data.priority
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    create_ticket_activity(
        db=db,
        ticket_id=ticket.id,
        activity_type="Ticket Created",
        description=f"Ticket {ticket.ticket_number} was created"
    )

    if ticket.priority == "Critical":
        ticket.is_escalated = True

        db.commit()
        db.refresh(ticket)

        create_ticket_activity(
            db=db,
            ticket_id=ticket.id,
            activity_type="Ticket Escalated",
            description=(
                f"Ticket {ticket.ticket_number} was automatically "
                f"escalated because priority is Critical"
            )
        )

    return ticket


def get_tickets(db: Session):
    return db.query(Ticket).all()


def get_ticket_by_id(db: Session, ticket_id: int):
    return (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )


def get_tickets_by_student(
    db: Session,
    student_id: int
):
    return (
        db.query(Ticket)
        .filter(Ticket.student_id == student_id)
        .order_by(Ticket.created_at.desc())
        .all()
    )


def update_ticket_status(
    db: Session,
    ticket_id: int,
    new_status: str
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

    allowed_statuses = {
        TICKET_STATUS_OPEN,
        TICKET_STATUS_IN_PROGRESS,
        TICKET_STATUS_PENDING,
        TICKET_STATUS_RESOLVED,
        TICKET_STATUS_CLOSED
    }

    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid ticket status"
        )

    old_status = ticket.status

    if old_status == new_status:
        raise HTTPException(
            status_code=400,
            detail=f"Ticket is already in {new_status} status"
        )

    ticket.status = new_status

    db.commit()
    db.refresh(ticket)

    create_ticket_activity(
        db=db,
        ticket_id=ticket.id,
        activity_type="Status Changed",
        description=(
            f"Status changed from {old_status} "
            f"to {new_status}"
        )
    )

    return ticket


def assign_ticket(
    db: Session,
    ticket_id: int,
    staff_id: int
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

    staff = (
        db.query(Staff)
        .filter(Staff.id == staff_id)
        .first()
    )

    if staff is None:
        raise HTTPException(
            status_code=404,
            detail="Staff member not found"
        )

    if ticket.assigned_staff_id == staff.id:
        raise HTTPException(
            status_code=400,
            detail=f"Ticket is already assigned to {staff.name}"
        )

    ticket.assigned_staff_id = staff.id

    db.commit()
    db.refresh(ticket)

    create_ticket_activity(
        db=db,
        ticket_id=ticket.id,
        activity_type="Ticket Assigned",
        description=(
            f"Ticket {ticket.ticket_number} was assigned "
            f"to {staff.name}"
        )
    )

    return ticket


def update_ticket_priority(
    db: Session,
    ticket_id: int,
    new_priority: str
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

    old_priority = ticket.priority

    if old_priority == new_priority:
        raise HTTPException(
            status_code=400,
            detail=f"Ticket is already {new_priority} priority"
        )

    ticket.priority = new_priority

    db.commit()
    db.refresh(ticket)

    create_ticket_activity(
        db=db,
        ticket_id=ticket.id,
        activity_type="Priority Changed",
        description=(
            f"Priority changed from "
            f"{old_priority} to {new_priority}"
        )
    )

    return ticket