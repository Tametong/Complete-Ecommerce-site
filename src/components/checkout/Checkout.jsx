import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";

function Checkout({ cart, setCart }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateItemTotal = (item) => {
    const price = item.discountPercentage
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price;
    return (price * item.quantity).toFixed(2);
  };

  const total = cart
    .reduce((sum, item) => sum + parseFloat(calculateItemTotal(item)), 0)
    .toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.address &&
      formData.cardNumber &&
      formData.expiry &&
      formData.cvv
    ) {
      alert("Commande passée avec succès !");
      setCart([]);
      navigate("/products");
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Finaliser votre commande
      </h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">
          Votre panier est vide.{" "}
          <Link to="/products" className="text-orange-500 hover:underline">
            Continuer vos achats
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Résumé de la commande */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Résumé de la commande
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">{item.title}</p>
                    <p className="text-gray-600">Quantité : {item.quantity}</p>
                    <p className="text-gray-600">
                      Prix :{" "}
                      <span
                        className={
                          item.discountPercentage
                            ? "text-green-600"
                            : "text-orange-500"
                        }
                      >
                        {item.discountPercentage
                          ? (
                              item.price *
                              (1 - item.discountPercentage / 100)
                            ).toFixed(2)
                          : item.price.toFixed(2)}{" "}
                        FCFA
                      </span>
                      {item.discountPercentage && (
                        <span className="line-through text-gray-400 text-sm ml-2">
                          {item.price.toFixed(2)} FCFA
                        </span>
                      )}
                    </p>
                    <p className="text-gray-600">
                      Total : {calculateItemTotal(item)} FCFA
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xl font-bold text-gray-900">
                  Total : {total} FCFA
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de paiement */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaCreditCard className="text-orange-500" /> Informations de
              paiement
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse de livraison"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Numéro de carte"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/AA"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Confirmer la commande
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
