from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from schemas.student import StudentCreate, StudentUpdate

from models.student import Student
from schemas.student import StudentCreate


def create_student(db: Session, student_data: StudentCreate):
    student = Student(
        student_code=student_data.student_code,
        name=student_data.name,
        email=student_data.email,
        department=student_data.department,
        year=student_data.year
    )

    db.add(student)

    try:
        db.commit()
        db.refresh(student)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Student email or student code already exists"
        )

    return student


def get_students(db: Session):
    return db.query(Student).all()


def get_student_by_id(db: Session, student_id: int):
    return db.query(Student).filter(Student.id == student_id).first()


def update_student(
    db: Session,
    student_id: int,
    student_data: StudentUpdate
):
    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    student.name = student_data.name
    student.email = student_data.email
    student.department = student_data.department
    student.year = student_data.year

    try:
        db.commit()
        db.refresh(student)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Student email already exists"
        )

    return student