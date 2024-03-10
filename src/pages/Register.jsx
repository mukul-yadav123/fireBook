import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFire } from '../context/FireBase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const firebase = useFire();
    const navigate = useNavigate();
   
    
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    useEffect(() =>{
      if(firebase.isLoggedIn)
      {
          navigate('/');
      }
    },[firebase,navigate])

    const handleSubmit = async(e) => 
    {
      e.preventDefault();
      const result = await firebase.signupUserWithEmailAndPassword(email,password);

    }

  return (
    <div className='container mt-5'>
     <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e) =>setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>

    </div>
  )
}

export default Register