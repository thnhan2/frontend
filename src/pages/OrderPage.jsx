import React, { useEffect, useState } from 'react';
import BottomMenuBar from '../components/BottomMenuBar';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
    }, []);

    const handleQuantityChange = (index, delta) => {
        let updatedOrders = [...orders];
        if (updatedOrders[index].quantity + delta > 0) {
            updatedOrders[index].quantity += delta;
        } else {
            updatedOrders = updatedOrders.filter((_, i) => i !== index);
        }
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handleRemove = (index) => {
        const updatedOrders = orders.filter((_, i) => i !== index);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const calculateTotals = () => {
        const totalItems = orders.reduce(
            (total, order) => total + order.quantity,
            0
        );
        const totalPrice = orders.reduce(
            (total, order) => total + order.quantity * order.price,
            0
        );
        return { totalItems, totalPrice };
    };

    const handleCheckout = async () => {
        // Retrieve orderId and tableId from localStorage
        const orderId = localStorage.getItem('orderId');
        const tableId = localStorage.getItem('tableId');
    
        // Check if orderId and tableId are available
        if (!orderId || !tableId) {
            console.error('Order ID or Table ID is missing');
            return;
        }
        console.log('orderId:', orderId)
        console.log('tableId:', tableId)
    
        // Iterate over each order item and send a PUT request
        for (const item of orders) {
            try {
                const response = await fetch(`http://localhost:8080/api/orders/addItem/${orderId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        itemId: item._id,
                        name: item.name,
                        qty: item.quantity,
                        note: item.note || '',
                        tableId: tableId,
                        orderId: orderId,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to add item to order');
                }
            } catch (error) {
                console.error('Error adding item to order:', error);
                // Optionally, handle the error more gracefully, such as showing a message to the user
                return;
            }
        }
    
        // After all items have been added successfully
        setShowSuccessPopup(true);
        // Clear the orders from localStorage
        localStorage.removeItem('orders');
        localStorage.setItem('orderHistory', JSON.stringify(orders));
        setOrders([]);
        
        const webSocket = new WebSocket('ws://localhost:6969');
        webSocket.onopen = () => {
            webSocket.send(JSON.stringify({type: 'NEW_ORDER', orderId: orderId}))
        };
        webSocket.onclose = () => {
            console.log('WebSocket Disconnected');
        };
    };
    


    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    // Destructure the totals for easy access
    const { totalItems, totalPrice } = calculateTotals();

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
                <h1 className="text-2xl font-bold text-center text-white bg-red-600">
                    Checkout
                </h1>
                <button
                    onClick={handleCheckout}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    disabled={orders.length === 0}
                >
                    Checkout
                </button>
            </div>
            {orders.length === 0 ? (
                <p className="font-bold">No orders yet.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b-2 p-4"
                        >
                            <img
                                className="w-20 h-20 object-cover"
                                src={order.imageUrl}
                                alt={order.name}
                            />
                            <div>
                                <div className="font-bold text-xl mb-2">
                                    {order.name}
                                </div>
                                <p className="text-gray-700 text-base">
                                    Price: {formatCurrency(order.price)}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(index, -1)
                                    }
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    -
                                </button>
                                <span className="mx-2">{order.quantity}</span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange(index, 1)
                                    }
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => handleRemove(index)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <p>
                    You have {totalItems} items in your order. Total: {formatCurrency(totalPrice)}
                </p>
            </div>
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-xl font-bold mb-4">Success!</h2>
                        <p>Your order has been placed successfully.</p>
                        <button
                            onClick={() => setShowSuccessPopup(false)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <BottomMenuBar />
        </div>
    );
}

export default OrderPage;
