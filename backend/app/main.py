from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import movie, theatre, show, booking, auth

app = FastAPI(title="Movie Booking API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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