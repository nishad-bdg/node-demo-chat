const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on("connection", (socket) => {
    console.log("a user is joined", socket.id)
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})


