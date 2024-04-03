import React, { useState, useEffect } from 'react';

function formatCurrency(value) {
    return value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}
function Card({ item }) {
    const [isAdded, setIsAdded] = useState(false);
    const formattedPrice = formatCurrency(item.price);

    // This function will either add the item to the cart or remove it
    const toggleItemInCart = () => {
        let currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const existingOrderIndex = currentOrders.findIndex(
            (order) => order.itemId === item._id
        );

        if (existingOrderIndex !== -1) {
            // Item is already in the cart, so remove it
            currentOrders.splice(existingOrderIndex, 1);
            setIsAdded(false);
        } else {
            // Item is not in the cart, so add it
            currentOrders.push({
                itemId: item._id,
                categoryId: item.categoryId,
                name: item.name,
                description: item.description,
                price: item.price,
                imageUrl: item.imageUrl,
                status: 'Ordered',
                note: '',
                quantity: 1,
                foodStatus: 'Preparing',
            });
            setIsAdded(true);
        }

        // Update the orders in localStorage
        localStorage.setItem('orders', JSON.stringify(currentOrders));
    };

    // Check if the item is in the cart when the component mounts
    useEffect(() => {
        const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const isItemInCart = currentOrders.some(
            (order) => order.itemId === item._id
        );
        setIsAdded(isItemInCart);
    }, [item._id]);

    return (
        <div className="bg-white p-4 rounded shadow w-64 flex flex-col">
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-auto mt-2"
            />
            <h3 className="text-xl font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {item.name}
            </h3>
            <p
                style={{ fontFamily: 'bevietnampro', fontWeight: 'lighter' }}
                className="text-gray-600 font-serif overflow-hidden overflow-ellipsis"
            >
                {item.description}
            </p>
            <p className="text-gray-600 font-serif overflow-hidden overflow-ellipsis mb-2">
                Price: {formattedPrice}
            </p>
            {item.active && !isAdded ? (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded w-full capitalize mt-auto"
                    onClick={toggleItemInCart}
                >
                    +
                </button>
            ) : item.active ? (
                <button
                    className="bg-green-500 text-white px-2 py-1 rounded w-full capitalize mt-auto"
                    onClick={toggleItemInCart}
                >
                    ✓
                </button>
            ) : (
                <button
                    className="bg-orange-500 text-white px-2 py-1 rounded w-full capitalize mt-auto"
                    disabled
                >
                    Sold Out
                </button>
            )}
        </div>
    );
}

export default Card;
