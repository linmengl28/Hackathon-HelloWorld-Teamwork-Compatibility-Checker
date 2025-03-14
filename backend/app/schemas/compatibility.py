from pydantic import BaseModel
from typing import Optional

class CompatibilityResultResponse(BaseModel):
    candidate_id: int
    team_id: int
    overall_score: float
    dimension_scores: dict[str, int]
    strengths: list[str]
    challenges: list[str]
    summary: str

    class Config:
        orm_mode = True