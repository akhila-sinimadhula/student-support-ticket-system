from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class TicketResolution(Base):
    __tablename__ = "ticket_resolutions"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    ticket_id: Mapped[int] = mapped_column(
        ForeignKey("tickets.id"),
        nullable=False,
        unique=True,
        index=True
    )

    resolution_notes: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    resolved_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )