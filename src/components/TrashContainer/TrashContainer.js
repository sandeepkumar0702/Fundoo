import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api"; 

const TrashContainer = () => {
  const [trashNotes, setTrashNotes] = useState([]);

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setTrashNotes(allNotes.filter((note) => note.isDeleted));
      })
      .catch(() => setTrashNotes([]));
  }, []);

  const handleTrashList = ({ action, data }) => {
    if (action === "restore") {
      setTrashNotes(trashNotes.filter((note) => note.id !== data.id)); // Remove restored note
    } else if (action === "delete") {
      setTrashNotes(trashNotes.filter((note) => note.id !== data.id)); // Remove permanently deleted note
    }
  };

  return (
    <div className="trash-container">
      <h2>Trash</h2>
      <div className="notes-list">
        {trashNotes.length > 0 ? (
          trashNotes.map((note) => <NoteCard key={note.id} noteDetails={note} updateList={handleTrashList} isTrash />)
        ) : (
          <p>No notes in Trash.</p>
        )}
      </div>
    </div>
  );
};

export default TrashContainer;
