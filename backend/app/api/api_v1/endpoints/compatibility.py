from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.db.session import get_db
from app.models.compatibility import CompatibilityResult
from app.services.compatibility_analyzer import calculate_compatibility_all_teams
from app.schemas.compatibility import CompatibilityResultResponse
from app.db.compatibility_result import compatibility_results

router = APIRouter()
@router.get("/compatibility/{candidate_id}", response_model=list[CompatibilityResultResponse])
# def get_compatibility_result(candidate_id: int, db: Session = Depends(get_db)):
def get_compatibility_result(candidate_id: int):  # ← use this instead
#TODO: Need to store the result in the database
    result = next((item for item in compatibility_results if item["candidate_id"] == candidate_id),None)
    if result:
        return CompatibilityResultResponse(**result)

    try:
        result = calculate_compatibility_all_teams(candidate_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating compatibility: {str(e)}")

#     # Check if result exists
#     result = db.query(CompatibilityResult).filter_by(candidate_id=candidate_id).first()
#
#     if result:
#         return result
#
#     # If not found, calculate on-demand
#     try:
#         result = calculate_compatibility_on_demand(candidate_id, db)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error calculating compatibility: {str(e)}")
#
#     return result


    # Check in-memory store
# DUMMY_DB = {}
#     if candidate_id in DUMMY_DB:
#         return DUMMY_DB[candidate_id]
#
#     # Simulate compatibility calculation
#     dummy_result = CompatibilityResultResponse(
#         candidate_id=candidate_id,
#         team_id=1,
#         compatibility_score=0.87,
#         strengths="Good cultural fit and adaptable work style.",
#         challenges="May prefer solo work over collaboration.",
#         ai_insights="Strong alignment with team communication patterns."
#     )
#
#     # Store in memory
#     DUMMY_DB[candidate_id] = dummy_result
#
#     return dummy_result
