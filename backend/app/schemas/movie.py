from pydantic import BaseModel

class MovieBase(BaseModel):
    title: str
    description: str | None = None
    duration: int
    language: str
    genre: str


class MovieCreate(MovieBase):
    pass


class MovieResponse(MovieBase):
    id: int

    class Config:
        from_attributes = True  # Required for SQLAlchemy ORM