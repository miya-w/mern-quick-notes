import { useState, useEffect } from "react";
import * as notesAPI from '../../utilities/notes-api';
import AddNoteForm from "../../components/AddNoteForm/AddNoteForm";
import ListOfNotes from "../../components/ListOfNotes/ListOfNotes";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(function() {
    async function getNotes() {
      const notes = await notesAPI.index();
      setNotes(notes);
    }
    getNotes()
  }, []);

  function toggleOrder() {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newOrder);
  }

  function handleSort(evt) {
    toggleOrder();
    // eslint-disable-next-line 
    const formatNotes = notes.sort(function(a, b) {
      const aDate = new Date(a.createdAt)
      const bDate = new Date(b.createdAt)
      
      if (sortOrder === 'asc') return bDate - aDate
      if (sortOrder === 'desc') return aDate - bDate
    })
    setNotes([...formatNotes]);
  }

  return (
    <>
      <AddNoteForm notes={notes} setNotes={setNotes} sortOrder={sortOrder} />
      {
        notes.length !== 0 ? 
        <div>
          <button onClick={handleSort}>
            {sortOrder === 'desc' ? 'Sort in Descending Order' : 'Sort in Ascending Order'}
          </button>
          <h2>My Notes</h2>
          <ListOfNotes notes={notes} setNotes={setNotes} />
        </div>
        :
        <h2>No Notes Yet!</h2>
      }
    </>
  );
}