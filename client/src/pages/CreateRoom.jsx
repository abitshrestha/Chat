import axios from 'axios';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Rooms from '../components/Rooms';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [roomId, setRoomId] = useState('');
    const { auth } = useAuth();
    const navigate=useNavigate();

    const handleChange = (e) => {
        setRoomId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const room = {
            'roomCode': roomId,
            'userId': auth.userId,
            'username':auth.username,
        }
        try {
            const response = await axios.post(`http://localhost:4000/rooms`, room);
            navigate(`/rooms/${roomId}`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h2 className='text-center mt-4'>Create a Room</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="roomId">
                    <Form.Label>Room ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-2'>
                    Create Room
                </Button>
            </Form>
            <Rooms auth={auth}/>
        </Container>
    );
};

export default CreateRoom;
