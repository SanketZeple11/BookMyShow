from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.show import Show
from app.schemas.show import ShowCreate


async def create_show(db: AsyncSession, show_data: ShowCreate):
    show = Show(**show_data.dict())
    db.add(show)
    await db.commit()
    await db.refresh(show)
    return show


async def get_shows_by_movie(db: AsyncSession, movie_id: int):
    result = await db.execute(
        select(Show).where(Show.movie_id == movie_id)
    )
    return result.scalars().all()