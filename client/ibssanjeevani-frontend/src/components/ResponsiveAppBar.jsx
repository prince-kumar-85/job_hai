import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchor, setAnchor] = React.useState(null);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h6">
            IBSS SANJEEVANI
          </Typography>

          <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
            <Avatar>{user?.name?.[0]}</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem
              onClick={() => navigate(user.role === "admin" ? "/admin" : "/user")}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                navigate("/auth");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
