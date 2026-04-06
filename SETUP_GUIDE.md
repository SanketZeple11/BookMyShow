# BookMyShow - Movie Ticket Booking Application

A full-stack movie ticket booking application built with FastAPI (backend), React + Vite (frontend), and PostgreSQL (database).

## 🏗️ Project Structure

```
BookMyShow/
├── backend/          # FastAPI application
│   ├── app/
│   │   ├── api/      # API routes
│   │   ├── models/   # SQLAlchemy models
│   │   ├── services/ # Business logic
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── core/     # Configuration, security, database
│   ├── alembic/      # Database migrations
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/         # React + Vite application
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── components/ # Reusable components
│   │   ├── api/      # API client functions
│   │   ├── routes/   # App routing
│   │   ├── context/  # React context
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (if running frontend locally)
- Python 3.11+ (if running backend locally)

### 1. Clone & Navigate
```bash
cd BookMyShow
```

### 2. Start Services
```bash
docker compose up -d
```

This will start:
- PostgreSQL database on `localhost:5435`
- FastAPI backend on `http://localhost:8000`
- React frontend on `http://localhost:5173`

### 3. Create Sample Data

#### Run migrations:
```bash
docker compose run --rm backend python -m alembic upgrade head
```

#### Insert movies, theatres, and shows:
```bash
docker exec -it movie_db psql -U postgres -d movie_db << 'EOF'
INSERT INTO movies (title, description, duration, language, genre) VALUES
('The Shawshank Redemption', 'Two imprisoned men bond over years, finding solace through acts of common decency.', 142, 'English', 'Drama'),
('The Dark Knight', 'Batman faces the Joker, a criminal who wreaks havoc on Gotham.', 152, 'English', 'Action'),
('Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 148, 'English', 'Sci-Fi'),
('Interstellar', 'Explorers travel through a wormhole to ensure humanity\'s survival.', 169, 'English', 'Sci-Fi'),
('Pulp Fiction', 'The lives of mobsters, a boxer, and a gangster intertwine.', 154, 'English', 'Crime'),
('Forrest Gump', 'The presidencies of Kennedy and Johnson unfold through one man\'s life.', 142, 'English', 'Drama');

INSERT INTO theatres (name, location) VALUES
('PVR Cinemas', 'Downtown, City Center'),
('INOX', 'Westside Mall'),
('Carnival Cinemas', 'Eastside Plaza'),
('Cinepolis', 'North Avenue'),
('Alight Cinemas', 'South Market');

INSERT INTO shows (movie_id, theatre_id, start_time, available_seats) VALUES
(1, 1, '2026-04-07 10:00:00', 150),
(1, 1, '2026-04-07 14:30:00', 140),
(1, 2, '2026-04-07 18:00:00', 160),
(2, 1, '2026-04-07 11:00:00', 130),
(2, 2, '2026-04-07 15:30:00', 150),
(3, 2, '2026-04-07 09:00:00', 160),
(3, 3, '2026-04-07 13:30:00', 140),
(4, 1, '2026-04-07 12:00:00', 170),
(4, 4, '2026-04-07 16:00:00', 150),
(5, 3, '2026-04-07 10:30:00', 120),
(5, 5, '2026-04-07 17:30:00', 140),
(6, 2, '2026-04-07 11:30:00', 160),
(6, 4, '2026-04-07 18:30:00', 130);
EOF
```

#### Generate seats for all shows:
```bash
docker exec -it movie_backend python seed_seats.py
```

This creates a 10x10 seat layout (A1-J10) for each show.

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📱 Features

### User Authentication
- ✅ User signup & login
- ✅ JWT token-based authentication
- ✅ Password hashing with Argon2

### Movie Browsing
- ✅ View all movies
- ✅ Movie details with description, duration, language, genre
- ✅ Shows per movie with theatre information and times

### Seat Selection & Booking
- ✅ Visual 10x10 seat layout (A1-J10)
- ✅ Real-time seat status (Available/Booked/Selected)
- ✅ Multi-seat selection
- ✅ Booking confirmation with ID
- ✅ Price calculation (₹200 per seat)

### Booking History
- ✅ View all personal bookings
- ✅ Booking details (ID, seats, price, timestamp)
- ✅ Booking confirmation status

### Navigation
- ✅ Persistent navbar with user info
- ✅ Logout functionality
- ✅ Easy navigation between pages

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM with async support
- **PostgreSQL** - Database
- **Alembic** - Database migrations
- **Pydantic** - Data validation
- **python-jose** - JWT tokens
- **Passlib + Argon2** - Password hashing

### Frontend
- **React 19** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS** - Styling

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📝 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Movies
- `GET /movies` - Get all movies
- `GET /movies/{id}` - Get movie details

### Theatres
- `GET /theatres` - Get all theatres
- `POST /theatres` - Create theatre (admin)

### Shows
- `GET /shows?movie_id={id}` - Get shows for movie
- `GET /shows/{show_id}/seats` - Get seats for show
- `POST /shows` - Create show (admin)

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings/my-bookings` - Get user's bookings

## 🔧 Common Tasks

### View Database
```bash
docker exec -it movie_db psql -U postgres -d movie_db
```

### Check Backend Logs
```bash
docker logs -f movie_backend
```

### Check Frontend Logs
```bash
docker logs -f movie_frontend
```

### Restart Services
```bash
docker compose restart
```

### Rebuild Images
```bash
docker compose down
docker compose up -d --build
```

## 📋 Development Notes

### Adding New Features
1. Create backend models, schemas, and services
2. Add API routes
3. Create frontend components and pages
4. Update routing if needed

### Database Changes
- Modify models in `backend/app/models/`
- Create new migration: `docker compose run --rm backend python -m alembic revision --autogenerate -m "description"`
- Apply migrations: `docker compose run --rm backend python -m alembic upgrade head`

### Frontend Development
- Changes are hot-reloaded in dev server
- Check browser console for errors
- Check frontend logs: `docker logs -f movie_frontend`

## 🔐 Security Notes

- Change `SECRET_KEY` in `backend/app/core/security.py` for production
- Use environment variables for sensitive data
- Validate all user inputs
- Use HTTPS in production
- Configure CORS properly for your domain

## 🐛 Troubleshooting

### "Port already in use"
- Change ports in `docker-compose.yml`
- Kill existing processes: `lsof -i :8000` then `kill -9 <PID>`

### "Database connection refused"
- Ensure `db` container is running: `docker compose ps`
- Check `.env` file DATABASE_URL is correct
- Wait a few seconds for DB to start on first run

### "Frontend can't reach backend"
- Check CORS is enabled in `backend/app/main.py`
- Verify backend is running: `docker logs movie_backend`
- Check API URL in `frontend/src/api/client.js`

### "Seats not showing"
- Run seed_seats.py: `docker exec -it movie_backend python seed_seats.py`
- Verify shows exist in database
- Check show_id is correct

## 📞 Support

For issues, check:
1. Docker logs: `docker compose logs`
2. Database status: `docker exec -it movie_db pg_isready`
3. API docs: http://localhost:8000/docs
4. Console errors in browser DevTools

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy booking movies! 🎬🎟️**
