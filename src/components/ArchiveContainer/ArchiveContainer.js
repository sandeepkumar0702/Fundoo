import React, { useContext } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { NotesContext } from "../../context/NotesContext";

const ArchiveContainer = () => {
  const { notesList, setNotesList, filteredNotes } = useContext(NotesContext);
  const archivedNotes = filteredNotes.filter((note) => note.isArchived && !note.isDeleted);

  const handleArchiveList = ({ action, data }) => {
    if (action === "unarchive") {
      setNotesList(notesList.filter((note) => note.id !== data.id));
    } else if (action === "delete") {
      setNotesList(notesList.filter((note) => note.id !== data.id));
    } else if (action === "restore") {
      setNotesList([data, ...notesList]);
    } else if (action === "color") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, color: data.color } : note
        )
      );
    } else if (action === "update") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    }
  };

  return (
    <div className="archive-container">
      <div className="notes-list">
        {archivedNotes.length > 0 ? (
          archivedNotes.map((note) => (
            <NoteCard
              key={note.id}
              noteDetails={note}
              updateList={handleArchiveList}
            />
          ))
        ) : (
          <p>No archived notes available.</p>
        )}
      </div>
    </div>
  );
};

export default ArchiveContainer;