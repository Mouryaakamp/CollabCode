const express = require('express');
var cors = require('cors')
const app = express();
const createServer = require('http').createServer();
const io = require('server.io')(createServer);
const Server = require('socket.io');
const { YSocketIO } = require('y-socket.io/dist/server');



app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send("Server running successfully ")
})

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "OK",
        success: true
    })
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
})