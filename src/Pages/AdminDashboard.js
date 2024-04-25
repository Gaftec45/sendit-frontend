import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../component/context/AuthContext";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {

    const { currentUser, isToken, logout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState({ username: '', email: '' });

    useEffect(() => {
        if(isToken === null){
            navigate("/login")
          }
          if (isToken != null) {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sendit-backend-rm0b.onrender.com/admin/dashboard', {
                    headers: {
                      'Authorization': `Bearer ${isToken}`
                    }
                  });
                setAdmin(response.data.admin);
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }
    }, [admin, isToken, navigate]);

    const updateOrderStatus = async (userId, orderId, newStatus) => {
        try {
            await axios.post(`https://sendit-backend-rm0b.onrender.com/admin/orderstatus/${orderId}`, {
                status: newStatus
            });
            const updatedUsers = users.map(user =>
                user._id === userId ? {
                    ...user,
                    orders: user.orders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                } : user
            );
            setUsers(updatedUsers);
            alert('Order status updated successfully');
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
        }
    };   
    

    return (
        <div className="container-fluid mt-4">
            <div className="mb-4">
                <div className="card">
                    <div className="card-header">
                        <strong>Admin Details</strong>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{currentUser?.username}</h5>
                        <p className="card-text">{currentUser?.email}</p>
                        <NavLink className="btn btn-success" onClick={ logout }>Logout</NavLink>

                    </div>
                </div>
            </div>
            <h1>Orders Dashboard</h1>
            <div className="row">
                {users.length > 0 ? users.map(user => (
                    user.orders.map(order => (
                        <div className="col-md-4" key={order._id}>
                            <div className="card mb-3">
                                <div className="card-header">
                                    Order #{order._id.substring(order._id.length - 5)}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{order.senderName} → {order.receiverName}</h5>
                                    <p className="card-text">From: {user.username} <strong>-</strong> {user.email}</p>
                                    <p className="card-text">Destination: {order.destination}</p>
                                    <p className="card-text">Pickup: {order.pickupStation}</p>
                                    <p className="card-text">Details: {order.packageDetails}</p>
                                    <p className="card-text">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <select className="custom-select" name="status" defaultValue={order.status} onChange={(e) => updateOrderStatus(user._id, order._id, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )) : (
                    <p className="text-center w-100">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;