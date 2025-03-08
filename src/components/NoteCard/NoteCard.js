import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Popover,
  Modal,
  Button,
  Chip,
} from "@mui/material";
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
import {
  archiveNotesApiCall,
  trashNotesApiCall,
  restoreNotesApiCall,
  deleteNoteForeverApiCall,
  changeColorAPI,
  setReminderApiCall,
  removeReminderApiCall,
} from "../../utils/Api";
import AddNote from "../AddNote/AddNote";
import ColorPalette from "../ColorPalette/ColorPalette";

export default function NoteCard({ noteDetails, updateList, isTrash = false }) {
  const [hover, setHover] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [reminderAnchor, setReminderAnchor] = useState(null);
  const [reminder, setReminder] = useState(noteDetails?.reminder || null);
  const [tempDate, setTempDate] = useState("");
  const [tempTime, setTempTime] = useState("");

  // Determine if the note has long text (e.g., > 100 characters)
  const isLongText = (noteDetails?.description?.length || 0) > 100;

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleIconClick = ({ action, data }) => {
    if (action === "update") {
      updateList({ action: "update", data });
    } else if (action === "color") {
      setShowColors(false);
      changeColorAPI({ noteIdList: [`${noteDetails.id}`], color: data })
        .then(() =>
          updateList({ action: "color", data: { ...noteDetails, color: data } })
        )
        .catch((err) => console.error("Error changing color:", err));
    }
  };

  const handleArchiveToggle = () => {
    const newArchiveStatus = !noteDetails.isArchived;
    archiveNotesApiCall({
      noteIdList: [noteDetails.id],
      isArchived: newArchiveStatus,
    })
      .then((response) => {
        const updatedNote = { ...noteDetails, isArchived: newArchiveStatus };
        updateList({
          data: updatedNote,
          action: newArchiveStatus ? "archive" : "unarchive",
        });
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
        updateList({ data: noteDetails, action: "delete" });
      })
      .catch((err) => console.error("Error deleting note permanently:", err));
  };

  const handleColorChange = ({ noteId, color }) => {
    handleIconClick({ action: "color", data: color });
  };

  const handleReminderOpen = (event) => {
    setReminderAnchor(event.currentTarget);
    if (reminder && !isNaN(new Date(reminder).getTime())) {
      const date = new Date(reminder);
      setTempDate(date.toISOString().slice(0, 10));
      setTempTime(date.toISOString().slice(11, 16));
    } else {
      setTempDate("");
      setTempTime("");
    }
  };

  const handleReminderClose = () => {
    setReminderAnchor(null);
    setTempDate("");
    setTempTime("");
  };

  const handleDateChange = (e) => setTempDate(e.target.value);
  const handleTimeChange = (e) => setTempTime(e.target.value);

  const handleSubmit = () => {
    if (tempDate && tempTime) {
      const combinedDateTime = `${tempDate}T${tempTime}:00.000Z`;
      const payload = {
        noteIdList: [noteDetails?.id],
        reminder: combinedDateTime,
      };
      setReminderApiCall(payload)
        .then((response) => {
          setReminder(combinedDateTime);
          updateList({
            action: "update",
            data: { ...noteDetails, reminder: combinedDateTime },
          });
          handleReminderClose();
        })
        .catch((err) => console.log(err.message));
    }
  };

  const handleDeleteReminder = () => {
    const payload = { noteIdList: [noteDetails?.id] };
    removeReminderApiCall(payload)
      .then((response) => {
        setReminder(null);
        updateList({
          action: "update",
          data: { ...noteDetails, reminder: null },
        });
      })
      .catch((err) => console.error("Error removing reminder:", err));
  };

  return (
    <Card
      sx={{
        width: 260, // Fixed width for all cards
        minHeight: isLongText ? 250 : 155, // Taller for long text
        maxHeight: isLongText ? 500 : 300, // Much taller max height for long text
        padding: 1,
        borderRadius: 2,
        boxShadow: "none",
        border: "1px solid #ccc",
        transition: "box-shadow 0.3s ease-in-out",
        position: "relative",
        margin: "10px",
        backgroundColor: noteDetails?.color || "#FFFFFF",
        "&:hover": { boxShadow: 6 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardContent
        onClick={() => !isTrash && setModalOpen(true)}
        sx={{ flexGrow: 1, overflow: "hidden" }}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {noteDetails?.title || "Untitled"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            maxHeight: isLongText ? 300 : 80, // Much more room for long text
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: isLongText ? 15 : 4, // More lines for long text
            WebkitBoxOrient: "vertical",
          }}
        >
          {noteDetails?.description || "No description available"}
        </Typography>
        {reminder && !isNaN(new Date(reminder).getTime()) && (
          <Chip
            icon={<NotificationsNoneOutlined sx={{ fontSize: "1rem" }} />}
            label={`${new Date(reminder).toLocaleString()}`}
            onDelete={handleDeleteReminder}
            size="small"
            sx={{
              mt: 1,
              backgroundColor: "#f5f5f5",
              border: "1px solid #dadce0",
              borderRadius: "10px",
              fontSize: "0.75rem",
              color: "#5f6368",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              boxShadow: 1,
              "& .MuiChip-deleteIcon": { display: "none" },
              "&:hover": {
                boxShadow: 3,
                "& .MuiChip-deleteIcon": { display: "block" },
              },
            }}
          />
        )}
      </CardContent>

      {hover && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 8px 8px",
            flexShrink: 0,
          }}
        >
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
              <IconButton size="small" onClick={handleReminderOpen}>
                <NotificationsNoneOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <PersonAddOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => setShowColors(!showColors)}>
                <PaletteOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <ImageOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleArchiveToggle}>
                {noteDetails.isArchived ? (
                  <UnarchiveOutlined fontSize="small" />
                ) : (
                  <ArchiveOutlined fontSize="small" />
                )}
              </IconButton>
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertOutlined fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      )}

      {showColors && !isTrash && (
        <div
          style={{
            position: "absolute",
            top: "2%",
            left: "18%",
            transform: "translate(-50%, -50%)",
            zIndex: 7,
          }}
        >
          <ColorPalette onColorSelect={handleColorChange} noteId={noteDetails.id} />
        </div>
      )}

      <Popover
        open={Boolean(reminderAnchor)}
        anchorEl={reminderAnchor}
        onClose={handleReminderClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Pick Date And Time
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Date
            </Typography>
            <input
              type="date"
              value={tempDate}
              onChange={handleDateChange}
              min={new Date().toISOString().slice(0, 10)}
              style={{
                width: "90%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Time
            </Typography>
            <input
              type="time"
              value={tempTime}
              onChange={handleTimeChange}
              style={{
                width: "90%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleReminderClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!tempDate || !tempTime}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Popover>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
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
        <Box
          sx={{
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
          }}
        >
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