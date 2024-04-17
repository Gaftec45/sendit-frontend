import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../component/context/AuthContext";
// import { useNavigate } from "react-router-dom";
import Footer from '../component/Partials/Footer';

const OrderForm = () => {
  // const navigate = useNavigate();
  const { currentUser, token } = useAuth();
  const [orderData, setOrderData] = useState({
    senderName: '',
    receiverName: '',
    destination: '',
    pickupStation: '',
    packageDetails: '',
  });

  const handleInputChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const createOrder = async () => {
    try {
      if (!currentUser || !currentUser._id) {
        console.error('User not authenticated or userId not available');
        // Handle this scenario, such as redirecting to login page or showing an error message
        return;
      }
  
      // Make the POST request with orderData and userId
      await axios.post(
        'http://localhost:5000/api/orders',
        { ...orderData, userId: currentUser._id }, // Pass userId as part of order data
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      // Handle successful response, e.g., show success message
      // alert('Order created successfully');
  
      // Clear orderData state after successful submission
      setOrderData({
        senderName: '',
        receiverName: '',
        destination: '',
        pickupStation: '',
        packageDetails: '',
      });
    } catch (error) {
      // Handle error, e.g., show error message
      console.error('Error creating order:', error);
    }
  };  

  if (!currentUser) {
    return (
      <div className="container">
        <p>Please log in to create an order.</p>
      </div>
    );
  }

  return (
    <>
    <div className="container-fluid">
      <h2 className="my-4">Create Order</h2>
      <form onSubmit={createOrder}>
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
      < Footer />
</>
  );
};

export default OrderForm;















/*import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../component/context/AuthContext";

const OrderForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    destination: '',
    pickupStation: '',
    packageDetails: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        // Handle case where token is not available (user not authenticated)
        console.error('User not authenticated');
        return;
      }
  
      await axios.post(
        'http://localhost:5000/api/orders', 
        { ...formData, userId: user._id }
      );
  
      alert('Order created successfully');
      setFormData({
        senderName: '',
        receiverName: '',
        destination: '',
        pickupStation: '',
        packageDetails: '',
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  if (!user) {
    return (
      <div className="container">
        <p>Please log in to create an order.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="my-4">Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="senderName" className="form-label">Sender Name:</label>
          <input type="text" className="form-control" id="senderName" name="senderName" value={formData.senderName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="receiverName" className="form-label">Receiver Name:</label>
          <input type="text" className="form-control" id="receiverName" name="receiverName" value={formData.receiverName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="destination" className="form-label">Destination:</label>
          <input type="text" className="form-control" id="destination" name="destination" value={formData.destination} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="pickupStation" className="form-label">Pickup Station:</label>
          <input type="text" className="form-control" id="pickupStation" name="pickupStation" value={formData.pickupStation} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="packageDetails" className="form-label">Package Details:</label>
          <textarea className="form-control" id="packageDetails" name="packageDetails" value={formData.packageDetails} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm; */