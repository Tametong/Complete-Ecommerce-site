import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaFolder,
  FaUser,
} from "react-icons/fa";

function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logique de déconnexion (à connecter à l'API plus tard)
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 p-2 hover:bg-orange-500 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaTachometerAlt /> Tableau de bord
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-2 p-2 hover:bg-orange-500 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaBoxOpen /> Produits
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 p-2 hover:bg-orange-500 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaShoppingBag /> Commandes
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-2 p-2 hover:bg-orange-500 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaUsers /> Utilisateurs
          </Link>
          <Link
            to="/admin/categories"
            className="flex items-center gap-2 p-2 hover:bg-orange-500 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaFolder /> Catégories
          </Link>
          <Link
            to="/admin/profile"
            className="flex items-center gap-2 p-2 hover:bg-orange-500 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FaUser /> Profil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-2 mt-4 text-left hover:bg-red-500 rounded-lg transition-colors"
          >
            <FaTimes /> Déconnexion
          </button>
        </nav>
      </div>

      {/* Bouton burger pour mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-gray-900"
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={24} />
      </button>

      {/* Contenu principal */}
      <div className="flex-1 md:ml-64 bg-gray-100 min-h-screen">{children}</div>
    </div>
  );
}

export default AdminLayout;
