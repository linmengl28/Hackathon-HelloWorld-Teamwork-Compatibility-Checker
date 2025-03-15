from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from app.schemas.team_member import TeamMemberCreate, TeamMemberResponse
from app.db.team_member import team_member_db  # This is where fake data will be stored


router = APIRouter()


# Endpoint to create a new team member
@router.post("/team_member", response_model=TeamMemberResponse)
def create_team_member(team_member: TeamMemberCreate):
    # Generate a new ID for the team member
    new_id = len(team_member_db) + 1
    new_member = {
        "id": new_id,
        "name": team_member.name,
        "role": team_member.role,
        "team_id": team_member.team_id,
        # "work_style": team_member.work_style,
        # "communication_style": team_member.communication_style,
        # "preferred_work_environment": team_member.preferred_work_environment,
    }
    team_member_db.append(new_member)  # Add the new team member to the fake database
    return new_member

# Endpoint to get details of a team member by ID
@router.get("/team_member/{member_id}", response_model=TeamMemberResponse)
def get_team_member(member_id: int):
    team_member = next((m for m in team_member_db if m["id"] == member_id), None)
    if not team_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return team_member

# Endpoint to get all team members of a specific team
@router.get("/team/{team_id}/members", response_model=List[TeamMemberResponse])
def get_team_members(team_id: int):
    team_members = [m for m in team_member_db if m["team_id"] == team_id]
    if not team_members:
        raise HTTPException(status_code=404, detail="No members found for this team")
    return team_members

# Endpoint to update a team member's details
@router.put("/team_member/{member_id}", response_model=TeamMemberResponse)
def update_team_member(member_id: int, team_member: TeamMemberCreate):
    existing_member = next((m for m in team_member_db if m["id"] == member_id), None)
    if not existing_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    # Update the existing team member's details
    existing_member["name"] = team_member.name
    existing_member["role"] = team_member.role
    existing_member["team_id"] = team_member.team_id
    # existing_member["work_style"] = team_member.work_style
    # existing_member["communication_style"] = team_member.communication_style
    # existing_member["preferred_work_environment"] = team_member.preferred_work_environment

    return existing_member

# Endpoint to delete a team member by ID
@router.delete("/team_member/{member_id}", response_model=TeamMemberResponse)
def delete_team_member(member_id: int):
    team_member = next((m for m in team_member_db if m["id"] == member_id), None)
    if not team_member:
        raise HTTPException(status_code=404, detail="Team member not found")

    db.remove(team_member)  # Remove the team member from the fake database
    return team_member
