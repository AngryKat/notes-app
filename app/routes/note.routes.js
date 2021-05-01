import { createNote, findAllNotes, updateNote, findOneNote, deleteNote} from '../controllers/note.controller.js';

const routes = (app) => {
    
    //create note
    app.post('/notes', createNote);

    //get all notes
    app.get('/notes', findAllNotes)

    //get by id
    app.get('/notes/:id', findOneNote)

    //update note by id
    app.put('/notes/:id', updateNote)

    //delete note by id
    app.delete('/notes/:id', deleteNote)
}

export default routes;