const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.static('.'))

app.get('/post/:id', (req, res) => {
    res.sendFile(path.resolve('post.html'))
});

app.listen(PORT, () => { console.log(`Running on port: ${PORT}`) })