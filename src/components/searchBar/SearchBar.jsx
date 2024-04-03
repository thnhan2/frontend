import React, { useState } from 'react';
import { SearchNormal1, Location, Instagram } from 'iconsax-react';

const SearchBar = ({ onSearch }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearch = (event) => {
        if (typeof onSearch === 'function') {
            onSearch(event.target.value);
        }
    };

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <div
            className="bg-palette1-primary relative flex items-center justify-center pt-3 pb-3"
           
        >
            <div className="absolute left-10 overflow-hidden">
                SOA Restaurant
            </div>

            <div className="relative left-10 ">
                <SearchNormal1
                    size="24"
                    color="#351E30"
                    className="absolute top-1/2 left-3 transform -translate-y-1/2"
                    onClick={toggleSearch}
                />
                <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search"
                    className={`pl-12 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 ${
                        isSearchVisible ? 'visible' : 'invisible'
                    }`}
                />
            </div>
            <div className="absolute right-10 flex flex-row "></div>
        </div>
    );
};

export default SearchBar;
