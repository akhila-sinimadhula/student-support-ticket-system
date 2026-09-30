from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from utils.auth_dependency import get_current_staff

from database import get_db
from schemas.auth import LoginRequest, LoginResponse
from services.auth_service import login_staff


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/login",
    response_model=LoginResponse
)
def login_endpoint(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    return login_staff(
        db,
        login_data
    )

@router.get("/me")
def get_current_user(
    current_staff = Depends(get_current_staff)
):
    return {
        "id": current_staff.id,
        "name": current_staff.name,
        "email": current_staff.email,
        "role": current_staff.role
    }