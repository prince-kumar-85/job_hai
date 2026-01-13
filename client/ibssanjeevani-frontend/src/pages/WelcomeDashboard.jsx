import { Link } from "react-router-dom";

export default function WelcomeDashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to IBSSanjeevani</h1>
      <p>Healthcare Management System</p>

      <Link to="/auth">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Login / Register
        </button>
      </Link>
    </div>
  );
}
