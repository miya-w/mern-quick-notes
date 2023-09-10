import Note from "../Note/Note";

export default function ListOfNotes({ notes, setNotes }) {
  const note = notes.map(n => 
    <Note 
      notes={notes} 
      setNotes={setNotes}
      note={n} 
      key={n._id} 
    />
  );

  return (
    <>
      {note}
    </>
  );
}