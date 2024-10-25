import '../src/assets/styles/App.scss';
import Shelf from './components/Shelf';
import Cart from './components/Cart';

const App: React.FC = () => {
  return (
    <div className="banner">
      <Shelf />
      <Cart />
    </div>
  );
};

export default App;
