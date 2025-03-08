import React, { useState, useContext } from "react";
import "./Navbar.scss";
import { Menu, RotateCw, Settings, Rows2, Grip, Search } from "lucide-react";
import { Avatar } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { NotesContext } from "../../context/NotesContext";

function Navbar({ toggleSidebar, activePage }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setSearchQuery } = useContext(NotesContext);
  const firstLetter = localStorage.getItem("email")?.charAt(0).toLocaleUpperCase() || "U";

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <div className="dashboard-header-left-container">
          <div className="header-left-container-menu">
            <Menu className="icons" onClick={toggleSidebar} />
          </div>
          <div className="header-left-container-logo">
          <img
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              alt="Google Keep logo"
          />

          </div>
          <div className="header-left-container-title">{activePage}</div>
        </div>
      </div>
      <div className="header-right">
        <div className="dashboard-header-middle-container">
          <div className="header-middle-search-icon">
            <Search className="search-icon" />
          </div>
          <input
            className="header-middle-search-input"
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
          />
        </div>
        <div className="dashboard-header-right-container">
          <div className="header-right-container-icons">
            <div className="icon-div"><RotateCw className="icons" /></div>
            <div className="icon-div row-icon"><Rows2 className="icons" /></div>
            <div className="icon-div"><Settings className="icons" /></div>
          </div>
          <div className="header-right-container-account">
            <div className="icon-div-account2"><Grip className="icons" /></div>
            <div className="icon-div-account" onClick={handleProfileClick}>
              <Avatar sx={{ bgcolor: "#8a6aff", width: 40, height: 40, fontSize: 20 }}>
                {firstLetter}
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} />
    </div>
  );
}

export default Navbar;