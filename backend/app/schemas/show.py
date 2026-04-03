from pydantic import BaseModel
from datetime import datetime

class ShowBase(BaseModel):
    movie_id: int
    theatre_id: int
    start_time: datetime
    available_seats: int


class ShowCreate(ShowBase):
    pass


class ShowResponse(ShowBase):
    id: int

    class Config:
        from_attributes = True