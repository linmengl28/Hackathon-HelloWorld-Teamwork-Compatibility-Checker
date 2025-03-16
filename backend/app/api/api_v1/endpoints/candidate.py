from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from backend.app.db.database import get_db
from app.models.team import Team
from app.models.candidate import Candidate
# from backend.app.schemas import TeamCreate, TeamResponse, TeamMemberCreate, TeamMemberResponse, CandidateCreate, CandidateResponse
from app.db.candidate import candidateDB
from app.schemas.candidate import CandidateCreate, CandidateResponse
from typing import Dict, List
router = APIRouter()


@router.get("/candidate/{candidate_id}", response_model=CandidateResponse)
def get_candidate(candidate_id: int):
    # Search for the candidate by ID in the fake database
    candidate = next((c for c in candidateDB if c["id"] == candidate_id), None)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    return candidate


@router.post("/candidate", response_model=CandidateResponse)
def create_candidate(candidate: CandidateCreate):
    # Create a fake candidate and assign an ID to it
    new_candidate_id = len(candidateDB) + 1  # Incremental fake ID
    new_candidate = {
        "id": new_candidate_id,
        "name": candidate.name,
        "email": candidate.email,
        "position": candidate.position,
        "skills": candidate.skills
    }
    candidateDB.append(new_candidate)
    return new_candidate


@router.get("/candidates", response_model=List[CandidateResponse])
def get_all_candidates():
    """
    Get all candidates with complete information
    """
    # Ensure all candidates have the required fields
    complete_candidates = []
    for candidate in candidateDB:
        complete_candidate = {
            "id": candidate["id"],
            "name": candidate["name"],
            "email": candidate["email"],
            # Default if missing
            "position": candidate.get("position", "Candidate"),
            "skills": candidate.get("skills", [])  # Default if missing
        }
        complete_candidates.append(complete_candidate)

    return complete_candidates
