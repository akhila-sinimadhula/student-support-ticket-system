from pydantic import BaseModel, EmailStr


class StudentCreate(BaseModel):
    student_code: str
    name: str
    email: EmailStr
    department: str
    year: int


class StudentUpdate(BaseModel):
    name: str
    email: EmailStr
    department: str
    year: int


class StudentResponse(BaseModel):
    id: int
    student_code: str
    name: str
    email: EmailStr
    department: str
    year: int

    class Config:
        from_attributes = True