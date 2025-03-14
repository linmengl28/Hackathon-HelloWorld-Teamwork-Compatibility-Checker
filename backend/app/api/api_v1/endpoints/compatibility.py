from fastapi import APIRouter, HTTPException
from app.schemas.compatibility import CompatibilityResultResponse
from app.services.compatibility_analyzer import calculate_compatibility
from app.db.compatibility_result import compatibility_results  # <- your hardcoded list

router = APIRouter()

@router.get("/compatibility/{candidate_id}/{team_id}", response_model=CompatibilityResultResponse)
def get_compatibility(candidate_id: int, team_id: int):
    # First, check if the result exists in compatibility_results
    match = next(
        (item for item in compatibility_results
         if item["candidate_id"] == candidate_id and item["team_id"] == team_id),
        None
    )

    if match:
        print(" Result found in fake DB")
        return CompatibilityResultResponse(**match)

    # If not found, calculate it via GPT
    try:
        print("Calculating with AI...")
        result = calculate_compatibility(candidate_id, team_id)

        # Optional: Save to in-memory DB (so it’s cached next time)
        compatibility_results.append(result.model_dump())

        return result

    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating compatibility: {str(e)}")