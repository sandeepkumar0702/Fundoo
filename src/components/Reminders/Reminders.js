import React, { useContext } from "react";
import { NotesContext } from "../../context/NotesContext"; // Adjust the path based on your file structure
import NoteCard from "../NoteCard/NoteCard"; // Adjust the path based on your file structure
import { Box, Typography } from "@mui/material";

export default function Reminders() {
  const { notesList, setNotesList } = useContext(NotesContext);

  // Filter notes that have a reminder set and are not in the trash
  const reminderNotes = notesList.filter(
    (note) =>
      note.reminder &&
      !isNaN(new Date(note.reminder).getTime()) && // Ensure reminder is a valid date
      !note.isDeleted
  );

  // Function to update the notes list (passed to NoteCard)
  const updateList = ({ action, data }) => {
    if (action === "update") {
      const updatedNotes = notesList.map((note) =>
        note.id === data.id ? data : note
      );
      setNotesList(updatedNotes);
    } else if (action === "delete") {
      const updatedNotes = notesList.filter((note) => note.id !== data.id);
      setNotesList(updatedNotes);
    } else if (action === "archive" || action === "unarchive") {
      const updatedNotes = notesList.map((note) =>
        note.id === data.id ? { ...note, isArchived: data.isArchived } : note
      );
      setNotesList(updatedNotes);
    } else if (action === "color") {
      const updatedNotes = notesList.map((note) =>
        note.id === data.id ? { ...note, color: data.color } : note
      );
      setNotesList(updatedNotes);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {reminderNotes.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {reminderNotes.map((note) => (
            <NoteCard
              key={note.id}
              noteDetails={note}
              updateList={updateList}
              isTrash={false} // Since these are active reminders, not in trash
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No reminders set.
        </Typography>
      )}
    </Box>
  );
}