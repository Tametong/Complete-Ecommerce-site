import React from "react";
import { FaInfoCircle } from "react-icons/fa";

function About() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaInfoCircle className="text-orange-500" /> À propos de Salomon Store
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        <p className="text-gray-700 mb-4">
          Bienvenue chez <span className="font-semibold">Salomon store</span>,
          votre destination en ligne pour des produits de qualité alliant style
          et innovation. Depuis notre création, nous nous engageons à offrir une
          expérience d’achat exceptionnelle, avec une sélection soigneusement
          choisie de smartphones, d'ordinateurs ou d'autres équipements électroniques.
        </p>
        <p className="text-gray-700 mb-4">
          Notre mission est simple : rendre le shopping en ligne agréable,
          rapide, et accessible à tous. Que vous cherchiez un cadeau unique ou
          un article pour vous-même, nous sommes là pour vous accompagner.
        </p>
        <p className="text-gray-700">
          Rejoignez notre communauté et découvrez pourquoi des milliers de
          clients nous font confiance chaque jour. Pour toute question,
          n’hésitez pas à visiter notre page{" "}
          <a href="/contact" className="text-orange-500 hover:underline">
            Contact
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default About;
