from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from schemas.ticket_activity import TicketActivityResponse
from services.ticket_activity_service import get_ticket_activities
from utils.auth_dependency import get_current_staff
from utils.role_permissions import require_staff


router = APIRouter(
    prefix="/tickets",
    tags=["Ticket Activities"]
)


@router.get(
    "/{ticket_id}/activities",
    response_model=list[TicketActivityResponse]
)
def get_ticket_activities_endpoint(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return get_ticket_activities(
        db,
        ticket_id
    )