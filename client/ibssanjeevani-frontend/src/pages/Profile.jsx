import { useAuth } from "../context/AuthContext";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <h3>No user logged in</h3>;

  return (
    <>
      <ResponsiveAppBar />

      <div style={{ padding: 30 }}>
        <h2>My Profile</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>
    </>
  );
}
