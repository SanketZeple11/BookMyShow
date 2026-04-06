#!/usr/bin/env python3
"""
Script to generate seats for all shows in the database.
Run this in the Docker container or with local Python environment.

Usage: python seed_seats.py
"""

import asyncio
from app.core.database import engine, Base
from app.models.seat import Seat
from app.models.show import Show
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

async def seed_seats():
    """Create a 10x10 seat layout (A1-J10) for each show"""
    
    async with AsyncSession(engine) as session:
        # Get all shows
        result = await session.execute(select(Show))
        shows = result.scalars().all()
        
        if not shows:
            print("❌ No shows found in database!")
            return
        
        print(f"Found {len(shows)} shows. Creating seats...")
        
        rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        cols = range(1, 11)
        
        for show in shows:
            # Check if seats already exist for this show
            result = await session.execute(
                select(Seat).where(Seat.show_id == show.id)
            )
            existing_seats = result.scalars().all()
            
            if existing_seats:
                print(f"  ⏭️  Show {show.id}: Seats already exist ({len(existing_seats)} seats)")
                continue
            
            # Create seats
            seats_to_add = []
            for row in rows:
                for col in cols:
                    seat = Seat(
                        show_id=show.id,
                        seat_number=f"{row}{col}",
                        is_booked=0
                    )
                    seats_to_add.append(seat)
            
            session.add_all(seats_to_add)
            print(f"  ✅ Show {show.id}: Created {len(seats_to_add)} seats (10x10 layout)")
        
        await session.commit()
        print("\n✅ All seats created successfully!")

if __name__ == "__main__":
    asyncio.run(seed_seats())
