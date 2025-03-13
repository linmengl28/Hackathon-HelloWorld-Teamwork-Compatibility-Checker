from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.db.base import Base

class CompatibilityResult(Base):
    __tablename__ = "compatibility_results"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"))
    team_id = Column(Integer, ForeignKey("teams.id"))
    compatibility_score = Column(Float)
    strengths = Column(String)
    challenges = Column(String)
    ai_insights = Column(String)
