from pydantic import BaseModel
from datetime import datetime
# from pydantic import BaseModel
from typing import List

class BookingCreate(BaseModel):
    show_id: int
    seats: List[str]  # ["A1", "A2"]


class BookingResponse(BaseModel):
    id: int
    show_id: int
    seats_booked: int
    booked_at: datetime

    class Config:
        from_attributes = True