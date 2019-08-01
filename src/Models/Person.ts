import mongoose, { Schema, Document } from 'mongoose'
import timestamp from 'mongoose-timestamp'

const db = mongoose.connection;

interface IPerson extends Document {
    firstName: string
    lastName: string
}

const PersonSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
})

PersonSchema.plugin(timestamp)

const PersonModel = db.model<IPerson>("person", PersonSchema)

export default PersonModel