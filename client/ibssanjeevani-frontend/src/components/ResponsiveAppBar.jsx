import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  InputBase,
  Button,
  Container,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar sx={{ gap: 2 }}>
            
            {/* LOGO */}
            <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <img src={logo} alt="Logo" height={42} />
            </Box>

            {/* SEARCH BAR */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                border: "1px solid #2e7d32",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <InputBase
                placeholder="Search for products..."
                sx={{ px: 2, flex: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: 0,
                  bgcolor: "#2e7d32",
                  px: 3,
                }}
              >
                GO
              </Button>
            </Box>

            {/* ICONS */}
            <IconButton>
              <ShoppingCartOutlinedIcon />
            </IconButton>

            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              {user ? (
                <Avatar sx={{ bgcolor: "#2e7d32" }}>
                  {user.name?.[0]?.toUpperCase()}
                </Avatar>
              ) : (
                <PersonOutlineIcon />
              )}
            </IconButton>

            {/* USER MENU */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {!user && (
                <MenuItem onClick={() => navigate("/auth")}>
                  Login / Register
                </MenuItem>
              )}

              {user && (
                <>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      navigate(user.role === "admin" ? "/admin" : "/user")
                    }
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
                </>
              )}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ================= CATEGORY BAR ================= */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "#ffffff", borderTop: "1px solid #eee" }}
      >
        <Container maxWidth="xl">
          <Toolbar variant="dense">
            <Stack direction="row" spacing={3} sx={{ fontSize: 14 }}>
              {[
                "Wellness",
                "Shop By Concern",
                "Ask An Expert",
                "Build Your Own Box",
                "Explore",
                "Bulk Enquiry",
              ].map((item) => (
                <Box
                  key={item}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "#2e7d32" },
                  }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
