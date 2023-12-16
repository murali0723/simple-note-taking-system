import React, { useState } from 'react';
import { createNote } from '../services/api';

const AddNoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createNote({ title, content });
      onAdd(response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div>
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNoteForm;
