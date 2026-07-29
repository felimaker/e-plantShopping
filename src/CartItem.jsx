import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Remove the '$' sign and convert to number
      const costNumber = parseFloat(item.cost.replace('$', ''));
      total += costNumber * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if(onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const costNumber = parseFloat(item.cost.replace('$', ''));
    return (costNumber * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px' }} />
            <div className="cart-item-details">
              <div className="cart-item-name" style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div className="cart-item-cost">Price: {item.cost}</div>
              <div className="cart-item-quantity" style={{ margin: '10px 0' }}>
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ color: 'red', marginTop: '5px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="continue_shopping_btn" style={{ marginTop: '20px' }}>
        <button onClick={(e) => handleContinueShopping(e)} style={{ marginRight: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>Continue Shopping</button>
        <button onClick={(e) => handleCheckoutShopping(e)} style={{ padding: '10px', backgroundColor: '#008CBA', color: 'white' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
