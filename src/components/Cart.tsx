import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/productsSlice';
import { RootState } from '../store/store';
import '../assets/styles/Cart.scss';
import cart from '../assets/images/cart.png';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.products.cartItems);

  const handleDrop = (event: React.DragEvent | React.TouchEvent) => {
    event.preventDefault();
    const product = (event as React.DragEvent).dataTransfer
      ? (event as React.DragEvent).dataTransfer.getData('product')
      : (event.target as HTMLElement).dataset.product;

    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div
      className="cart-container"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onTouchEnd={handleDrop}
    >
      <img src={cart} alt="Корзина" className="cart-img" />
      <div className="cart-items">
        {items.map((item, index) => (
          <div key={index} className="cart-item enlarged">
            <img src={item.src} alt="item in cart" />
          </div>
        ))}
      </div>
      {items.length >= 3 && (
        <button className="checkout-button">Pay cart</button>
      )}
    </div>
  );
};

export default Cart;
