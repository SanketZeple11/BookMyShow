from fastapi import FastAPI
from app.api.routes import movie, theatre, show, booking, auth
from app.core.database import engine, Base

app = FastAPI(title="Movie Booking API")


# Create tables (for now, later we'll use Alembic)
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# Register routes
app.include_router(movie.router)
app.include_router(theatre.router)
app.include_router(show.router)
app.include_router(auth.router)
# from app.api.routes import booking

app.include_router(booking.router)


@app.get("/")
async def root():
    return {"message": "API is running"}