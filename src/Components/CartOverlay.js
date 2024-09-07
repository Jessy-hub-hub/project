import React, { Component } from 'react';

class CartOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: props.cartItems
        };
    }

    handleQuantityChange = (item, increment) => {
        const updatedItems = this.state.cartItems.map(cartItem => {
            if (cartItem.id === item.id && cartItem.options === item.options) {
                return {
                    ...cartItem,
                    quantity: Math.max(1, cartItem.quantity + (increment ? 1 : -1))
                };
            }
            return cartItem;
        }).filter(item => item.quantity > 0);

        this.setState({ cartItems: updatedItems });
    };

    handlePlaceOrder = () => {
        // Placeholder for GraphQL mutation
        console.log('Place order');
        // Clear the cart
        this.setState({ cartItems: [] });
    };

    render() {
        const { cartItems } = this.state;
        const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const isCartEmpty = cartItems.length === 0;

        return (
            <div className="cart-overlay">
                <div data-testid="cart-total">Total: ${cartTotal.toFixed(2)}</div>
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div
                            key={item.id + item.options}
                            data-testid={`cart-item-attribute-${item.options.replace(/ /g, '-').toLowerCase()}`}
                        >
                            <img src={item.image} alt={item.name} />
                            <div>{item.name}</div>
                            <div>{item.options}</div>
                            <div data-testid={`cart-item-amount`}>{item.quantity}</div>
                            <button
                                data-testid={`cart-item-amount-decrease`}
                                onClick={() => this.handleQuantityChange(item, false)}
                            >-</button>
                            <button
                                data-testid={`cart-item-amount-increase`}
                                onClick={() => this.handleQuantityChange(item, true)}
                            >+</button>
                        </div>
                    ))
                ) : (
                    <div>Cart is empty</div>
                )}
                <button
                    data-testid="place-order-btn"
                    onClick={this.handlePlaceOrder}
                    disabled={isCartEmpty}
                >
                    Place Order
                </button>
            </div>
        );
    }
}

export default CartOverlay;