import React, { useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import NoteCard from "../NoteCard/NoteCard";
import { NotesContext } from "../../context/NotesContext";
import "./ArchiveContainer.scss"; // Import the SCSS file

const ArchiveContainer = () => {
  const { setNotesList, filteredNotes } = useContext(NotesContext);
  const archivedNotes = filteredNotes.filter((note) => note.isArchived && !note.isDeleted);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 900);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleArchiveList = ({ action, data }) => {
    if (action === "unarchive" || action === "delete") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    } else if (action === "restore") {
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
    } else if (action === "update") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    }
  };

  const breakpointCols = {
    default: 4, // 4 columns by default
    1200: 3,   // 3 columns below 1200px
  };

  return (
    <div className="archive-container">
      <div className="notes-list">
        {archivedNotes.length > 0 ? (
          isLargeScreen ? (
            <Masonry
              breakpointCols={breakpointCols}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {archivedNotes.map((note) => (
                <div key={note.id}>
                  <NoteCard
                    noteDetails={note}
                    updateList={handleArchiveList}
                  />
                </div>
              ))}
            </Masonry>
          ) : (
            archivedNotes.map((note) => (
              <NoteCard
                key={note.id}
                noteDetails={note}
                updateList={handleArchiveList}
              />
            ))
          )
        ) : (
          <p>No archived notes available.</p>
        )}
      </div>
    </div>
  );
};

export default ArchiveContainer;