// src/components/AddNote/AddNote.js
import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  TextField,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import {
  PushPinOutlined,
  CheckBoxOutlined,
  BrushOutlined,
  ImageOutlined,
  NotificationsNoneOutlined,
  PersonAddOutlined,
  PaletteOutlined,
  ArchiveOutlined,
  MoreVertOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@mui/icons-material";
import {
  addNoteApiCall,
  updateNoteApiCall,
  changeColorAPI,
} from "../../utils/Api";
import ColorPalette from "../ColorPalette/ColorPalette";
import "../NotesContainer/NotesContainer.scss";

const AddNote = ({
  updateList,
  noteDetails,
  setModalOpen,
  handleIconClick,
}) => {
  const [title, setTitle] = useState(noteDetails?.title || "");
  const [note, setNote] = useState(noteDetails?.description || "");
  const [color, setColor] = useState(noteDetails?.color || "#FFFFFF");
  const [isExpanded, setIsExpanded] = useState(!!noteDetails);
  const [showColors, setShowColors] = useState(false);
  const noteRef = useRef(null);

  const handleAddNote = useCallback(() => {
    if (title || note) {
      if (noteDetails) {
        // Edit mode
        updateNoteApiCall({
          ...noteDetails,
          title,
          description: note,
          noteId: noteDetails.id,
        }) // Updated to match your pattern
          .then((res) => {
            handleIconClick({
              action: "update",
              data: { ...noteDetails, title, description: note },
            });
            if (color !== noteDetails.color) {
              // If color changed
              changeColorAPI({ noteIdList: [`${noteDetails.id}`], color })
                .then(() => {
                  handleIconClick({ action: "color", data: color });
                })
                .catch((err) => console.error("Error changing color:", err));
            }
            setModalOpen(false);
          })
          .catch((err) => console.error("Error updating note:", err));
      } else {
        // Add mode
        const newNote = { title, description: note, color };
        addNoteApiCall(newNote)
          .then((response) => {
            // console.log("response",response?.data?.status?.details)
            updateList({
              action: "add",
              data: response?.data?.status?.details,
            });
            setTitle("");
            setNote("");
            setColor("#FFFFFF");
          })
          .catch((error) => console.error("Error adding note:", error));
      }
    }
    setIsExpanded(false);
  }, [
    title,
    note,
    color,
    updateList,
    noteDetails,
    handleIconClick,
    setModalOpen,
  ]);

  const handleColorChange = ({ color }) => {
    setColor(color);
    setShowColors(false);
    if (noteDetails) {
      // If editing, update color immediately
      handleIconClick({ action: "color", data: color });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        handleAddNote();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleAddNote]);

  return (
    <Card
      ref={noteRef}
      className={`note-card ${isExpanded ? "expanded" : "collapsed"}`}
      onClick={() => !noteDetails && setIsExpanded(true)}
      style={{ backgroundColor: color }}
    >
      <CardContent className="note-content">
        {isExpanded ? (
          <>
            <div className="title-row">
              <TextField
                placeholder="Title"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true, className: "text-field" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <IconButton className="icon-button">
                <PushPinOutlined />
              </IconButton>
            </div>

            <TextField
              placeholder="Take a note..."
              variant="standard"
              fullWidth
              multiline
              InputProps={{ disableUnderline: true, className: "text-field" }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="icon-row" style={{ position: "relative" }}>
              <IconButton className="icon-button">
                <NotificationsNoneOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <PersonAddOutlined />
              </IconButton>
              <IconButton
                className="icon-button"
                onClick={() => setShowColors(!showColors)}
              >
                <PaletteOutlined />
              </IconButton>
              {showColors && <ColorPalette onColorSelect={handleColorChange} />}
              <IconButton className="icon-button">
                <ImageOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <ArchiveOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <MoreVertOutlined />
              </IconButton>
              <IconButton className="icon-button disabled">
                <UndoOutlined />
              </IconButton>
              <IconButton className="icon-button disabled">
                <RedoOutlined />
              </IconButton>
              <Button className="close-button" onClick={handleAddNote}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <div className="collapsed-input">
            <TextField
              placeholder="Take a note..."
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                className: "text-field collapsed-text",
              }}
              disabled
            />
            <div className="collapsed-icons">
              <IconButton className="icon-button">
                <CheckBoxOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <BrushOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <ImageOutlined />
              </IconButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddNote;
