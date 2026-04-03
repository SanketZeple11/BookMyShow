from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.theatre import Theatre
from app.schemas.theatre import TheatreCreate


async def create_theatre(db: AsyncSession, theatre_data: TheatreCreate):
    theatre = Theatre(**theatre_data.dict())
    db.add(theatre)
    await db.commit()
    await db.refresh(theatre)
    return theatre


async def get_theatres(db: AsyncSession):
    result = await db.execute(select(Theatre))
    return result.scalars().all()