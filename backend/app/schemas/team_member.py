from pydantic import BaseModel

# Base schema for TeamMember which will be used for input and output
class TeamMemberBase(BaseModel):
    name: str
    role: str
    team_id: int
    # work_style: str  # e.g., "structured", "flexible"
    # communication_style: str  # e.g., "direct", "indirect"
    # preferred_work_environment: str

    class Config:
        # Allows conversion from ORM models to Pydantic models (e.g., SQLAlchemy)
        orm_mode = True

# Schema used when creating a new team member (does not include ID)
class TeamMemberCreate(TeamMemberBase):
    pass  # No additional fields are needed when creating a team member

# Schema for the response which includes the ID of the team member
class TeamMemberResponse(TeamMemberBase):
    id: int

    class Config:
        orm_mode = True
