import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {/* Displaying the Shopping Cart page */}
      {cart.map(item => (
        <div key={item.name} className="cart-item">
          <p>{item.name} - ${item.cost}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <button onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
      <button>Checkout</button>
    </div>
  );
};

export default CartItem;
