import React, { useState, useEffect } from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";
import About from "./components/layout/About";
import Contact from "./components/layout/Contact";
import FAQ from "./components/layout/FAQ";
import Terms from "./components/layout/Terms";
import Privacy from "./components/layout/Privacy";
import ProductList from "./components/shop/ProductList";
import ProductDetail from "./components/shop/ProductDetail";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import ProductManagement from "./components/admin/ProductManagement";
import OrderManagement from "./components/admin/OrderManagement";
import UserManagement from "./components/admin/UserManagement";
import AdminLogin from "./components/admin/AdminLogin";
import CategoryManagement from "./components/admin/CategoryManagement";
import AdminProfile from "./components/admin/AdminProfile";

function App() {
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  const addToCart = (productOrArray) => {
    if (Array.isArray(productOrArray)) {
      // Remplacement complet du panier pour "Acheter maintenant"
      setCart(productOrArray);
    } else {
      // Ajout classique au panier
      const existingItem = cart.find((item) => item.id === productOrArray.id);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === productOrArray.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...productOrArray, quantity: 1 }]);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 font-roboto">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
            .font-roboto {
              font-family: 'Roboto', sans-serif;
            }
          `}
        </style>
        <Routes>
          {/* Routes publiques */}
          <Route
            path="/*"
            element={
              <>
                <Navbar
                  cartCount={cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home addToCart={addToCart} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route
                      path="/products"
                      element={<ProductList addToCart={addToCart} />}
                    />
                    <Route
                      path="/product/:id"
                      element={<ProductDetail addToCart={addToCart} />}
                    />
                    <Route
                      path="/cart"
                      element={<Cart cart={cart} setCart={setCart} />}
                    />
                    <Route
                      path="/checkout"
                      element={<Checkout cart={cart} setCart={setCart} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
                <button
                  onClick={scrollToTop}
                  className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-2 sm:p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all ${
                    showScroll ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <FaArrowUp size={16} className="sm:size-5" />
                </button>
              </>
            }
          />
          {/* Route admin login */}
          <Route
            path="/admin/login"
            element={<AdminLogin setIsAdmin={setIsAdmin} />}
          />
          {/* Routes admin protégées */}
          <Route
            path="/admin/*"
            element={
              isAdmin ? (
                <AdminLayout>
                  <Routes>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="categories" element={<CategoryManagement />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="*" element={<Navigate to="dashboard" />} />
                  </Routes>
                </AdminLayout>
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
