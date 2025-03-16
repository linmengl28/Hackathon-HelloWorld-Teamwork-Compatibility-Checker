from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from backend.app.db.database import get_db
from app.models.team import Team
from app.schemas.team import TeamCreate, TeamResponse
from app.db.team import teamDB
from typing import Dict, List
router = APIRouter()


@router.post("/team", response_model=TeamResponse)
def create_team(team: TeamCreate):
    # Create a fake team and assign an ID to it
    new_team_id = len(teamDB) + 1  # Incremental fake ID
    new_team = {
        "id": new_team_id,
        "name": team.name,
        "department": team.department,
        "description": team.description,
        "members": team.members
    }
    teamDB.append(new_team)  # Store the team in the fake database
    return new_team


@router.get("/team/{team_id}", response_model=TeamResponse)
def get_team(team_id: int):
    # Search for the team by ID
    team = next((t for t in teamDB if t["id"] == team_id), None)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team


@router.get("/teams", response_model=List[TeamResponse])
def get_all_teams():
    """
    Get all teams
    """
    # Return all teams from the database
    print("teamDB content:", teamDB)
    return teamDB
# @router.post("/team", response_model=TeamResponse)
# def create_team(team: TeamCreate, db: Session = Depends(get_db)):
#     new_team = Team(name=team.name, description=team.description)
#     db.add(new_team)
#     db.commit()
#     db.refresh(new_team)
#     return new_team

# @router.get("/team/{team_id}", response_model=TeamResponse)
# def get_team(team_id: int, db: Session = Depends(get_db)):
#     team = db.query(Team).filter(Team.id == team_id).first()
#     if not team:
#         raise HTTPException(status_code=404, detail="Team not found")
#     return team
