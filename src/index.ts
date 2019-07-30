import app from './App'

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening to port ${port}`))