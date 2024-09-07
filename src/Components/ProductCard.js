import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

class ProductCard extends Component {
  handleCardClick = () => {
    const { name } = this.props.product;
    const navigate = this.props.navigate;
    navigate(`/product/${name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  handleQuickShop = (event) => {
    event.stopPropagation(); // Prevent the card click event from firing
    if (this.props.product.inStock) {
      console.log(`Added ${this.props.product.name} to cart.`);
      // Implement actual add-to-cart functionality here
    }
  };

  render() {
    const { name, price, inStock, image } = this.props.product;
    const productClass = inStock ? 'product-card' : 'product-card out-of-stock';

    return (
      <div
        className={productClass}
        data-testid={`product-${name.replace(/\s+/g, '-').toLowerCase()}`}
        onClick={this.handleCardClick}
        style={{ cursor: 'pointer' }} // Makes it clear the card is clickable
      >
        <div className="product-image-wrapper">
          <img src={image} alt={name} className="product-image" />
          {!inStock && <div className="out-of-stock-message">Out of Stock</div>}
        </div>
        <div className="product-info">
          <h3>{name}</h3>
          <p>${price.toFixed(2)}</p>
        </div>
        {inStock && (
          <button className="quick-shop" onClick={this.handleQuickShop}>
            Quick Shop
          </button>
        )}
      </div>
    );
  }
}

// Wrap ProductCard with useNavigate HOC
const ProductCardWithNavigate = (props) => {
  const navigate = useNavigate();
  return <ProductCard {...props} navigate={navigate} />;
};

export default ProductCardWithNavigate;