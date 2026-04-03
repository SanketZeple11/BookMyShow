from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(Integer, nullable=False)  # in minutes
    language = Column(String(50))
    genre = Column(String(100))