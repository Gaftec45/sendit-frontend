import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../component/context/AuthContext";
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {

    const { currentUser, logout } = useAuth();

    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState({ username: '', email: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sendit-backend-rm0b.onrender.com/admin/dashboard');
                setAdmin(response.data.admin);
                setUsers(response.data.users);
                console.log(admin);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [admin]);

    const updateOrderStatus = async (userId, orderId, newStatus) => {
        try {
            await axios.post(`http://localhost:5000/admin/updateOrderStatus/:orderId`, {
                status: newStatus
            });
            console.log(userId);;
            console.log(orderId);
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
                        <h5 className="card-title">{currentUser.username}</h5>
                        <p className="card-text">{currentUser.email}</p>
                        <NavLink className="btn btn-success" onClick={logout}>Logout</NavLink>

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


/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState({ username: '', email: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/dashboard');
                console.log(response.data); // Check what exactly is being received
                setAdmin(response.data.admin);
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const updateOrderStatus = async (userId, orderId, newStatus) => {
        try {
            await axios.post(`/admin/updateOrderStatus/${orderId}`, { status: newStatus });
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
        <div className="mt-4">
            <div className="card mb-3">
                <div className="card-header">
                    <h2>Admin Details</h2>
                </div>
                <div className="card-body">
                    <p><strong>Username:</strong> {admin?.username}</p>
                    <p><strong>Email:</strong> {admin?.email}</p>
                    <p><a href="/api/logout" className="btn btn-primary">Log Out</a></p>
                </div>
            </div>
            <div>
                <h1>Admin Dashboard</h1>
                {users.length > 0 ? (
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>User ID</th>
                                {/* <th>Email</th> }
                                <th>Sender Name</th>
                                <th>Receiver Name</th>
                                <th>Destination</th>
                                <th>Pickup Station</th>
                                <th>Package Details</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => user.orders.map((order, index) => (
                                <tr key={order._id}>
                                    {index === 0 && (
                                        <td rowSpan={user.orders.length}>{user._id}</td>
                                    )}
                                    {/* {index === 0 && (
                                        <td rowSpan={user.orders.length}>{user.email}</td>
                                    )} }
                                    <td>{order.senderName}</td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.destination}</td>
                                    <td>{order.pickupStation}</td>
                                    <td>{order.packageDetails}</td>
                                    <td>{new Date(order.createdAt).toDateString()}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            updateOrderStatus(user._id, order._id, e.target.status.value);
                                        }}>
                                            <select className="custom-select mr-sm-2" name="status" defaultValue={order.status}>
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <button type="submit" className="btn btn-primary mt-2">Update</button>
                                        </form>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard; */