from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.staff import Staff
from schemas.auth import LoginRequest
from utils.jwt_utils import create_access_token
from utils.password_utils import verify_password


def login_staff(
    db: Session,
    login_data: LoginRequest
):
    staff = (
        db.query(Staff)
        .filter(Staff.email == login_data.email)
        .first()
    )

    if staff is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if staff.password_hash is None:
        raise HTTPException(
            status_code=401,
            detail="Account password has not been configured"
        )

    if not verify_password(
        login_data.password,
        staff.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token({
        "staff_id": staff.id,
        "email": staff.email,
        "role": staff.role
    })

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "staff_id": staff.id,
        "name": staff.name,
        "email": staff.email,
        "role": staff.role
    }