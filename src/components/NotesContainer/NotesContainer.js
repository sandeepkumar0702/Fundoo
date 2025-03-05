import React, { useContext } from "react";
import NoteCard from "../NoteCard/NoteCard";
import AddNote from "../AddNote/AddNote";
import "./NotesContainer.scss";
import { NotesContext } from "../../context/NotesContext";

const NotesContainer = () => {
  const { notesList, setNotesList, filteredNotes } = useContext(NotesContext);
  const activeNotes = filteredNotes.filter((note) => !note.isArchived && !note.isDeleted);

  const handleNotesList = ({ action, data }) => {
    if (action === "add") {
      setNotesList([data, ...notesList]);
    } else if (action === "archive" || action === "delete") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    } else if (action === "unarchive" || action === "restore") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    } else if (action === "update") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    } else if (action === "color") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, color: data.color } : note
        )
      );
    }
  };

  return (
    <div className="note-container">
      <AddNote updateList={handleNotesList} />
      <div className="notes-list">
        {activeNotes.length > 0 ? (
          activeNotes.map((note) => (
            <NoteCard
              key={note.id}
              noteDetails={note}
              updateList={handleNotesList}
            />
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default NotesContainer;