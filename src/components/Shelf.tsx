import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/productsSlice';
import { RootState } from '../store/store';
import '../assets/styles/Shelf.scss';

const Shelf: React.FC = () => {
  const dispatch = useDispatch();
  const { dairyProducts, meatProducts, fruitProducts } = useSelector(
    (state: RootState) => state.products
  );

  const [draggedProduct, setDraggedProduct] = useState<string | null>(null);
  const [cloneElement, setCloneElement] = useState<HTMLDivElement | null>(null);

  const handleDragStart = (event: React.DragEvent, productSrc: string) => {
    event.dataTransfer.setData('product', productSrc);
  };

  const handleTouchStart = (event: React.TouchEvent, productSrc: string) => {
    setDraggedProduct(productSrc);

    // Отключаем прокрутку страницы при начале перетаскивания
    document.body.style.overflow = 'hidden';

    const touch = event.touches[0];
    const productElement = (event.target as HTMLElement).closest(
      '.product'
    ) as HTMLElement;
    if (productElement) {
      const clone = productElement.cloneNode(true) as HTMLDivElement;
      clone.style.position = 'fixed';
      clone.style.pointerEvents = 'none';
      clone.style.width = `${productElement.offsetWidth}px`;
      clone.style.height = `${productElement.offsetHeight}px`;
      clone.style.left = `${touch.clientX - productElement.offsetWidth / 2}px`;
      clone.style.top = `${touch.clientY - productElement.offsetHeight / 2}px`;
      clone.style.opacity = '0.8';
      clone.style.zIndex = '1000';

      document.body.appendChild(clone);
      setCloneElement(clone);
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    const cartElement = document.querySelector('.cart-container');

    if (cloneElement) {
      cloneElement.style.left = `${touch.clientX - cloneElement.offsetWidth / 2}px`;
      cloneElement.style.top = `${touch.clientY - cloneElement.offsetHeight / 2}px`;
    }

    if (cartElement) {
      const cartRect = cartElement.getBoundingClientRect();
      if (
        touch.clientX >= cartRect.left &&
        touch.clientX <= cartRect.right &&
        touch.clientY >= cartRect.top &&
        touch.clientY <= cartRect.bottom
      ) {
        cartElement.classList.add('hover');
      } else {
        cartElement.classList.remove('hover');
      }
    }
  };

  const handleTouchEnd = () => {
    const cartElement = document.querySelector('.cart-container');
    if (cartElement && cartElement.classList.contains('hover')) {
      if (draggedProduct) {
        dispatch(addToCart(draggedProduct));
      }
    }
    setDraggedProduct(null);
    cartElement?.classList.remove('hover');

    // Восстанавливаем прокрутку страницы после завершения перетаскивания
    document.body.style.overflow = '';

    if (cloneElement) {
      cloneElement.remove();
      setCloneElement(null);
    }
  };

  const renderProducts = (
    products: Array<{ id: number; src: string; hidden: boolean }>
  ) => {
    return products.map((product) => (
      <div
        key={product.id}
        className="product"
        draggable={!product.hidden}
        onDragStart={(event) =>
          !product.hidden && handleDragStart(event, product.src)
        }
        onTouchStart={(event) => handleTouchStart(event, product.src)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ visibility: product.hidden ? 'hidden' : 'visible' }}
      >
        <img src={product.src} alt="product" />
      </div>
    ));
  };

  return (
    <div className="shelf">
      <div className="shelf-row dairy">{renderProducts(dairyProducts)}</div>
      <div className="shelf-row meat">{renderProducts(meatProducts)}</div>
      <div className="shelf-row fruits">{renderProducts(fruitProducts)}</div>
    </div>
  );
};

export default Shelf;
