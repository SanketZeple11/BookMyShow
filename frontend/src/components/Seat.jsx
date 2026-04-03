const Seat = ({ seat, selected, onSelect }) => {
  const isBooked = seat.is_booked;

  let bg = "#ccc"; // default

  if (isBooked) bg = "red";
  else if (selected) bg = "blue";
  else bg = "green";

  return (
    <div
      onClick={() => !isBooked && onSelect(seat.seat_number)}
      style={{
        width: "40px",
        height: "40px",
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
        color: "white",
        cursor: isBooked ? "not-allowed" : "pointer",
      }}
    >
      {seat.seat_number}
    </div>
  );
};

export default Seat;