import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar/SearchBar';
import MenuCatalog from '../components/MenuComponent/MenuCatalog';
import CategoryBar from '../components/searchBar/CategoryBar';
import ImageSlider from '../components/Slider';
import Image1 from '../assets/slider/image1.jpg';
import Image2 from '../assets/slider/image2.jpg';
import Image3 from '../assets/slider/image3.jpg';
import BottomMenuBar from '../components/BottomMenuBar';

const images = [Image1, Image2, Image3];

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/categories')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error('Categories data is not an array');
                }
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <>
            {/* <ImageSlider images={images} /> */}
            <SearchBar onSearch={setSearchValue} />
            <CategoryBar categories={categories} />
            <MenuCatalog
                searchValue={searchValue}
                className="grid grid-cols-3 gap-4 mb-10"
            />
            <BottomMenuBar />
        </>
    );
};

export default Menu;
