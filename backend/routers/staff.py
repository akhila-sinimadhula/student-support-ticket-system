from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils.auth_dependency import get_current_staff
from utils.role_permissions import require_role
from database import get_db
from schemas.staff import (
    StaffCreate,
    StaffUpdate,
    StaffResponse
)
from services.staff_service import (
    create_staff,
    get_staff_members,
    get_staff_by_id,
    update_staff
)


router = APIRouter(
    prefix="/staff",
    tags=["Staff"]
)


@router.post("/", response_model=StaffResponse)
def create_staff_endpoint(
    staff_data: StaffCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_role(
        current_staff,
        {"Admin"}
    )

    return create_staff(
        db,
        staff_data
    )


@router.get("/", response_model=list[StaffResponse])
def get_staff_endpoint(
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_role(
        current_staff,
        {"Admin"}
    )

    return get_staff_members(db)


@router.get("/{staff_id}", response_model=StaffResponse)
def get_staff_by_id_endpoint(
    staff_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_role(
        current_staff,
        {"Admin"}
    )

    staff = get_staff_by_id(
        db,
        staff_id
    )

    if staff is None:
        raise HTTPException(
            status_code=404,
            detail="Staff member not found"
        )

    return staff

@router.patch(
    "/{staff_id}",
    response_model=StaffResponse
)
def update_staff_endpoint(
    staff_id: int,
    staff_data: StaffUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_role(
        current_staff,
        {"Admin"}
    )

    return update_staff(
        db,
        staff_id,
        staff_data
    )