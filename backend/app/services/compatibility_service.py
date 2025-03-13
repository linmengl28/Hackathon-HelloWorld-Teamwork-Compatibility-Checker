from sqlalchemy.orm import Session
from app.models.compatibility import CompatibilityResult

def calculate_compatibility_on_demand(candidate_id: int, db: Session) -> CompatibilityResult:
    # ⚠️ Placeholder logic – to be replaced with real compatibility analysis
    dummy_result = CompatibilityResult(
        candidate_id=candidate_id,
        team_id=1,  # We'll parameterize this later
        compatibility_score=0.85,
        strengths="Good communication and flexibility",
        challenges="Prefers independence; may need to adjust to team processes",
        ai_insights="Promising fit for innovation-focused teams"
    )
    db.add(dummy_result)
    db.commit()
    db.refresh(dummy_result)
    return dummy_result
