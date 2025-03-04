import React, { useContext } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { NotesContext } from "../../context/NotesContext";

const TrashContainer = () => {
  const { notesList, setNotesList, filteredNotes } = useContext(NotesContext);
  const trashNotes = filteredNotes.filter((note) => note.isDeleted);

  const handleTrashList = ({ action, data }) => {
    if (action === "restore") {
      setNotesList(notesList.filter((note) => note.id !== data.id));
    } else if (action === "delete") {
      setNotesList(notesList.filter((note) => note.id !== data.id));
    }
  };

  return (
    <div className="trash-container">
      <div className="notes-list">
        {trashNotes.length > 0 ? (
          trashNotes.map((note) => (
            <NoteCard
              key={note.id}
              noteDetails={note}
              updateList={handleTrashList}
              isTrash
            />
          ))
        ) : (
          <p>No notes in Trash.</p>
        )}
      </div>
    </div>
  );
};

export default TrashContainer;