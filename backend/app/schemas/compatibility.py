from pydantic import BaseModel
from typing import Optional

class CompatibilityResultResponse(BaseModel):
    candidate_id: int
    team_id: int
    compatibility_score: float
    strengths: Optional[str]
    challenges: Optional[str]
    ai_insights: Optional[str]

    class Config:
        orm_mode = True
