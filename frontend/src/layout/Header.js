import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          style={{ marginLeft: "10px", flexGrow: 1 }}
        >
          Mytube
        </Typography>
        <Box style={{ display: "flex", alignItems: "center", flexGrow: 3 }}>
          <InputBase
            placeholder="Tìm kiếm"
            inputProps={{ "aria-label": "search" }}
            style={{
              backgroundColor: "#f0f0f0",
              padding: "6px 10px",
              borderRadius: "20px 0 0 20px",
              width: "100%",
              color: "#000000",
            }}
          />
          <IconButton
            type="submit"
            aria-label="search"
            style={{
              padding: "6px",
              backgroundColor: "#f0f0f0",
              borderRadius: "0 20px 20px 0",
            }}
          >
            <SearchIcon style={{ color: "#000000" }} />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="mic"
            style={{ marginLeft: "10px" }}
          >
            <MicIcon style={{ color: "#000000" }} />
          </IconButton>
        </Box>
        <IconButton color="inherit" aria-label="more">
          <MoreVertIcon />
        </IconButton>
        <Button
          color="primary"
          variant="outlined"
          style={{
            marginLeft: "10px",
            borderColor: "#3ea6ff",
            color: "#3ea6ff",
          }}
        >
          Đăng nhập
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;