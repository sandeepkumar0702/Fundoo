import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api"; 

const ArchiveContainer = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setArchivedNotes(allNotes.filter((note) => note.isArchived && !note.isDeleted));
      })
      .catch(() => setArchivedNotes([]));
  }, []);

  const handleArchiveList = ({ action, data }) => {
    if (action === "unarchive") {
      setArchivedNotes(archivedNotes.filter((note) => note.id !== data.id)); // Remove unarchived note
    } else if (action === "delete") {
      setArchivedNotes(archivedNotes.filter((note) => note.id !== data.id)); // Remove deleted note
    } else if (action === "restore") {
      setArchivedNotes([data, ...archivedNotes]); // Add restored note back to archive...................
    }
    else if (action === "color") { // Added color action
      setArchivedNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, color: data.color } : note
        )
      );
    }
    else if (action === "update") {
      setArchivedNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    } 
  };

  return (
    <div className="archive-container">
      <h2>Archived Notes</h2>
      <div className="notes-list">
        {archivedNotes.length > 0 ? (
          archivedNotes.map((note) => <NoteCard key={note.id} noteDetails={note} updateList={handleArchiveList} />)
        ) : (
          <p>No archived notes available.</p>
        )}
      </div>
    </div>
  );
};

export default ArchiveContainer;
