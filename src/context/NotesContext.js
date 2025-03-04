import React, { createContext, useState, useEffect } from "react";
import { getNotes } from "../utils/Api";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notesList, setNotesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setNotesList(allNotes); // Fetch all notes
      })
      .catch(() => setNotesList([]));
  }, []);

  // Filter notes based on search query
  const filteredNotes = notesList.filter((note) =>
    (note.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <NotesContext.Provider value={{ notesList, setNotesList, searchQuery, setSearchQuery, filteredNotes }}>
      {children}
    </NotesContext.Provider>
  );
};