from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class Show(Base):
    __tablename__ = "shows"

    id = Column(Integer, primary_key=True, index=True)

    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False)
    theatre_id = Column(Integer, ForeignKey("theatres.id"), nullable=False)

    start_time = Column(DateTime, nullable=False)
    available_seats = Column(Integer, nullable=False)

    # Relationships
    movie = relationship("Movie")
    theatre = relationship("Theatre", back_populates="shows")