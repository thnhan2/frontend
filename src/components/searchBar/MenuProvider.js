import React, { createContext, useState, useEffect } from 'react';

import axios from 'axios';
// Tạo Context
export const MenuContext = createContext();

// Tạo Provider
export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    // Fetch menuItems...

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
        <MenuContext.Provider value={{ menuItems, searchValue, setSearchValue }}>
            {children}
        </MenuContext.Provider>
    );
};
