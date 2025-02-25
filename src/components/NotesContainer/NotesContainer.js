import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api"; 
import AddNote from "../AddNote/AddNote"; 
import "./NotesContainer.scss";

const NotesContainer = () => {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        console.log(data);
        setNotesList(allNotes.filter((note) => !note.isArchived && !note.isDeleted)); // Filter out deleted/archive notes
      })
      .catch(() => setNotesList([]));
  }, []);

  const handleNotesList = ({ action, data }) => {
    if (action === "add") {
      setNotesList([data, ...notesList]);
    } else if (action === "archive") {
      setNotesList(notesList.filter((note) => note.id !== data.id)); // Remove archived note
    } else if (action === "unarchive") {
      setNotesList([data, ...notesList]); // Add unarchived note back to list
    } else if (action === "delete") {
      setNotesList(notesList.filter((note) => note.id !== data.id)); // Remove deleted note from list
    }
  };

  return (
    <div className="note-container">
      <AddNote updateList={handleNotesList} />

      <div className="notes-list">
        {notesList.length > 0 ? (
          notesList.map((note) => <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />)
        ) : (
          <p>No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default NotesContainer;
