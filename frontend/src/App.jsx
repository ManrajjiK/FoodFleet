import './App.css';
import Login from './Screens/Login';
import Home from './Screens/Home';
import MyOrders from './Screens/MyOrders';




import { CartProvider } from './Components/ContextReducer';
import Cart from './Screens/cart.jsx';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import SignUp from './Screens/SignUp';



function App() {
  return (
    <CartProvider>
      <Router>
      <div>
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
