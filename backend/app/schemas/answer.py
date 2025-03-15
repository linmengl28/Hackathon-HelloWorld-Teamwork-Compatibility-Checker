from pydantic import BaseModel
from typing import Dict

class CandidateAnswer(BaseModel):
    candidate_id: int
    name: str
    answers: Dict[int, str]  # {question_id: selected_option}


class TeamMemberAnswer(BaseModel):
    team_id: int
    answers: Dict[int, str]  # {question_id: selected_option}
