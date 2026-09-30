from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import get_db

from schemas.ticket_resolution import (
    TicketResolutionCreate,
    TicketResolutionResponse
)

from services.ticket_resolution_service import (
    create_ticket_resolution,
    get_ticket_resolution
)

from utils.auth_dependency import get_current_staff
from utils.role_permissions import require_staff


router = APIRouter(
    prefix="/ticket-resolutions",
    tags=["Ticket Resolutions"]
)


@router.post(
    "/",
    response_model=TicketResolutionResponse
)
def create_ticket_resolution_endpoint(
    resolution_data: TicketResolutionCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return create_ticket_resolution(
        db,
        resolution_data
    )


@router.get(
    "/{ticket_id}",
    response_model=TicketResolutionResponse
)
def get_ticket_resolution_endpoint(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return get_ticket_resolution(
        db,
        ticket_id
    )