from fastapi import APIRouter
from app.schemas.questionnaire import Questionnaire
from app.db.questionnaire import questionnaire

router = APIRouter()

@router.get("/questionnaire", response_model=Questionnaire)
def get_questionnaire():
    return questionnaire
