from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.auth_service import signup, login

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", response_model=UserResponse)
async def signup_user(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    return await signup(db, user)


@router.post("/login")
async def login_user(
    user: UserLogin,
    db: AsyncSession = Depends(get_db)
):
    return await login(db, user)