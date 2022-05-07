import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useUserAuth } from "./Components/Contexts/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { ImgAvatar } from "./Components/ImgAvatar";
const ResponsiveAppBar = () => {
  let { user, logOut } = useUserAuth();
  const pages = user
    ? ["New feed", "Matching chat"]
    : ["New feed", "Matching chat", "About us", "Contact"];
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  useEffect(() => {
    setAvatar(null);
    findAvatar();
  }, [user]);
  const findAvatar = async () => {
    const docRef = doc(db, "Avatar", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setAvatar(docSnap.data());
    }
  };
  const [avatar, setAvatar] = useState();

  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, color: "white" }}
          >
            THINKIN
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            THINKIN
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={page}
                sx={{ margin: 1, color: "white", display: "block" }}
              >
                <Typography variant="button">{page}</Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Avatar
                    alt="Remy Sharp"
                    src={avatar ? ImgAvatar[avatar.avatarID].scr : ""}
                  />
                </Box>
                <Button
                  style={{ color: "white", marginLeft: 10 }}
                  onClick={() => logOut()}
                >
                  <a>
                    <Typography variant="button">log out</Typography>
                  </a>
                </Button>
              </Box>
            ) : (
              <>
                <Button
                  style={{ color: "white" }}
                  onClick={() => navigate("/")}
                >
                  <a>
                    <Typography variant="button">Log in</Typography>
                  </a>
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    color: "rgba(0, 71, 187, 1)",
                    marginLeft: 10,
                    borderColor: "#FFFFFF",
                    backgroundColor: "#FFFFFF",
                  }}
                  onClick={() => navigate("/signup")}
                >
                  <a>
                    <Typography variant="button">Sign up</Typography>
                  </a>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
