from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from schemas.student import (
    StudentCreate,
    StudentUpdate,
    StudentResponse
)
from services.student_service import (
    create_student,
    get_students,
    get_student_by_id,
    update_student
)
from utils.auth_dependency import get_current_staff
from utils.role_permissions import require_staff


router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/", response_model=StudentResponse)
def create_student_endpoint(
    student_data: StudentCreate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return create_student(
        db,
        student_data
    )


@router.get("/", response_model=list[StudentResponse])
def get_students_endpoint(
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return get_students(db)


@router.get("/{student_id}", response_model=StudentResponse)
def get_student_endpoint(
    student_id: int,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    student = get_student_by_id(
        db,
        student_id
    )

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


@router.patch(
    "/{student_id}",
    response_model=StudentResponse
)
def update_student_endpoint(
    student_id: int,
    student_data: StudentUpdate,
    db: Session = Depends(get_db),
    current_staff=Depends(get_current_staff)
):
    require_staff(current_staff)

    return update_student(
        db,
        student_id,
        student_data
    )