from datetime import datetime

from pydantic import BaseModel


class TicketResolutionCreate(BaseModel):
    ticket_id: int
    resolution_notes: str


class TicketResolutionResponse(BaseModel):
    id: int
    ticket_id: int
    resolution_notes: str
    resolved_at: datetime

    class Config:
        from_attributes = True