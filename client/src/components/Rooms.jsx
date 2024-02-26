/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Rooms = ({auth}) => {
    const [rooms, setRooms] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        fetchRooms();
    }, []); 

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/rooms`);
            setRooms(response.data.rooms);
        } catch (error) {
            console.log(error);
        }
    };

    const handleJoinRoom = async (roomId) => {
        try {
            const response=await axios.put(`http://localhost:4000/rooms/${roomId}`,{userId:auth.userId});
            navigate(`/rooms/${roomId}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h2 className='text-center mt-4'>Rooms</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Room ID</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room._id}>
                            <td>{room.roomCode}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleJoinRoom(room._id)}>Join</Button>
                            </td> 
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Rooms;
