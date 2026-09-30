from datetime import datetime

from pydantic import BaseModel


class PendingActionCreate(BaseModel):
    ticket_id: int
    action_description: str
    due_at: datetime | None = None


class PendingActionComplete(BaseModel):
    status: str = "Completed"


class PendingActionResponse(BaseModel):
    id: int
    ticket_id: int
    action_description: str
    status: str
    due_at: datetime | None
    completed_at: datetime | None
    is_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True