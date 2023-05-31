import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './MyOrders.css'
import { UserContext } from '../../Context/AuthContext';

const MyOrder = () => {
  const { user } = useContext(UserContext)
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/get-orders?email=${user?.email}`,)
      .then(res => res.json())
      .then(data => setMyOrders(data))
  }, [user?.email])
  console.log(myOrders[0].data);

  return (
    <div>
      {/* moile */}
      <div className="p-5 h-screen bg-gray-100">
        <h1 className="text-xl mb-2">Your orders</h1>

        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Details</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {
                myOrders[0].modified.map(order => (

                  // eslint-disable-next-line react/jsx-key
                  <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <a href="#" className="font-bold text-blue-500 hover:underline">OI-{order.order} </a>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {myOrders[0].data.address1}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {order.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <span
                        className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{order.status} </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{order.date} </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Tk {order.price*order.quantity} </td>
                  </tr>
                ))

              }

            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
         {
          myOrders[0].modified.map(order=>(
            // eslint-disable-next-line react/jsx-key
            <div className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-sm">
              <div>
                <a href="#" className="text-blue-500 font-bold hover:underline"> Order ID: OI-{order.order}</a>
              </div>
              <div className="text-gray-500">Date: {order.date}</div>
              <div>
                <span
                  className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">{order.status}</span>
              </div>
            </div>
            <div className="text-sm text-gray-700">
            Details:  {myOrders[0].data.address1}
            </div>
            <div className="text-sm font-medium text-black"> 
              Name: {order.name}
            </div>
            <div className="text-sm font-medium text-black"> price:
              Tk {order.price * order.quantity}
            </div>
          </div>
          ))
         }
         
        </div>
      </div>
    </div>

  )
}

export default MyOrder;

