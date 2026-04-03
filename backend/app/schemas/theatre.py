from pydantic import BaseModel

class TheatreBase(BaseModel):
    name: str
    location: str


class TheatreCreate(TheatreBase):
    pass


class TheatreResponse(TheatreBase):
    id: int

    class Config:
        from_attributes = True