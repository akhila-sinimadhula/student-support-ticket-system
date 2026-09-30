from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from schemas.ticket import (
    TicketCreate,
    TicketResponse,
    TicketStatusUpdate,
    TicketAssignmentUpdate,
    TicketPriorityUpdate
)
from services.ticket_service import (
    create_ticket,
    get_tickets,
    get_ticket_by_id,
    get_tickets_by_student,
    update_ticket_status,
    assign_ticket,
    update_ticket_priority
)
from services.escalation_service import escalate_ticket
from utils.auth_dependency import get_current_staff
from utils.role_permissions import require_staff


router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)


@router.post("/", response_model=TicketResponse)
def create_ticket_endpoint(
    ticket_data: TicketCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return create_ticket(
        db,
        ticket_data
    )


@router.get("/", response_model=list[TicketResponse])
def get_tickets_endpoint(
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return get_tickets(db)


@router.get(
    "/student/{student_id}",
    response_model=list[TicketResponse]
)
def get_student_tickets_endpoint(
    student_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return get_tickets_by_student(
        db,
        student_id
    )


@router.get(
    "/{ticket_id}",
    response_model=TicketResponse
)
def get_ticket_endpoint(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    ticket = get_ticket_by_id(
        db,
        ticket_id
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


@router.patch(
    "/{ticket_id}/status",
    response_model=TicketResponse
)
def update_ticket_status_endpoint(
    ticket_id: int,
    status_data: TicketStatusUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return update_ticket_status(
        db,
        ticket_id,
        status_data.status
    )


@router.patch(
    "/{ticket_id}/assign",
    response_model=TicketResponse
)
def assign_ticket_endpoint(
    ticket_id: int,
    assignment_data: TicketAssignmentUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return assign_ticket(
        db,
        ticket_id,
        assignment_data.staff_id
    )


@router.patch(
    "/{ticket_id}/priority",
    response_model=TicketResponse
)
def update_ticket_priority_endpoint(
    ticket_id: int,
    priority_data: TicketPriorityUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return update_ticket_priority(
        db,
        ticket_id,
        priority_data.priority
    )


@router.patch(
    "/{ticket_id}/escalate",
    response_model=TicketResponse
)
def escalate_ticket_endpoint(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return escalate_ticket(
        db,
        ticket_id
    )