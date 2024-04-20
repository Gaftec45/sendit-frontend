import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../component/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Partials/Footer';

const OrderForm = () => {
  const navigate = useNavigate();
  const { isToken, currentUser } = useAuth();
  const [orderData, setOrderData] = useState({
    senderName: '',
    receiverName: '',
    destination: '',
    pickupStation: '',
    packageDetails: '',
  });
  // const currentUser  = localStorage.getItem("user");
  // const isToken = localStorage.getItem("token");

  useEffect(() => {
    if(isToken === null){
      navigate('/login')
    }
    // Redirect if the user is not authenticated or if the _id is not available
    if (!currentUser) {
      console.error('User not authenticated or userId not available');
      // navigate('/login'); // Uncomment this if redirection is needed
    }
  }, [ isToken, currentUser, navigate]);

  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check again at submission time in case of state updates
    console.log(orderData);
    if (!currentUser) {
      console.error('User not authenticated');
      return;
    }

    try {
      await axios.post(
        'https://sendit-backend-rm0b.onrender.com/api/orders',
        { ...orderData, userId: currentUser._id }, // Correctly pass userId as part of the request
        {
          headers: {
            'Authorization': `Bearer ${isToken}` // Ensure Authorization header is correctly formatted
          }
        }
      );

      alert('Order Created Successfully.')
      // Reset form to initial state after successful submission
      setOrderData({
        senderName: '',
        receiverName: '',
        destination: '',
        pickupStation: '',
        packageDetails: '',
      });

      navigate('/user/dashboard')
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <h2 className="my-4">Create Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="senderName" className="form-label">Sender Name:</label>
            <input type="text" className="form-control" id="senderName" name="senderName" value={orderData.senderName} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="receiverName" className="form-label">Receiver Name:</label>
            <input type="text" className="form-control" id="receiverName" name="receiverName" value={orderData.receiverName} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="destination" className="form-label">Destination:</label>
            <input type="text" className="form-control" id="destination" name="destination" value={orderData.destination} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="pickupStation" className="form-label">Pickup Station:</label>
            <input type="text" className="form-control" id="pickupStation" name="pickupStation" value={orderData.pickupStation} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="packageDetails" className="form-label">Package Details:</label>
            <textarea className="form-control" id="packageDetails" name="packageDetails" value={orderData.packageDetails} onChange={handleInputChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Order</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default OrderForm;