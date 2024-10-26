import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/productsSlice';
import { RootState } from '../store/store';
import '../assets/styles/Cart.scss';
import cart from '../assets/images/cart.png';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.products.cartItems);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const product = event.dataTransfer.getData('product');
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    const cartElement = document.querySelector('.cart-container');

    if (cartElement) {
      const cartRect = cartElement.getBoundingClientRect();
      if (
        touch.clientX >= cartRect.left &&
        touch.clientX <= cartRect.right &&
        touch.clientY >= cartRect.top &&
        touch.clientY <= cartRect.bottom
      ) {
        const draggedProduct = document
          .querySelector('.product[draggable="true"]')
          ?.getAttribute('data-src');
        if (draggedProduct) {
          dispatch(addToCart(draggedProduct));
        }
      }
    }
  };

  return (
    <div
      className="cart-container"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onTouchEnd={handleTouchEnd} // Завершение тача
    >
      <img src={cart} alt="Корзина" className="cart-img" />
      <div className="cart-items">
        {items.map((item, index) => (
          <div key={index} className="cart-item">
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
