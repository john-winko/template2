import {useEffect, useState} from "react";
import {useAxios} from "../utils/useAxios";
import NoteItem from "../components/NoteItem";

function Notes() {
    const [notes, setNotes] = useState([])
    // "Trigger" for refreshing notes, initial true means it will pull on page load
    const [noteChanged, setNoteChanged] = useState(true)
    const [editItem, setEditItem] = useState(null)
    const backend = useAxios()

    useEffect(() => {        
        const getNotes = async () => {
            let response = await backend.get('/api/v1/user/my_notes/')
            if (response.status === 200) {
                setNotes(response.data)
            } else {
                console.log("Error in response", response)
            }
        }
        if (noteChanged)
            getNotes()
        setNoteChanged(false)
    }, [noteChanged, backend])

    const addNote = (formEvent) => {
        // For this implementation we will always pull from backend so
        // that we can see what data is saved
        backend.post('/api/v1/note/new/', new FormData(formEvent.target))
            .then((res)=>{
                setNoteChanged(true)
            })
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>This is the notes page</h1>
            <hr/>
            <form style={{textAlign: "center"}} onSubmit={addNote}>
                <input type={"text"} name={"body"}/>
                <button type={"submit"}>Add</button>
            </form>
            <ul>{notes.map(note =>
                <NoteItem key={note.id} {...{note, editItem, setEditItem, setNoteChanged}}/>)
            }</ul>
        </div>
    )
}

export default Notes