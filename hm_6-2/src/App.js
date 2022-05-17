import { nanoid } from 'nanoid';
import React, {useState, useEffect} from 'react'
import './App.css';
import Note from './components/Note';

function App() {
 const [note, setNote] = useState('');
 const [notesAll, setNotesAll] = useState([]);

 const loadNotes = () => {
   fetch('http://localhost:7777/notes')
      .then(response => response.json()) 
      .then(notes => {console.log(notes)
        setNotesAll(prev => prev = notes);
      })  
 }
 
 const addNote = (item) => {
   fetch('http://localhost:7777/notes', {
    method: 'POST',
    body: JSON.stringify(item),
  headers: {
    'Content-Type': 'application/json'}
   })
   .then(response => 
    {if(response.status === 204)
    {loadNotes()}}
    )
 }

 const onSubmitHandle = (e) => {
  e.preventDefault();
  const item = {
    id: nanoid(),
    content: note,
  }
  
  addNote(item)
    setNote('')
 }

 const onRemove = (e) => {
   console.log(e.target)
   const id = e.target.id;
   fetch(`http://localhost:7777/notes/${id}`,{
     method: 'DELETE'
   })
   .then(response => {if(response.status === 204){
     loadNotes();
   }})
 }
 const onChangeHandle = (e) => {
  setNote(prev => prev = e.target.value);
 }

 const onClickUpload = () => {
   loadNotes();
 }
 useEffect(() => {
   loadNotes()
 }, [])

useEffect(() => {
   console.log(notesAll)
}, [notesAll])



   return (<div className='notesBox'>
   <div className='notesBoxTitle'>
      <h2 className='noteTitle'>Notes</h2>
      <button className='notesButtonUpload' onClick={onClickUpload}>&#128472;</button>
   </div>
   <div className='noteBoxNotes'>
   {notesAll.map(el => <Note item={el}  key={el.id} func={onRemove}/>)}
   </div> 
    <form className='noteForm' onSubmit={onSubmitHandle}>
     <label for='noteInput' className='noteLabel' >New note
     <input className='noteInput' name='noteInput' type='text' required onChange={onChangeHandle} value={note}/></label>
     <button className='noteButton'>&#10148;</button>
    </form>
  </div>
    
   )
}



export default App

