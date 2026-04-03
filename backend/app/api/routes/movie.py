from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.movie import MovieCreate, MovieResponse
from app.services.movie_service import create_movie, get_movies

router = APIRouter(prefix="/movies", tags=["Movies"])


@router.post("/", response_model=MovieResponse)
async def add_movie(
    movie: MovieCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_movie(db, movie)


@router.get("/", response_model=list[MovieResponse])
async def list_movies(
    db: AsyncSession = Depends(get_db)
):
    return await get_movies(db)