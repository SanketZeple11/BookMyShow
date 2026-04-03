from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.movie import Movie
from app.schemas.movie import MovieCreate


async def create_movie(db: AsyncSession, movie_data: MovieCreate):
    movie = Movie(**movie_data.dict())
    db.add(movie)
    await db.commit()
    await db.refresh(movie)
    return movie


async def get_movies(db: AsyncSession):
    result = await db.execute(select(Movie))
    return result.scalars().all()