from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.theatre import TheatreCreate, TheatreResponse
from app.services.theatre_service import create_theatre, get_theatres

router = APIRouter(prefix="/theatres", tags=["Theatres"])


@router.post("/", response_model=TheatreResponse)
async def add_theatre(
    theatre: TheatreCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_theatre(db, theatre)


@router.get("/", response_model=list[TheatreResponse])
async def list_theatres(
    db: AsyncSession = Depends(get_db)
):
    return await get_theatres(db)