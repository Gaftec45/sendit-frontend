import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../component/context/AuthContext';  // Adjust path as necessary
import { useNavigate } from 'react-router-dom';
import Footer from '../component/Partials/Footer';


const EditOrderForm = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();

    const { isToken } = useAuth();

    const [order, setOrder] = useState({
        senderName: '',
        receiverName: '',
        destination: '',
        pickupStation: '',
        packageDetails: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            if (!isToken) {
                setError("You must be logged in to edit orders.");
                return;
            }
            setIsLoading(true);
            try {
                const response = await axios.get(`https://sendit-backend-rm0b.onrender.com/api/orders/${orderId}`, {
                    headers: { Authorization: `Bearer ${isToken}` }
                });
                setOrder(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch order details');
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, isToken]);

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isToken) {
            setError("You must be logged in to update orders.");
            return;
        }
        setIsLoading(true);
        try {
            await axios.post(`https://sendit-backend-rm0b.onrender.com/api/orders/${orderId}`, order, {
                headers: { Authorization: `Bearer ${isToken}` }
            });
            alert('Order updated successfully!');
            setTimeout(() => {
            navigate('/user/dashboard')
            }, 3000);
        } catch (err) {
            setError(err.response.data.message || 'Error updating order');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="mb-4">Edit Order</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading ? <div className="alert alert-success mt-4 text-center" role="alert">
                <span>Loading...</span>
            </div> : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Sender Name:</label>
                        <input type="text" className="form-control" name="senderName" value={order.senderName} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Receiver Name:</label>
                        <input type="text" className="form-control" name="receiverName" value={order.receiverName} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Destination:</label>
                        <input type="text" className="form-control" name="destination" value={order.destination} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Pickup Station:</label>
                        <input type="text" className="form-control" name="pickupStation" value={order.pickupStation} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Package Details:</label>
                        <textarea className="form-control" name="packageDetails" value={order.packageDetails} onChange={handleChange} required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isLoading}>Update Order</button>
                </form>
            )}
            <Footer />
        </div>
    );
};

export default EditOrderForm;