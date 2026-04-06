from sqlalchemy import select
from fastapi import HTTPException

from app.models.seat import Seat
from app.models.booking import Booking


async def create_booking(db, show_id: int, seat_numbers: list[str], user_id: int):
    # Fetch and lock seats
    result = await db.execute(
        select(Seat)
        .where(
            Seat.show_id == show_id,
            Seat.seat_number.in_(seat_numbers)
        )
        .with_for_update()
    )

    seats = result.scalars().all()

    if len(seats) != len(seat_numbers):
        raise HTTPException(status_code=404, detail="Some seats not found")

    # Check availability
    for seat in seats:
        if seat.is_booked:
            raise HTTPException(
                status_code=400,
                detail=f"Seat {seat.seat_number} already booked"
            )

    # Mark booked
    for seat in seats:
        seat.is_booked = 1

    # Create booking
    booking = Booking(
        show_id=show_id,
        user_id=user_id,
        seats_booked=len(seat_numbers)
    )

    db.add(booking)
    await db.commit()
    await db.refresh(booking)
    return booking