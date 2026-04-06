const Seat = ({ seat, selected, onSelect }) => {
  const isBooked = seat.is_booked === 1;
  const isSelected = selected;

  let backgroundColor = "#90EE90"; // Green - available
  let borderColor = "#4CAF50";

  if (isBooked) {
    backgroundColor = "#FF6B6B"; // Red - booked
    borderColor = "#C92A2A";
  } else if (isSelected) {
    backgroundColor = "#4A90E2"; // Blue - selected
    borderColor = "#2E5C8A";
  }

  return (
    <button
      onClick={() => !isBooked && onSelect(seat.seat_number)}
      style={{
        width: "50px",
        height: "50px",
        margin: "5px",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        color: "white",
        cursor: isBooked ? "not-allowed" : "pointer",
        border: `2px solid ${borderColor}`,
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "bold",
        transition: "all 0.2s ease",
        opacity: isBooked ? 0.6 : 1,
      }}
      disabled={isBooked}
    >
      {seat.seat_number}
    </button>
  );
};

export default Seat;