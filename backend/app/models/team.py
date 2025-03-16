from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class Team(Base):
    __tablename__ = 'teams'

    Id = Column(Integer, primary_key=True, index=True)
    department = Column(String, index=True)
    name = Column(String, index=True)
    description = Column(String)
    members = relationship('TeamMember', back_populates='team')

    def __repr__(self):
        return f"<Team(name={self.name}, description={self.description})>"
