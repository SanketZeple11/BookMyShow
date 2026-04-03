from app.api.deps import get_current_user

@router.post("/")
async def book_ticket(
    booking: BookingCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return await create_booking(
        db,
        show_id=booking.show_id,
        seat_numbers=booking.seats,
        user_id=current_user.id
    )