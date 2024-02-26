import  { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit = async (e) => {
        const signupDetails={
            'email':email,
            'password':password
        }
        e.preventDefault();
        try {
            const response=await axios.post(`http://localhost:4000/login`,signupDetails);
            localStorage.setItem('auth',JSON.stringify(response.data.user));
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Container>
      <h2 className='mt-4 text-center'>Login</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit" className='mt-2'>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
