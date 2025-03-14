from pydantic import BaseModel
from typing import List, Optional

class CandidateBase(BaseModel): # do not add id
    name: str
    email: str
    # experience: int
    # skills: List[str]
    # preferred_work_style: str

class CandidateCreate(CandidateBase):
    pass  # No extra fields needed when creating a candidate

class CandidateResponse(CandidateBase):
    id: int

    class Config:
        orm_mode = True