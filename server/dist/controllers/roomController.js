import { Room } from '../models/Room.js';
export const createRoom = async (req, res, next) => {
    const { roomCode, userId } = req.body;
    try {
        const room = new Room({ roomCode, users: [userId] });
        await room.save();
        res.status(200).json({ room });
    }
    catch (error) {
        console.log(error);
    }
};
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({});
        res.status(200).json({ rooms });
    }
    catch (error) {
        console.log(error);
    }
};
export const updateRoom = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        // Check if the user is already in the room
        if (room.users.includes(userId)) {
            return res.status(200).json({ message: 'Trying to join . . .' });
        }
        room.users.push(userId);
        await room.save();
        res.status(200).json({ room });
    }
    catch (error) {
        console.log(error);
    }
};
