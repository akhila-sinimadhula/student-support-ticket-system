from pydantic import BaseModel, EmailStr


class StaffCreate(BaseModel):
    name: str
    email: EmailStr
    role: str


class StaffUpdate(BaseModel):
    name: str
    email: EmailStr
    role: str


class StaffResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True