import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, Menu, MenuItem } from "@mui/material";
import {
  NotificationsNoneOutlined,
  PersonAddOutlined,
  PaletteOutlined,
  ImageOutlined,
  ArchiveOutlined,
  UnarchiveOutlined,
  DeleteOutlined,
  RestoreFromTrashOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import { archiveNotesApiCall, trashNotesApiCall, restoreNotesApiCall } from "../../utils/Api";

export default function NoteCard({ noteDetails, updateList, isTrash = false }) {
  const [hover, setHover] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // Archive/Unarchive Note
  const handleArchiveToggle = () => {
    const newArchiveStatus = !noteDetails.isArchived;

    archiveNotesApiCall({
      noteIdList: [noteDetails.id],
      isArchived: newArchiveStatus,
    })
      .then(() => {
        updateList({ data: { ...noteDetails, isArchived: newArchiveStatus }, action: newArchiveStatus ? "archive" : "unarchive" });
      })
      .catch((err) => console.error("Error updating archive status:", err));
  };

  // Move to Trash
  const handleMoveToTrash = () => {
    trashNotesApiCall({ 
      noteIdList: [noteDetails.id], 
      isDeleted: true 
    })
      .then(() => {
        updateList({ data: noteDetails, action: "delete" });
      })
      .catch((err) => console.error("Error moving note to trash:", err));

    handleMenuClose();
  };

  // Restore from Trash
  const handleRestore = () => {
    restoreNotesApiCall({ noteIdList: [noteDetails.id], isDeleted: false })
      .then(() => {
        updateList({ data: noteDetails, action: "restore" });
      })
      .catch((err) => console.error("Error restoring note:", err));
  };

  return (
    <Card
      sx={{
        width: 200,
        minHeight: 120,
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
        <Typography variant="body1" fontWeight="bold">
          {noteDetails?.title || "Untitled"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {noteDetails?.description || "No description available"}
        </Typography>
      </CardContent>

      {hover && (
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: "0 8px 8px" }}>
          {isTrash ? (
            <>
              <IconButton size="small" onClick={handleRestore}>
                <RestoreFromTrashOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleMoveToTrash}>
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
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

              <IconButton size="small" onClick={handleArchiveToggle}>
                {noteDetails.isArchived ? <UnarchiveOutlined fontSize="small" /> : <ArchiveOutlined fontSize="small" />}
              </IconButton>

              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertOutlined fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      )}

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMoveToTrash}>Delete note</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add drawing</MenuItem>
        <MenuItem onClick={handleMenuClose}>Make a copy</MenuItem>
        <MenuItem onClick={handleMenuClose}>Show checkboxes</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy to Google Docs</MenuItem>
        <MenuItem onClick={handleMenuClose}>Version history</MenuItem>
      </Menu>
    </Card>
  );
}
