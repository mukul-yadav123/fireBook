import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFire } from '../context/FireBase';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {ClickAlert} from './index'
import Alert from 'react-bootstrap/Alert';
import AlertDismissibleExample from '../components/Alert';

const Detail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const firebase = useFire();
    const [quantity,setQuantity] = useState(1);
    const [data,setData] = useState(null);
    const [url,setUrl] = useState(null);
    
    useEffect(() =>
    {
      firebase.getBookById(params.bookId)
      .then((value) => setData(value.data()));
    },[]);
    
    useEffect(() =>
    {
      if(data)
      {
        const imageUrl = data.imageURL;
        firebase.getImgURL(imageUrl).then((val) => setUrl(val))
        
      }
    },[data])
    
    if(data == null) return '...Loading';
    // console.log(data)

    const notify = () => toast.success(`Order Placed of ${quantity} books`);

    const placeOrder = async() =>{
      notify();
      const result = await firebase.placeOrder(params.bookId,quantity)
      // console.log(result);
    }

  return (
    
    <div className='container mt-4'>
      <h1>{data.name}</h1>
      {url && <img src={url} alt="cover pic" 
      width='50%' height='500px' style={{borderRadius: '10px', marginTop: '15px'}}
      />}
      <h1>Details</h1>
      <h4>Price: Rs {data.price}</h4>
      <h4>ISBN Number: {data.isbnNumber}</h4>
      <h1>Owner Details</h1>
      <h4>Writer: {data.displayName}</h4>
      <p>{data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control value={quantity} onChange={(e) =>setQuantity(e.target.value)} type="number" placeholder="Enter Quantity" />
      </Form.Group>

      <Button variant='success' onClick={placeOrder} className='me-3'>Buy Now</Button>
      <Button variant='danger' onClick={() => navigate(-1)}>Go back</Button>
      {/* <Button onClick={notify}> CLick Me</Button> */}
      <ToastContainer position="top-center"/>
    
    </div>
  )
}

export default Detail