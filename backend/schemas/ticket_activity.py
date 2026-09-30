from datetime import datetime

from pydantic import BaseModel


class TicketActivityResponse(BaseModel):
    id: int
    ticket_id: int
    activity_type: str
    description: str
    created_at: datetime

    class Config:
        from_attributes = True