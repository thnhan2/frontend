import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MenuCatalog({ searchValue }) {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch danh sách món ăn
                const menuResponse = await axios.get(
                    'http://localhost:3000/api/items'
                );
                setMenuItems(menuResponse.data);

                // Fetch danh sách các danh mục
                const categoriesResponse = await fetch(
                    'http://localhost:3000/api/categories'
                );
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

    return (
        <div className="p-4">
            {categories.map((category) => {
                const itemsInCategory = menuItems
                    .filter((item) => item.categoryId === category._id)
                    .filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase())
                    );

                if (itemsInCategory.length === 0) {
                    return null;
                }

                return (
                    <div key={category._id} id={`category-${category._id}`}>
                        <h2 className="font-bold text-lg">{category.name}</h2>
                        <div className="mt-4 px-3 p-3 mb-4 mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                            {menuItems
                                .filter(
                                    (item) => item.categoryId === category._id
                                )
                                .filter((item) =>
                                    item.name
                                        .toLowerCase()
                                        .includes(searchValue.toLowerCase())
                                )
                                .map((item) => (
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
                <button className="bg-blue-500 text-white px-2 py-1 rounded w-full capitalize mt-auto">
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
