import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MenuCatalog({ searchValue }) {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menuResponse = await axios.get(process.env.REACT_APP_API_URL + '/items');
                setMenuItems(menuResponse.data);

                const categoriesResponse = await fetch(process.env.REACT_APP_API_URL + '/categories');
                const categoriesData = await categoriesResponse.json();
                if (Array.isArray(categoriesData)) {
                    setCategories(categoriesData);
                } else {
                    console.error('Categories data is not an array');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filterItems = (category) => menuItems.filter((item) =>
        item.categoryId === category._id &&
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            {categories.map((category) => {
                const itemsInCategory = filterItems(category);

                if (itemsInCategory.length === 0) {
                    return null;
                }

                return (
                    <div key={category._id} id={`category-${category._id}`} className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {itemsInCategory.map((item) => (
                                <Card key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}




function formatCurrency(value) {
    return value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}

function Card({ item }) {
    const formattedPrice = formatCurrency(item.price);

    const addToCart = () => {
        // Get the current orders from localStorage
        let currentOrders = JSON.parse(localStorage.getItem('orders')) || [];

        // Check if the item is already in the orders
        const existingOrderIndex = currentOrders.findIndex(
            (order) => order.itemId === item._id
        );

        if (existingOrderIndex !== -1) {
            // If the item is already in the orders, increment the quantity
            currentOrders[existingOrderIndex].quantity += 1;
        } else {
            // If the item is not in the orders, add it
            const newOrder = {
                itemId: item._id,
                categoryId: item.categoryId,
                name: item.name,
                description: item.description,
                price: item.price,
                imageUrl: item.imageUrl,
                status: 'Ordered', // This is the status of the order
                note: '',
                quantity: 1,
                foodStatus: 'Preparing', // This is the status of the food
            };

            currentOrders.push(newOrder);
        }

        // Save the current orders back to localStorage
        localStorage.setItem('orders', JSON.stringify(currentOrders));
        localStorage.setItem('orderHistory', JSON.stringify(currentOrders));
    };

    return (
        <div className="bg-white p-4 rounded shadow w-64 flex flex-col">
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-auto mt-2"
            />
            <h3 className="text-x font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {item.name}
            </h3>
            <p className="text-gray font-serif overflow-hidden overflow-ellipsis">
                {item.description}
            </p>
            <p className="text-gray font-serif overflow-hidden overflow-ellipsis mb-2">
                Price: {formattedPrice}
            </p>
            {item.active === true ? (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded w-full capitalize mt-auto"
                    onClick={addToCart}
                >
                    Add to cart
                </button>
            ) : (
                <button
                    onClick={() => {}}
                    className="bg-orange-500 text-white px-2 py-1 rounded w-full capitalize mt-auto"
                    disabled
                >
                    Solded Out
                </button>
            )}
        </div>
    );
}

export default MenuCatalog;
