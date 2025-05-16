import React from "react";
import { FaFileContract } from "react-icons/fa";

function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaFileContract className="text-orange-500" /> Conditions d’utilisation
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          1. Acceptation des conditions
        </h2>
        <p className="text-gray-700 mb-4">
          En utilisant Boutique Pro, vous acceptez nos conditions d’utilisation.
          Si vous n’êtes pas d’accord, veuillez ne pas utiliser notre site.
        </p>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          2. Utilisation du site
        </h2>
        <p className="text-gray-700 mb-4">
          Vous vous engagez à utiliser ce site uniquement à des fins légales et
          à ne pas tenter d’accéder à des zones non autorisées.
        </p>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          3. Propriété intellectuelle
        </h2>
        <p className="text-gray-700">
          Tout le contenu (images, textes, logos) appartient à Boutique Pro ou à
          ses partenaires et ne peut être reproduit sans autorisation.
        </p>
      </div>
    </div>
  );
}

export default Terms;
