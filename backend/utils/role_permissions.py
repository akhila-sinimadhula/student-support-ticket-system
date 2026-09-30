from fastapi import HTTPException

from models.staff import Staff


ADMIN_ROLE = "Admin"


def require_role(
    staff: Staff,
    allowed_roles: set[str]
):
    if staff.role not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to perform this action"
        )

    return staff


def require_admin(staff: Staff):
    if staff.role != ADMIN_ROLE:
        raise HTTPException(
            status_code=403,
            detail="Admin permission required"
        )

    return staff


def require_staff(staff: Staff):
    if not staff.role:
        raise HTTPException(
            status_code=403,
            detail="Staff permission required"
        )

    return staff