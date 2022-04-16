import {useAxios} from "../utils/useAxios";

function NoteItem({note, editItem, setEditItem, setNoteChanged}) {
    const backend = useAxios()

    const deleteItem = (id) =>
        backend.delete(`/api/v1/note/${id}/`)
            .then(()=>setNoteChanged(true))


    const ViewItem = () => {
        return (
            <li>
                <button onClick={()=>deleteItem(note.id)}>Delete</button>
                <button onClick={() => setEditItem(note.id)}>Edit</button>
                {note.body}
            </li>
        )
    }

    const saveItem = (e) => {
        e.preventDefault()
        backend.put(`/api/v1/note/${note.id}/`, new FormData(e.target))
            .then((res)=>{
                console.log("res", res)
                setEditItem(null)
                setNoteChanged(true)
            })

    }

    const EditItem = () => {
        return (
            <li>
                <form onSubmit={saveItem}>
                    <button type={"submit"}>Save</button>
                    <input name={"id"} type={"hidden"} />
                    <input name={"body"} defaultValue={note.body}/>
                </form>
            </li>
        )
    }
    return editItem === note.id ? <EditItem/> : <ViewItem/>
}

export default NoteItem