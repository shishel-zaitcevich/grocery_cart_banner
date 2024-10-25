import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import '../assets/styles/Shelf.scss';

const Shelf: React.FC = () => {
  const { dairyProducts, meatProducts, fruitProducts } = useSelector(
    (state: RootState) => state.products
  );

  const handleDragStart = (
    event: React.DragEvent | React.TouchEvent,
    productSrc: string
  ) => {
    if ('dataTransfer' in event) {
      event.dataTransfer.setData('product', productSrc);
    } else {
      (event.target as HTMLElement).dataset.product = productSrc;
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
        onTouchStart={(event) =>
          !product.hidden && handleDragStart(event, product.src)
        }
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
