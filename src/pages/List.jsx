import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFire } from '../context/FireBase';

const List = () => {

  const fireBase = useFire();

    const[name,setName] = useState('');
    const[price,setPrice] = useState('');
    const[coverPic,setCoverPic] = useState('');
    const[isbnNumber,setIsbnNumber] = useState('');

    const handleSubmit = async(e) => 
    {
      e.preventDefault();
      await fireBase.handleCreateNewListing(name,isbnNumber,price,coverPic);
    }

  return (
    <div className='container mt-5'>
     <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) =>setName(e.target.value)} placeholder="Enter the Book Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ISBN</Form.Label>
        <Form.Control type="text" value={isbnNumber} onChange={(e) =>setIsbnNumber(e.target.value)} placeholder="Enter ISBN Number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control type="text" value={price} onChange={(e) =>setPrice(e.target.value)} placeholder="Enter Price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Add the Cover Pic</Form.Label>
        <Form.Control type="file" onChange={(e) =>setCoverPic(e.target.files[0])} placeholder="Enter Price" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create a Book
      </Button>
    </Form>
    </div>
  )
}

export default List