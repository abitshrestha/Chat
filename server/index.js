import express from 'express';
import 'dotenv/config.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { authRouter } from './routes/authRoute.js';
import { roomRouter } from './routes/roomRoute.js';
import { Server } from 'socket.io';
const app = express();
const port = process.env.PORT;
connectDB();
app.use(cors());
app.use(express.json());
app.use('/', authRouter);
app.use('/', roomRouter);
app.get('/', (req, res) => {
    res.send('Welcome to Express & Typescript Server');
});
const server = app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});
io.on('connection', (socket) => {
    console.log('client connected');
    socket.on('join__room', (data) => {
        const { roomId } = data;
        socket.join(roomId);
    });
    socket.on('send message', (data) => {
        console.log(data);
        io.to(data.roomId).emit('receive-message', { message: data.message, userId: data.userId, username: data.username });
    });
});
