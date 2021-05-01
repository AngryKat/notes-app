import Note from '../models/note.model.js';


    export function createNote(req, res){

        // validate request
        if(!req.body.content) {
            return res.status(400).send({
                message: 'Content cannot be empty'
            })
        }

        // new note model
        const note = new Note({
            title: req.body.title || 'Untitled',
            content: req.body.content
        });

        // save to db
        note.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log('could not save ', err)
        })
    }

    // get all notes
    export function findAllNotes(req, res){
        Note.find()
        .then(data => {
            res.send(data)
        }).catch(err => {
            console.log("could not load all notes ", err)
        })

    }

    //get note by id
    export function findOneNote(req, res){
        Note.findById(req.params.id)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: 'Could not find note with id ' + req.params.id
                })
            }
            res.send(note)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Could not find note with id ' + req.params.id
                })
            }
            return res.status(500).send({
                message: 'Error while retrieving'
            })
        })
    }

    // update note by id
    export function updateNote(req, res){
        // validate request
        if(!req.body.content) {
            return res.status(400).send({
                message: 'content cannot be empty'
            })
        }

        //find by id and update with request body
        Note.findOneAndUpdate(req.params.id, {
            title: req.body.title || 'Untitled',
            content: req.body.content
        }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: 'could not find note with id ' + req.params.id
                })
            }

            res.send(note)
        }).catch( err => {
            if(err.kind === 'ObjectId') {
                return res.status(404),send({
                    message: 'could not find note with id ' + req.params.id
                })
            }

            return res.status(500).send({
                message: 'could not find and update note with id ' + req.params.id
            })
        })
        
    }

    // delete note by id
    export function deleteNote(req, res) {
        Note.findByIdAndRemove(req.params.id)
        .then(note => {
            if(!note) {
                return res.send(404),send({
                    message: 'could not find note with id ' + req.params.id
                })
            }

            res.send('Deleted succesfully!') 
        }).catch( err => {
            if(err.kind === 'ObjectId') {
                return res.status(404),send({
                    message: 'could not find note with id ' + req.params.id
                })
            }

            return res.status(500).send({
                message: 'could not find and delete note with id ' + req.params.id
            })
        })
    }

