import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api"; // Fetch notes API
import AddNote from "../AddNote/AddNote"; // New component for adding notes
import "./NotesContainer.scss";

const NotesContainer = () => {
  const [notesList, setNotesList] = useState([]);

  // Fetch Notes from API
  useEffect(() => {
    getNotes()
      .then((data) => {
        console.log("API Response:", data);
        setNotesList(data?.data?.data?.data || []);
      })
      .catch(() => setNotesList([]));
  }, []);

  // Function to handle adding new note
  const handleNotesList = (newNote) => {
    setNotesList([newNote, ...notesList]);
  };
  console.log("NotesList: ", notesList);
  return (
    <div className="note-container">
      {/* Add New Note */}
      <AddNote updateList={handleNotesList} />

      {/* Display Notes */}
    <div className="notes-list">
      {notesList.length > 0 ? (
        notesList.map((note,index) => <NoteCard key={note.id || index} noteDetails={note} />)
      ) : (
        <p>No notes available.</p>
      )}
    </div>
    </div>
  );
};

export default NotesContainer;
