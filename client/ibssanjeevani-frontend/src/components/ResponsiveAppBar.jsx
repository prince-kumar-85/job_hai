import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const pages =
    user?.role === "admin"
      ? ["Admin Dashboard", "Manage Users", "Reports"]
      : ["User Dashboard", "Appointments", "Profile"];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleDashboard = () => {
    navigate(user.role === "admin" ? "/admin" : "/user");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>

          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={logo} alt="logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6">IBSS SANJEEVANI</Typography>
          </Box>

          {/* PAGES */}
          <Box>
            {pages.map((page) => (
              <Button key={page} sx={{ color: "white" }}>
                {page}
              </Button>
            ))}
          </Box>

          {/* PROFILE MENU */}
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <Avatar>{user?.name?.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <MenuItem onClick={() => navigate("/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleDashboard}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
