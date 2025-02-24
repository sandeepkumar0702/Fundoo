import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, Menu, MenuItem } from "@mui/material";
import {
  NotificationsNoneOutlined,
  PersonAddOutlined,
  PaletteOutlined,
  ImageOutlined,
  ArchiveOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";

export default function NoteCard({ noteDetails, container, ...props }) {
  const [hover, setHover] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Handle menu open
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Card
      sx={{
        width: 200,
        padding: 1,
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #ccc",
        transition: "box-shadow 0.3s ease-in-out",
        position: "relative",
        margin: "10px",
        "&:hover": {
          boxShadow: 6,
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="body1" fontWeight="bold">
          {noteDetails?.title || "Untitled"}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="textSecondary">
          {noteDetails?.description || "No description available"}
        </Typography>
      </CardContent>

      {/* Toolbar Icons - Only Visible on Hover */}
      {hover && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 8px 8px",
          }}
        >
          <IconButton size="small">
            <NotificationsNoneOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <PersonAddOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <PaletteOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <ImageOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <ArchiveOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertOutlined fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Dropdown Menu */}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Delete note</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add label</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add drawing</MenuItem>
        <MenuItem onClick={handleMenuClose}>Make a copy</MenuItem>
        <MenuItem onClick={handleMenuClose}>Show checkboxes</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy to Google Docs</MenuItem>
        <MenuItem onClick={handleMenuClose}>Version history</MenuItem>
      </Menu>
    </Card>
  );
}
