import { useEffect, useState } from 'react';
import {useFire} from '../context/FireBase';
import {BookCard} from '../pages/index'

const Orders = () => {
    const firebase = useFire();
    const[books,setBooks] = useState([]);

    useEffect(() => {
      if(firebase?.isLoggedIn)
      firebase?.fetchMyBooks(firebase?.user?.uid)?.then(books => setBooks(books?.docs));
    },[firebase])

    if(!firebase.isLoggedIn) return <h1>Login Please</h1>
    console.log(books)

  return (
    <div>
      {
       books?.map((book) => 
       <BookCard 
       link = {`/books/orders/${book.id}`}
       key={book.id} 
       id={book.id}
      {...book.data()}
      />)
      }
    </div>
  )
}

export default Orders