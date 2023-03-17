import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from './components/ProductList'
import ProductDetail from "./components/ProductDetail";




function App() {
  return (
    
    <div className="App">
      
      <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/products' element={<ProductList/>} />
          <Route path='/products/:id' element={<ProductDetail/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
