from pydantic import BaseModel, field_validator
from datetime import datetime



class TicketCreate(BaseModel):
    student_id: int
    subject: str
    description: str
    priority: str = "Medium"

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value):
        allowed_priorities = {
            "Low",
            "Medium",
            "High",
            "Critical"
        }

        if value not in allowed_priorities:
            raise ValueError(
                "Priority must be Low, Medium, High, or Critical"
            )

        return value


class TicketStatusUpdate(BaseModel):
    status: str


class TicketAssignmentUpdate(BaseModel):
    staff_id: int


class TicketPriorityUpdate(BaseModel):
    priority: str

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value):
        allowed_priorities = {
            "Low",
            "Medium",
            "High",
            "Critical"
        }

        if value not in allowed_priorities:
            raise ValueError(
                "Priority must be Low, Medium, High, or Critical"
            )

        return value


class TicketResponse(BaseModel):
    id: int
    ticket_number: str
    student_id: int
    assigned_staff_id: int | None
    subject: str
    description: str
    status: str
    priority: str
    is_escalated: bool
    created_at: datetime

    class Config:
        from_attributes = True