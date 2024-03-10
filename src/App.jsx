import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Register,Login, MyNav, List, Home, Detail,Orders, OrderDetail } from './pages'



function App() {

  return (
    <div>
    <MyNav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='about' element={<h1>about</h1>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='book/list' element={<List/>}/>
      <Route path='book/view/:bookId' element={<Detail/>}/>
      <Route path='book/orders' element={<Orders/>}/>
      <Route path='books/orders/:bookId' element={<OrderDetail/>}/>
      <Route path='login' element={<Login/>}/>
    </Routes>
    </div>
  )
}

export default App
