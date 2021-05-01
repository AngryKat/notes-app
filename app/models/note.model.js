import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    content: String
}, {
    timestamps: true
})

export default mongoose.model('Note', NoteSchema);