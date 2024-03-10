import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFire } from '../context/FireBase';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const firebase = useFire();
    const navigate = useNavigate();
    console.log(firebase.signupUserWithEmailAndPassword)
    
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    useEffect(() =>{
        if(firebase.isLoggedIn)
        {
            navigate('/')
        }
      },[firebase,navigate])


    const handleSubmit = async(e) => 
    {
        e.preventDefault();
        console.log('Login User');
        const result = await firebase.signinUserWithEmailAndPassword(email,password);
        console.log('Success' , result);

    }

  return (
    <div className='container mt-5'>
     <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e) =>setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    <h1 className='mt-5 mb-5'>OR</h1>
    <Button variant='danger' onClick={firebase.signinWithGoogle}>Sign in With Google</Button>
    </div>
  )
}

export default Login