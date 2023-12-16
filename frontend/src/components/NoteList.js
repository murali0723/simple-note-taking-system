import React, { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../services/api';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h2>Note List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <div>
              <strong>{note.title}</strong>
            </div>
            <div>{note.content}</div>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
