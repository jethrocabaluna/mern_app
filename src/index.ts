import mongoose from 'mongoose'
import app from './App'
import config from './config'

app.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        { useNewUrlParser: true }
    )
    console.log(`Listening to port ${config.PORT}`)
})