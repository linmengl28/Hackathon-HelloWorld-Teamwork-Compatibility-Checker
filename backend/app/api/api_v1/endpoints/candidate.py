from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from backend.app.db.database import get_db
from app.models.team import Team
from app.models.candidate import Candidate
# from backend.app.schemas import TeamCreate, TeamResponse, TeamMemberCreate, TeamMemberResponse, CandidateCreate, CandidateResponse
from app.db.candidate import candidateDB
from app.schemas.candidate import CandidateCreate, CandidateResponse

router = APIRouter()

@router.post("/candidate", response_model=CandidateResponse)
def create_candidate(candidate: CandidateCreate,):
    # Create a fake team and assign an ID to it
    new_candidate_id = len(candidateDB) + 1  # Incremental fake ID
    new_candidate = {
        "id": new_candidate_id,
        "name": candidate.name,
        "email": candidate.email
    }
    candidateDB.append(new_candidate) 
    return new_candidate

@router.get("/candidate/{candidate_id}", response_model=CandidateResponse)
def get_candidate(candidate_id: int):
    # Search for the candidate by ID in the fake database
    candidate = next((c for c in candidateDB if c["id"] == candidate_id), None)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    return candidate