import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server"
import prisma from "./DB.js";
import authRouter from "./Routes/Auth.routes.js"


const app = express();
app.use(express.json());
app.use(express.static("public"))
app.use(cors())
app.use(morgan("dev"))
const httpserver = createServer(app);


const io = new Server(httpserver, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const ysocket = new YSocketIO(io)
ysocket.initialize()



// POST
app.use("/app/auth",authRouter)

app.post("/user", async (req, res) => {
    try {
        const { username, email } = req.body;

        const result = await prisma.user.create({
            data: { username, email },
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "OK",
        success: true
    })
})

httpserver.listen(8000, () => {
    console.log("Server running on port 8000");
})