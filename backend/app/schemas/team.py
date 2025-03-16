from pydantic import BaseModel
from typing import List, Optional


class TeamBase(BaseModel):
    name: str
    description: Optional[str] = None


class TeamCreate(TeamBase):
    pass  # No extra fields needed when creating a team


class TeamUpdate(TeamBase):
    pass  # No extra fields needed when creating a team


class TeamMemberResponse(BaseModel):
    id: int
    name: str
    role: str


class TeamResponse(BaseModel):
    id: int
    name: str
    department: str
    description: Optional[str] = None
    members: List[TeamMemberResponse]

    class Config:
        orm_mode = True
