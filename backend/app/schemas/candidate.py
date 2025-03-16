from pydantic import BaseModel
from typing import List, Optional


class CandidateBase(BaseModel):
    name: str
    email: str
    position: Optional[str] = "Candidate"  # Add a position field with default
    skills: List[str] = []  # Add skills field with default empty list


class CandidateCreate(CandidateBase):
    pass  # No extra fields needed when creating a candidate


class CandidateResponse(CandidateBase):
    id: int

    class Config:
        orm_mode = True  # Change to from_attributes=True for newer Pydantic versions
