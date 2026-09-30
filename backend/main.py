from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from routers.tickets import router as ticket_router
from routers.auth import router as auth_router

from database import Base, engine, get_db
from models.student import Student
from routers.students import router as student_router
from models.ticket import Ticket
from models.ticket_activity import TicketActivity
from routers.ticket_activities import router as ticket_activity_router
from models.staff import Staff
from routers.staff import router as staff_router
from models.pending_action import PendingAction
from routers.pending_actions import router as pending_action_router
from models.ticket_resolution import TicketResolution
from routers.ticket_resolutions import router as ticket_resolution_router
Base.metadata.create_all(bind=engine)
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router)
app.include_router(ticket_router)
app.include_router(ticket_activity_router)
app.include_router(staff_router)
app.include_router(pending_action_router)
app.include_router(ticket_resolution_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "Student Support API is running"}


@app.get("/health/database")
def database_health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))

    return {"database": "connected"}