from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Candidate(Base):
    __tablename__ = 'candidates'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    # work_style = Column(String)  # e.g., "structured", "flexible"
    # communication_style = Column(String)  # e.g., "direct", "indirect"
    # preferred_work_environment = Column(String)  # e.g., "collaborative", "independent"
    # personality_traits = Column(String)  # Can be a JSON string or serialized format
    # questionnaire_data = Column(String)  # Can be a JSON string for simplicity

    def __repr__(self):
        return f"<Candidate(name={self.name}, email={self.email})>"
