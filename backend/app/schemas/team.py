from pydantic import BaseModel
from typing import List, Optional

class TeamBase(BaseModel):
    name: str
    description: Optional[str] = None

class TeamCreate(TeamBase):
    pass  # No extra fields needed when creating a team

class TeamUpdate(TeamBase):
    pass  # No extra fields needed when creating a team

class TeamResponse(TeamBase):
    id: int

    class Config:
        orm_mode = True