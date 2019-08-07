import mongoose, { Schema, Document } from 'mongoose'
import timestamp from 'mongoose-timestamp'

const db = mongoose.connection

interface IPost extends Document {
    created_by: Object
    title: string
    body: string
    followers: Object[]
}

const PostSchema = new Schema({
    created_by: {
        type: Object
    },
    title: {
        type: String,
        required: true,
        maxlength: 30
    },
    body: {
        type: String,
        required: true
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Person"
        }
    ]
})

PostSchema.plugin(timestamp)

const PostModel = db.model<IPost>("post", PostSchema)

export default PostModel