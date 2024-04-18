import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrderList = () => {
  const { isToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

        // const isToken = localStorage.getItem('token');
      if (!isToken) {
          // Handle case where token is missing
          // throw new Error('Authentication token missing');
      } else{
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('https://sendit-backend-rm0b.onrender.com/user/dashboard', {
          headers: {
            Authorization: `Bearer ${isToken}`
          }
        });
        setTimeout(() => {
          setOrders(data.orders || []); // Assume 'orders' is the correct key
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching orders');
        setLoading(false);
      }
    }

    fetchOrders();
  };
  }, [isToken]);

  const handleEdit = async (orderId) => {
    console.log(`Editing order with ID: ${orderId}`);
    // Place your edit logic here
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`https://sendit-backend-ten.vercel.app/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setOrders(orders.filter(order => order._id !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  return (
    <div>
      <h2  style={{float: 'left', padding: "8px"}}>Your Orders</h2>
      <h5  style={{float: 'right', padding: "8px"}}><NavLink style={{ backgroundColor: '#3498db', color: '#fff', textDecoration: "none",  padding: "5px"}} to="/new-order">Create New Order</NavLink></h5>
      {loading ? (
        <div>
        <p>Loading orders...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : orders.length > 0 ? (
        <table className="table table-striped table-hover order-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Destination</th>
              <th>Pickup Station</th>
              <th>Package Details</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.senderName}</td>
                <td>{order.receiverName}</td>
                <td>{order.destination}</td>
                <td>{order.pickupStation}</td>
                <td>{order.packageDetails}</td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  <FaEdit
                    style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }}
                    onClick={() => handleEdit(order._id)}
                  />
                  <FaTrash
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => handleDelete(order._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders to display.  <NavLink to="/new-order">Create Order</NavLink></p>
      )}
    </div>
  );
};

export default OrderList;