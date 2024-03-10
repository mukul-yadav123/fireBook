import { useEffect, useState } from "react"
import { useFire } from "../context/FireBase";
import {BookCard} from "./index";
import { CardGroup } from "react-bootstrap";


const Home = () => {
  const firebase = useFire();
  const [books,setBooks] = useState([]);
  useEffect(() => 
  {
    firebase.listAllBooks().then(books => setBooks(books.docs))
  },[]);
  // console.log(books[0].data().name)
  return (
    <div className="container mt-5">
      <CardGroup>

      {
        books && books.map((book,ind) => <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()}/>)
      }
      </CardGroup>
    </div>
  )
}

export default Home