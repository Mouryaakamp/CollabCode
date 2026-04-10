const express = require('express');
const dotenv=require('dotenv')
var cors = require('cors')
const { createServer } = require('http');
const Server = require('socket.io');
const { YSocketIO } = require('y-socket.io/dist/server');

dotenv.config();
const app = express();
app.use(express.static("public"))
app.use(cors())
const httpserver=createServer(app);


const io=Server(httpserver,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

const ysocket = new YSocketIO(io)
ysocket.initialize()



app.get("/health", (req, res) => {
    res.status(200).json({
        message: "OK",
        success: true
    })
})

httpserver.listen(8000, () => {
    console.log("Server running on port 8000");
})