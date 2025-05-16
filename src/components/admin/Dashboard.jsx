import React from "react";
import {
  FaChartLine,
  FaBoxOpen,
  FaUserFriends,
  FaTachometerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaTachometerAlt className="text-orange-500" /> Tableau de bord
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div
          onClick={() => navigate("/admin/orders")}
          className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <FaChartLine className="text-orange-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Ventes</h3>
            <p className="text-2xl font-bold text-gray-900">1 245 €</p>
          </div>
        </div>
        <div
          onClick={() => navigate("/admin/products")}
          className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <FaBoxOpen className="text-orange-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Produits</h3>
            <p className="text-2xl font-bold text-gray-900">20</p>
          </div>
        </div>
        <div
          onClick={() => navigate("/admin/users")}
          className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <FaUserFriends className="text-orange-500 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Utilisateurs
            </h3>
            <p className="text-2xl font-bold text-gray-900">150</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
