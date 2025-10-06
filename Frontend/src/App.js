import "./App.scss";
import Navbar from "./compon/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./compon/Footer/Footer";
import men_banner from "./compon/Assets/banner_mens.png"
import women_banner from "./compon/Assets/banner_women.png"
import kid_banner from "./compon/Assets/banner_kids.png"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category = "men"  />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category = "women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category = "kid" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
