import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFire } from '../context/FireBase';

const OrderDetail = () => {
    const params = useParams();
    const firebase = useFire();
    const [orders,setOrders] = useState([])

    useEffect(() => {
        firebase.getOrders(params.bookId)
        .then(orders => setOrders(orders.docs))
    },[])

  return (
    <div className='containern mt-5'>
        <h1>Orders</h1>
        {
            orders.map((order,ind) => {
                const data = order.data();
                return (
                <div key={ind} className='mt-5' style={{border: '1px solid', padding:'10px'}}>
                <h5>
                Ordered By:- {data.userEmail}
                </h5>
                <h6>Quantity: {data.quantity}</h6>
                </div> 

                )
            })
        }
    </div>
  )
}

export default OrderDetail