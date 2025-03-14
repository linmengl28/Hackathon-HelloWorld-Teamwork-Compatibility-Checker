from fastapi import APIRouter
from app.api.api_v1.endpoints import compatibility,questionnaire,teams, team_member, candidate

api_router = APIRouter()

api_router.include_router(compatibility.router, tags=["Compatibility"])
api_router.include_router(questionnaire.router, tags=["questionnaire"])

api_router.include_router(teams.router, tags=["team"])
api_router.include_router(team_member.router, tags=["team_member"])
api_router.include_router(candidate.router, tags=["candidate"])