import React, { useState, useEffect } from 'react';

function KitchenPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8080/api/orders'
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchOrders();

        const webSocket = new WebSocket('ws://localhost:6969');
        webSocket.onopen = () => {
            console.log('WebSocket Connected to the orders channel');
        };
        webSocket.onmessage = (event) => {
            try {
                const newOrder = JSON.parse(event.data);
                if (newOrder && newOrder.id) {
                    // Validate new order data
                    setOrders((prevOrders) => [...prevOrders, newOrder]);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };
        webSocket.onclose = () => {
            console.log('WebSocket Disconnected from the orders channel');
        };

        return () => {
            webSocket.close();
        };
    }, []);

    const updateItemStatus = async (orderId, itemId, newStatus) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/orders/editItem/${orderId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: itemId,
                        itemStatus: newStatus,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setOrders((prevOrders) => {
                return prevOrders.map((order) =>
                    order.id === orderId
                        ? {
                              ...order,
                              orderItems: order.orderItems.map((item) =>
                                  item.id === itemId
                                      ? { ...item, itemStatus: newStatus }
                                      : item
                              ),
                          }
                        : order
                );
            });
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center mb-6">
                Kitchen Orders
            </h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">
                    No orders available.
                </p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="mb-4 p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-3">
                            Order ID: {order.id}
                        </h2>
                        {/* Display each order item */}
                        {order.orderItems.map((item) => (
                            <div
                                key={item.id}
                                className="mb-2 p-2 border-b border-gray-200"
                            >
                                <p className="font-medium">Name: {item.name}</p>
                                <p>Status: {item.itemStatus}</p>
                                {/* Dropdown to select new status */}
                                <select
                                    value={item.itemStatus}
                                    onChange={(e) =>
                                        updateItemStatus(
                                            order.id,
                                            item.id,
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="ORDERED">Ordered</option>
                                    <option value="COOKING">Cooking</option>
                                    <option value="READY">Ready</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="RETURNED">Returned</option>
                                </select>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default KitchenPage;
