import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CategoryBar = ({ categories }) => {
    const [categoryCounts, setCategoryCounts] = useState({});

    useEffect(() => {
        const fetchCategoryCounts = async () => {
            try {
                const counts = {};
                const promises = categories.map((category) =>
                    axios
                        .get(
                            `http://localhost:3000/api/categories/count/${category._id}`
                        )
                        .then((response) => {
                            counts[category._id] = response.data.count;
                        })
                );
                await Promise.all(promises);
                setCategoryCounts(counts);
            } catch (error) {
                console.error('Error fetching category counts:', error);
            }
        };

        fetchCategoryCounts();
    }, [categories]);

    if (!Array.isArray(categories)) {
        return null;
    }

    const handleCategoryClick = (categoryId) => {
        const categoryElement = document.getElementById(
            `category-${categoryId}`
        );
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="category-bar flex flex-wrap flex-row mt-5">
            {categories.map((category) => (
                <button
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className="py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full m-1"
                >
                    {`${category.name} (${categoryCounts[category._id] || 0})`}
                </button>
            ))}
        </div>
    );
};

CategoryBar.propTypes = {
    categories: PropTypes.array.isRequired,
};

export default CategoryBar;
