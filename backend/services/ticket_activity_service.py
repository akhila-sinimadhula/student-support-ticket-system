from sqlalchemy.orm import Session

from models.ticket_activity import TicketActivity


def create_ticket_activity(
    db: Session,
    ticket_id: int,
    activity_type: str,
    description: str
):
    activity = TicketActivity(
        ticket_id=ticket_id,
        activity_type=activity_type,
        description=description
    )

    db.add(activity)
    db.commit()
    db.refresh(activity)

    return activity


def get_ticket_activities(
    db: Session,
    ticket_id: int
):
    return (
        db.query(TicketActivity)
        .filter(TicketActivity.ticket_id == ticket_id)
        .order_by(TicketActivity.created_at.asc())
        .all()
    )