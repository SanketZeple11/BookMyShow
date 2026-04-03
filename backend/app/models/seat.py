from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class Seat(Base):
    __tablename__ = "seats"

    id = Column(Integer, primary_key=True, index=True)

    show_id = Column(Integer, ForeignKey("shows.id"), nullable=False)
    seat_number = Column(String(10), nullable=False)  # A1, A2, etc.
    is_booked = Column(Integer, default=0)  # 0 = free, 1 = booked