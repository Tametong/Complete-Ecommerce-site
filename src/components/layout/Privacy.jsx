import React from "react";
import { FaLock } from "react-icons/fa";

function Privacy() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaLock className="text-orange-500" /> Politique de confidentialité
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          1. Collecte des données
        </h2>
        <p className="text-gray-700 mb-4">
          Nous collectons des informations comme votre nom, email, et adresse
          lors de votre inscription ou commande pour traiter vos achats.
        </p>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          2. Utilisation des données
        </h2>
        <p className="text-gray-700 mb-4">
          Vos données sont utilisées pour expédier vos commandes, vous envoyer
          des mises à jour, et améliorer notre service.
        </p>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          3. Protection des données
        </h2>
        <p className="text-gray-700">
          Nous utilisons des mesures de sécurité pour protéger vos informations.
          Elles ne sont jamais vendues à des tiers.
        </p>
      </div>
    </div>
  );
}

export default Privacy;
