import React, { useEffect, useState } from 'react';
import { useAuth } from '../component/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Footer from '../component/Partials/Footer';
import axios from 'axios';

function ProtectedPage() {
  const { isToken, currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(isToken === null){
      navigate("/login")
    }
    if (isToken != null) {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get('https://sendit-backend-rm0b.onrender.com/user/dashboard', {
            headers: {
              'Authorization': `Bearer ${isToken}`
            }
          });

          setOrders(data.orders || []); // Assume 'orders' is the correct key
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError(error.response?.data?.message || 'Error fetching orders');
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [ isToken, navigate ]);

  const handleEdit = async (orderId, orderStatus) => {
    if (orderStatus === 'pending') {
      navigate(`/edit-order/${orderId}`);
    } else {
      alert('Cannot perform this action on orders with status other than pending');
    }
  };
  
  const handleDelete = async (orderId, orderStatus) => {
    if (orderStatus === 'pending') {
      if (window.confirm('Are you sure you want to delete this order?')) {
        try {
          await axios.delete(`https://sendit-backend-rm0b.onrender.com/api/orders/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      }
    } else {
      alert('Cannot perform this action on orders with status other than pending');
    }
  };
  

  return (
    <div className="protected-page">
      <div className="dashboard-banner">
        <h1>{currentUser.username}'s Orders Overview</h1>
      </div>
      <div className="order-actions">
        <h2>Your Orders</h2>
        <NavLink className="create-order-link" to="/new-order">Create New Order</NavLink>
      </div>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : orders.length > 0 ? (
        <table className="order-table">
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
                    className="edit-icon"
                    onClick={() => handleEdit(order._id, order.status)}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(order._id, order.status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders to display. <NavLink to="/new-order">Create Order</NavLink></p>
      )}
      <div className="des">
        <span>Have you seen our new update?</span>
      </div>
      <Footer />
    </div>
  );
}

export default ProtectedPage;