import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFire } from '../context/FireBase';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
  const firebase = useFire();
  const [url,setUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImgURL(props.imageURL).then(url =>setUrl(url))
  },[])
  
  return (
    <Card style={{ width: '18rem', margin: '25px' }}>
      <Card.Img variant="top" height={300} width={24} src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This book has a title {props.name}, costing {props.price}
        </Card.Text>
        <Button variant="primary" onClick={(e) => navigate(props.link)}>View</Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard