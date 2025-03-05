import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, Menu, MenuItem, Modal } from "@mui/material";
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
import { archiveNotesApiCall, trashNotesApiCall, restoreNotesApiCall, deleteNoteForeverApiCall, changeColorAPI } from "../../utils/Api";
import AddNote from "../AddNote/AddNote";
import ColorPalette from "../ColorPalette/ColorPalette";

export default function NoteCard({ noteDetails, updateList, isTrash = false }) {
  const [hover, setHover] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleIconClick = ({ action, data }) => {
    if (action === "update") {
      updateList({ action: "update", data });
    } else if (action === "color") {
      setShowColors(false);
      changeColorAPI({ "noteIdList": [`${noteDetails.id}`], color: data })
        .then(() => updateList({ action: "color", data: { ...noteDetails, color: data } }))
        .catch((err) => console.error("Error changing color:", err));
    }
  };

  const handleArchiveToggle = () => {
    const newArchiveStatus = !noteDetails.isArchived;
    archiveNotesApiCall({ noteIdList: [noteDetails.id], isArchived: newArchiveStatus })
      .then((response) => {
        const updatedNote = { ...noteDetails, isArchived: newArchiveStatus };
        updateList({ data: updatedNote, action: newArchiveStatus ? "archive" : "unarchive" });
      })
      .catch((err) => console.error("Error updating archive status:", err));
  };

  const handleMoveToTrash = () => {
    trashNotesApiCall({ noteIdList: [noteDetails.id], isDeleted: true })
      .then((response) => {
        const updatedNote = { ...noteDetails, isDeleted: true };
        updateList({ data: updatedNote, action: "delete" });
      })
      .catch((err) => console.error("Error moving note to trash:", err));
    handleMenuClose();
  };

  const handleRestore = () => {
    restoreNotesApiCall({ noteIdList: [noteDetails.id], isDeleted: false })
      .then((response) => {
        const updatedNote = { ...noteDetails, isDeleted: false };
        updateList({ data: updatedNote, action: "restore" });
      })
      .catch((err) => console.error("Error restoring note:", err));
  };

  const handleDeleteForever = () => {
    deleteNoteForeverApiCall({ noteIdList: [noteDetails.id] })
      .then(() => {
        const updatedNote = { ...noteDetails, isDeleted: true }; // Assuming permanent delete still marks as deleted
        updateList({ data: updatedNote, action: "delete" });
      })
      .catch((err) => console.error("Error deleting note permanently:", err));
  };

  const handleColorChange = ({ noteId, color }) => {
    handleIconClick({ action: "color", data: color });
  };

  return (
    <Card
      sx={{
        width: 200,
        minHeight: 155,
        padding: 1,
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #ccc",
        transition: "box-shadow 0.3s ease-in-out",
        position: "relative",
        margin: "10px",
        backgroundColor: noteDetails?.color || "#FFFFFF",
        "&:hover": { boxShadow: 6 },
        overflow: "hidden",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardContent onClick={() => !isTrash && setModalOpen(true)}>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {noteDetails?.title || "Untitled"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
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
              <IconButton size="small" onClick={handleDeleteForever}>
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton size="small"><NotificationsNoneOutlined fontSize="small" /></IconButton>
              <IconButton size="small"><PersonAddOutlined fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => setShowColors(!showColors)}>
                <PaletteOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small"><ImageOutlined fontSize="small" /></IconButton>
              <IconButton size="small" onClick={handleArchiveToggle}>
                {noteDetails.isArchived ? <UnarchiveOutlined fontSize="small" /> : <ArchiveOutlined fontSize="small" />}
              </IconButton>
              <IconButton size="small" onClick={handleMenuOpen}><MoreVertOutlined fontSize="small" /></IconButton>
            </>
          )}
        </Box>
      )}

      {showColors && !isTrash && (
        <div style={{ 
          position: "absolute", 
          top: "2%", 
          left: "18%", 
          transform: "translate(-50%, -50%)", 
          zIndex: 7 
        }}>
          <ColorPalette onColorSelect={handleColorChange} noteId={noteDetails.id} />
        </div>
      )}

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMoveToTrash}>Delete note</MenuItem>
        <MenuItem onClick={handleMenuClose}>Add drawing</MenuItem>
        <MenuItem onClick={handleMenuClose}>Make a copy</MenuItem>
        <MenuItem onClick={handleMenuClose}>Show checkboxes</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy to Google Docs</MenuItem>
        <MenuItem onClick={handleMenuClose}>Version history</MenuItem>
      </Menu>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
          maxHeight: "80vh",
          overflowY: "auto",
        }}>
          <AddNote 
            updateList={updateList} 
            noteDetails={noteDetails} 
            setModalOpen={setModalOpen} 
            handleIconClick={handleIconClick} 
          />
        </Box>
      </Modal>
    </Card>
  );
}