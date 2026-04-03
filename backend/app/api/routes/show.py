from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.show import ShowCreate, ShowResponse
from app.services.show_service import create_show, get_shows_by_movie
from app.models.seat import Seat
from sqlalchemy import select

router = APIRouter(prefix="/shows", tags=["Shows"])


@router.post("/", response_model=ShowResponse)
async def add_show(
    show: ShowCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_show(db, show)


@router.get("/", response_model=list[ShowResponse])
async def list_shows(
    movie_id: int = Query(...),
    db: AsyncSession = Depends(get_db)
):
    return await get_shows_by_movie(db, movie_id)


from app.models.seat import Seat
from sqlalchemy import select

@router.get("/{show_id}/seats")
async def get_seats(show_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Seat).where(Seat.show_id == show_id)
    )
    seats = result.scalars().all()

    return [
        {
            "seat_number": s.seat_number,
            "is_booked": s.is_booked
        }
        for s in seats
    ]