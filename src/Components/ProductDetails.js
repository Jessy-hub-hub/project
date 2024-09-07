import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

class ProductDetails extends Component {
  state = {
    selectedSize: null,
    selectedColor: null,
    images: [
      'image1.jpg', 
      'image2.jpg',
      'image3.jpg'
    ],
    currentImageIndex: 0
  };

  handleSizeSelect = (size) => {
    this.setState({ selectedSize: size });
  };

  handleColorSelect = (color) => {
    this.setState({ selectedColor: color });
  };

  handleImageSelect = (index) => {
    this.setState({ currentImageIndex: index });
  };

  render() {
    const { selectedSize, selectedColor, images, currentImageIndex } = this.state;
    const isAddToCartDisabled = !(selectedSize && selectedColor);
    const { productName } = this.props.params;

    return (
      <div className="product-details">
        <div className="product-gallery">
          <div className="thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => this.handleImageSelect(index)}
                className={index === currentImageIndex ? 'selected' : ''}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={images[currentImageIndex]} alt="Main Product" />
            <button className="prev" onClick={() => this.handleImageSelect((currentImageIndex - 1 + images.length) % images.length)}>‹</button>
            <button className="next" onClick={() => this.handleImageSelect((currentImageIndex + 1) % images.length)}>›</button>
          </div>
        </div>

        <div className="product-info">
          <h1>{productName}</h1>

          <div data-testid="product-attribute-size" className="size-attribute">
            <h3>Select Size:</h3>
            <button onClick={() => this.handleSizeSelect('S')}>S</button>
            <button onClick={() => this.handleSizeSelect('M')}>M</button>
            <button onClick={() => this.handleSizeSelect('L')}>L</button>
            <button onClick={() => this.handleSizeSelect('XL')}>XL</button>
          </div>

          <div data-testid="product-attribute-color" className="color-attribute">
            <h3>Select Color:</h3>
            <button onClick={() => this.handleColorSelect('red')} style={{ backgroundColor: 'red' }}></button>
            <button onClick={() => this.handleColorSelect('blue')} style={{ backgroundColor: 'blue' }}></button>
            <button onClick={() => this.handleColorSelect('green')} style={{ backgroundColor: 'green' }}></button>
          </div>

          <p>Price: $99.99</p>

          <button
            data-testid="add-to-cart"
            className="add-to-cart-button"
            disabled={isAddToCartDisabled}
          >
            Add to Cart
          </button>

          <div data-testid="product-description" className="product-description">
            <p><strong>Description:</strong> This is a great product that you will love!</p>
          </div>
        </div>
      </div>
    );
  }
}

// Wrap ProductDetails with useParams HOC
const ProductDetailsWithParams = () => {
  const params = useParams();
  return <ProductDetails params={params} />;
};

export default ProductDetailsWithParams;