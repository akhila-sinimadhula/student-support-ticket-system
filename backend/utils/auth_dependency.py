from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from database import get_db
from models.staff import Staff
from utils.jwt_utils import SECRET_KEY, ALGORITHM


security = HTTPBearer()


def get_current_staff(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        staff_id = payload.get("staff_id")

        if staff_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired authentication token"
        )

    staff = (
        db.query(Staff)
        .filter(Staff.id == staff_id)
        .first()
    )

    if staff is None:
        raise HTTPException(
            status_code=401,
            detail="Staff account not found"
        )

    return staff