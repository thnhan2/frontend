import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const fetchMenuItems = async (setMenuItems) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/items`);
        setMenuItems(response.data);
    } catch (error) {
        console.error('Error fetching menu items:', error);
    }
};

const fetchCategories = async (setCategories) => {
    try {
        const response = await fetch(`http://localhost:3000/api/categories`);
        const data = await response.json();
        if (Array.isArray(data)) {
            setCategories(data);
        } else {
            console.error('Categories data is not an array');
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

function MenuCatalog({ searchValue }) {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchMenuItems(setMenuItems);
        fetchCategories(setCategories);
    }, []);

    const filterItems = (category) =>
        menuItems.filter(
            (item) =>
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
                    <div
                        key={category._id}
                        id={`category-${category._id}`}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            {category.name}
                        </h2>
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




export default MenuCatalog;
