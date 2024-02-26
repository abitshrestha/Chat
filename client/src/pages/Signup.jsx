import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SignupPage = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit = async (e) => {
        const signupDetails={
            'username':username,
            'email':email,
            'password':password
        }
        e.preventDefault();
        try {
            const response=await axios.post(`http://localhost:4000/signup`,signupDetails);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <h2 className='text-center mt-4'>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username . . ."
                        name="usename"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" className='mt-2' type="submit">
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
};

export default SignupPage;
