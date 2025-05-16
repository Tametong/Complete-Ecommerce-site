import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaShoppingBag } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  // Simulation d'un utilisateur connecté (à remplacer par une vraie auth plus tard)
  const user = {
    fullName: "Jean Dupont",
    email: "jean.dupont@example.com",
  };

  // Simulation de commandes passées
  const orders = [
    {
      id: "ORD001",
      date: "2025-03-10",
      total: 89.97,
      items: [
        { title: "Casque Audio", quantity: 1, price: 59.99 },
        { title: "T-shirt Homme", quantity: 2, price: 19.99 },
      ],
    },
    {
      id: "ORD002",
      date: "2025-03-12",
      total: 19.99,
      items: [{ title: "Collier Argent", quantity: 1, price: 19.99 }],
    },
  ];

  const handleLogout = () => {
    // Logique de déconnexion (simulée pour l’instant)
    alert("Déconnexion réussie !");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
        <FaUser className="text-orange-500" /> Mon Profil
      </h1>

      {/* Informations utilisateur */}
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Informations personnelles
        </h2>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Nom :</span> {user.fullName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email :</span> {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaSignOutAlt /> Se déconnecter
        </button>
      </div>

      {/* Historique des commandes */}
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaShoppingBag className="text-orange-500" /> Historique des commandes
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">Aucune commande pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-800 font-semibold">
                    Commande #{order.id}
                  </p>
                  <p className="text-gray-600 text-sm">{order.date}</p>
                </div>
                <ul className="space-y-2 mb-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item.title} (x{item.quantity}) -{" "}
                      {(item.price * item.quantity).toFixed(2)} €
                    </li>
                  ))}
                </ul>
                <p className="text-gray-800 font-semibold text-right">
                  Total : {order.total.toFixed(2)} €
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
