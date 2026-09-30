from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import get_db

from schemas.pending_action import (
    PendingActionCreate,
    PendingActionComplete,
    PendingActionResponse
)

from services.pending_action_service import (
    create_pending_action,
    get_pending_actions,
    complete_pending_action,
    mark_overdue_pending_actions
)

from utils.auth_dependency import get_current_staff
from utils.role_permissions import require_staff


router = APIRouter(
    prefix="/pending-actions",
    tags=["Pending Actions"]
)


@router.post(
    "/",
    response_model=PendingActionResponse
)
def create_pending_action_endpoint(
    action_data: PendingActionCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return create_pending_action(
        db,
        action_data
    )


@router.get(
    "/ticket/{ticket_id}",
    response_model=list[PendingActionResponse]
)
def get_pending_actions_endpoint(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return get_pending_actions(
        db,
        ticket_id
    )


@router.patch(
    "/check-overdue",
    response_model=list[PendingActionResponse]
)
def check_overdue_pending_actions_endpoint(
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return mark_overdue_pending_actions(db)


@router.patch(
    "/{action_id}/complete",
    response_model=PendingActionResponse
)
def complete_pending_action_endpoint(
    action_id: int,
    action_data: PendingActionComplete,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return complete_pending_action(
        db,
        action_id
    )