import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'; // Adjust the path if necessary
import './ProductListing.css';

const ProductListing = () => {
    const navigate = useNavigate();

    const handleProductClick = (productName) => {
        navigate(`/product/${productName}`);
    };

    // Sample data for demonstration
    const products = [
        { id: 1, name: 'Product1', price: 29.99, inStock: true, image: 'path_to_image_1.jpg' },
        { id: 2, name: 'Product2', price: 19.99, inStock: false, image: 'path_to_image_2.jpg' },
        { id: 3, name: 'Product3', price: 49.99, inStock: true, image: 'path_to_image_3.jpg' }
    ];

    return (
        <div className="product-listing">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product.name)}
                />
            ))}
        </div>
    );
};

export default ProductListing;