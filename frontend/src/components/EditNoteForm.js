import React, { useState, useEffect } from 'react';
import { updateNote } from '../services/api';

const EditNoteForm = ({ note, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateNote(note._id, { title, content });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditNoteForm;
