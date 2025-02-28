// src/components/NotesContainer/NotesContainer.js
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
        setNotesList(allNotes.filter((note) => !note.isArchived && !note.isDeleted));
      })
      .catch(() => setNotesList([]));
  }, []);

  const handleNotesList = ({ action, data }) => {
    if (action === "add") {
      setNotesList([data, ...notesList]);
    } else if (action === "archive") {
      setNotesList(notesList.filter((note) => note.id !== data.id));
    } else if (action === "unarchive") {
      setNotesList([data, ...notesList]);
    } else if (action === "delete") {
      setNotesList(notesList.filter((note) => note.id !== data.id));
    } else if (action === "update") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    } else if (action === "restore") {
      setNotesList([data, ...notesList]);
    } else if (action === "color") { // Added color action
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
        {notesList.length > 0 ? (
          notesList.map((note) => (
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