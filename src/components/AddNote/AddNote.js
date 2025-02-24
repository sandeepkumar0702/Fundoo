import React, { useRef, useEffect, useState, useCallback } from "react";
import { TextField, Card, CardContent, IconButton, Button } from "@mui/material";
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
import { addNoteApiCall } from "../../utils/Api"; // API Call
import "../NotesContainer/NotesContainer.scss";

const AddNote = ({ updateList, ...props }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const noteRef = useRef(null);

  // Function to add a new note via API (wrapped in useCallback)
  const handleAddNote = useCallback(() => {
    if (title || note) {
      const newNote = { title, description: note };

      addNoteApiCall(newNote)
        .then(() => {
          console.log("hyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy:", newNote);
          updateList(newNote); // Update the UI
          setTitle("");
          setNote("");
        })
        .catch((error) => console.error("Error adding note:", error));
    }
    setIsExpanded(false);
  }, [title, note, updateList]); // Dependencies for useCallback

  // Close note input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        handleAddNote();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleAddNote]); // Include handleAddNote in dependencies

  return (
    <Card
      ref={noteRef}
      className={`note-card ${isExpanded ? "expanded" : "collapsed"}`}
      onClick={() => setIsExpanded(true)}
    >
      <CardContent className="note-content">
        {isExpanded ? (
          <>
            {/* Title Input */}
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

            {/* Note Input */}
            <TextField
              placeholder="Take a note..."
              variant="standard"
              fullWidth
              multiline
              InputProps={{ disableUnderline: true, className: "text-field" }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Toolbar */}
            <div className="icon-row">
              <IconButton className="icon-button">
                <NotificationsNoneOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <PersonAddOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <PaletteOutlined />
              </IconButton>
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
          /* Collapsed State */
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