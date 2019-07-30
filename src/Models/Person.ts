import Mongoose, { Schema, Document } from 'mongoose'

Mongoose.connect("mongodb://localhost/mern_1", { useNewUrlParser: true })

interface IPerson extends Document {
    firstName: string
    lastName: string
}

const PersonSchema = new Schema({
    firstName: String,
    lastName: String
})

const PersonModel = Mongoose.model<IPerson>("person", PersonSchema)

export default PersonModel