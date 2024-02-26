import express from 'express';
import { createRoom, getRooms, updateRoom } from '../controllers/roomController.js';

export const roomRouter=express.Router();

roomRouter.post('/rooms',createRoom);
roomRouter.get('/rooms',getRooms);
roomRouter.put('/rooms/:id',updateRoom);