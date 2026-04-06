import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.brand} onClick={() => navigate("/")}>
          🎬 BookMyShow
        </div>

        <div style={styles.links}>
          <button onClick={() => navigate("/")} style={styles.navLink}>
            Home
          </button>

          {token ? (
            <>
              <button onClick={() => navigate("/my-bookings")} style={styles.navLink}>
                My Bookings
              </button>
              <span style={styles.userInfo}>
                👤 {user?.email || "User"}
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} style={styles.navLink}>
                Login
              </button>
              <button onClick={() => navigate("/signup")} style={styles.signupBtn}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#1a1a1a",
    padding: "12px 0",
    borderBottom: "2px solid #007bff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "color 0.3s",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  navLink: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  userInfo: {
    color: "#4A90E2",
    fontSize: "14px",
    fontWeight: "bold",
  },
  signupBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  logoutBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
