from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    show_id = Column(Integer, ForeignKey("shows.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    seats_booked = Column(Integer, nullable=False)
    booked_at = Column(DateTime, default=datetime.utcnow)