import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartOverlay from './CartOverlay';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false,
            cartItems: []
        };
    }

    toggleCartOverlay = () => {
        this.setState(prevState => {
            const newShowCart = !prevState.showCart;
            document.body.classList.toggle('cart-overlay-open', newShowCart);
            return { showCart: newShowCart };
        });
    };

    render() {
        const { showCart, cartItems } = this.state;
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const itemCountText = itemCount === 1 ? '1 Item' : `${itemCount} Items`;

        return (
            <header>
                <nav>
                    <Link to="/" data-testid="category-link">Category</Link>
                    <button
                        data-testid="cart-btn"
                        onClick={this.toggleCartOverlay}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            padding: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#fff', // Ensure the text color contrasts with the background
                        }}
                    >
                        <i className="fas fa-shopping-cart" aria-hidden="true" style={{ fontSize: '24px' }}></i>
                        {itemCount > 0 && <span style={{ marginLeft: '5px' }}>{itemCountText}</span>}
                    </button>
                </nav>
                {showCart && <CartOverlay cartItems={cartItems} onClose={this.toggleCartOverlay} />}
            </header>
        );
    }
}

export default Header;