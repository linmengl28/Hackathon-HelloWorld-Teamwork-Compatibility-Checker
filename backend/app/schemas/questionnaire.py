from pydantic import BaseModel
from typing import List, Dict

class Question(BaseModel):
    id: int
    text: str
    category: str
    options: List[str]


class Questionnaire(BaseModel):
    title: str
    description: str
    questions: List[Question]
