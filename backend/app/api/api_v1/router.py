from fastapi import APIRouter
from app.api.api_v1.endpoints import compatibility,questionnaire

api_router = APIRouter()

api_router.include_router(compatibility.router, tags=["Compatibility"])
api_router.include_router(questionnaire.router, tags=["questionnaire"])