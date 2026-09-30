from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from models.staff import Staff
from schemas.staff import StaffCreate, StaffUpdate


def create_staff(db: Session, staff_data: StaffCreate):
    staff = Staff(
        name=staff_data.name,
        email=staff_data.email,
        role=staff_data.role
    )

    db.add(staff)

    try:
        db.commit()
        db.refresh(staff)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Staff email already exists"
        )

    return staff


def get_staff_members(db: Session):
    return db.query(Staff).all()


def get_staff_by_id(db: Session, staff_id: int):
    return (
        db.query(Staff)
        .filter(Staff.id == staff_id)
        .first()
    )


from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from models.staff import Staff
from schemas.staff import StaffCreate, StaffUpdate


def create_staff(db: Session, staff_data: StaffCreate):
    staff = Staff(
        name=staff_data.name,
        email=staff_data.email,
        role=staff_data.role
    )

    db.add(staff)

    try:
        db.commit()
        db.refresh(staff)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Staff email already exists"
        )

    return staff


def get_staff_members(db: Session):
    return db.query(Staff).all()


def get_staff_by_id(db: Session, staff_id: int):
    return (
        db.query(Staff)
        .filter(Staff.id == staff_id)
        .first()
    )


def update_staff(
    db: Session,
    staff_id: int,
    staff_data: StaffUpdate
):
    staff = (
        db.query(Staff)
        .filter(Staff.id == staff_id)
        .first()
    )

    if staff is None:
        raise HTTPException(
            status_code=404,
            detail="Staff member not found"
        )

    staff.name = staff_data.name
    staff.email = staff_data.email
    staff.role = staff_data.role

    try:
        db.commit()
        db.refresh(staff)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Staff email already exists"
        )

    return staff