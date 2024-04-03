import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function OrderHistoryPage() {
    const [orderDetails, setOrderDetails] = useState(null);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load order details from the API
        const loadOrderDetails = async () => {
            const orderId = localStorage.getItem('orderId');
            
            if (orderId) {
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/orders/${orderId}`
                    );
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log(data)
                    setOrderDetails(data);

                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        };

        loadOrderDetails();

        console.log(orderDetails)

        // Setup WebSocket connection
        const webSocket = new WebSocket('ws://localhost:6969');
        webSocket.onopen = () => {
            console.log('WebSocket Connected');
        };
        webSocket.onmessage = (event) => {
            // Handle incoming messages
            const data = JSON.parse(event.data);
            console.log('Received data:', data);
            // Update order details based on data
            setOrderDetails((prevDetails) => {
                // Logic to update the order details based on the message received
                // This is a placeholder and should be replaced with actual logic
                return {
                    ...prevDetails,
                    orderItems: prevDetails.orderItems.map((item) =>
                        item.id === data.itemId
                            ? { ...item, itemStatus: data.itemStatus }
                            : item
                    ),
                };
            });
        };
        webSocket.onclose = () => {
            console.log('WebSocket Disconnected');
        };
        setSocket(webSocket);

        // Cleanup WebSocket on component unmount
        return () => {
            webSocket.close();
        };
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Back
                </button>
                <h1 className="text-2xl font-bold text-center">
                    Order History
                </h1>
            </div>
            {!orderDetails ? (
                <p>Loading order details...</p>
            ) : (
                <div>
                    <p>Order ID: {orderDetails.id}</p>
                    <p>Table ID: {orderDetails.tableId}</p>
                    <p>Status: {orderDetails.orderStatus}</p>
                    <p>Total Price: {orderDetails.totalPrice}</p>
                    {/* Display each order item */}
                    {orderDetails.orderItems.map((item, index) => (
                        <div key={index} className="border-b-2 p-4">
                            <p>Name: {item.name}</p>
                            <p>Status: {item.itemStatus}</p>
                            <p>Quantity: {item.qty}</p>
                            {/* Add more item details as needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistoryPage;
