import React, { useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NoteCard from "../NoteCard/NoteCard";
import AddNote from "../AddNote/AddNote";
import "./NotesContainer.scss";
import { NotesContext } from "../../context/NotesContext";

const NotesContainer = () => {
  const { notesList, setNotesList, filteredNotes } = useContext(NotesContext);
  const activeNotes = filteredNotes.filter((note) => !note.isArchived && !note.isDeleted);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 900);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const breakpointCols = {
    default: 3, // 4 columns by default
    1200: 3,   // 3 columns below 1200px
  };

  return (
    <div className="note-container">
      <AddNote updateList={handleNotesList} />
      <div className="notes-list">
        {activeNotes.length > 0 ? (
          isLargeScreen ? (
            <Masonry
              breakpointCols={breakpointCols}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {activeNotes.map((note) => (
                <div key={note.id}>
                  <NoteCard
                    noteDetails={note}
                    updateList={handleNotesList}
                  />
                </div>
              ))}
            </Masonry>
          ) : (
            activeNotes.map((note) => (
              <NoteCard
                key={note.id}
                noteDetails={note}
                updateList={handleNotesList}
              />
            ))
          )
        ) : (
          <p>No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default NotesContainer;
