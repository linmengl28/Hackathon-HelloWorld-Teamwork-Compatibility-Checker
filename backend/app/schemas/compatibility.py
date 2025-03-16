from pydantic import BaseModel
from typing import Dict, List


class CompatibilityResultResponse(BaseModel):
    candidate_id: int
    team_id: int
    overall_score: float
    dimension_scores: Dict[str, int]
    strengths: List[str]
    challenges: List[str]
    summary: str

    class Config:
        orm_mode = True
