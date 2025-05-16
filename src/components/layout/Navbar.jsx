import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500"><img src="images/original.png" alt="" style={{width:50, borderRadius:50}} /></span>
          </Link>

          {/* Liens principaux (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className=" hover:text-orange-500 font-medium transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className=" hover:text-orange-500 font-medium transition-colors"
            >
              Produits
            </Link>
            <Link
              to="/about"
              className=" hover:text-orange-500 font-medium transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className=" hover:text-orange-500 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Actions (panier, profil) */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative  hover:text-orange-500 transition-colors"
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className=" hover:text-orange-500 transition-colors"
            >
              <FaUser size={20} />
            </Link>
            {/* Bouton burger (mobile) */}
            <button
              className="md:hidden  focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="flex flex-col items-center justify-center h-full text-white relative">
            {/* Bouton de fermeture */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 text-white hover:text-orange-500 focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
            <Link
              to="/"
              onClick={closeMenu}
              className="py-4 text-lg font-medium hover:text-orange-500 transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              onClick={closeMenu}
              className="py-4 text-lg font-medium hover:text-orange-500 transition-colors"
            >
              Produits
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="py-4 text-lg font-medium hover:text-orange-500 transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="py-4 text-lg font-medium hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
