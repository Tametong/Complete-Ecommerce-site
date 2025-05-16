import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p>&copy; 2025 Salomon Store. Tous droits réservés.</p>
        </div>
       
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/FAQ"
            className="hover:text-orange-500 transition-colors"
          >
            FAQ
          </Link>
          <Link to="/terms" className="hover:text-orange-500 transition-colors">
            Conditions d’utilisation
          </Link>
          <Link
            to="/privacy"
            className="hover:text-orange-500 transition-colors"
          >
            Politique de confidentialité
          </Link>
          <Link
            to="/contact"
            className="hover:text-orange-500 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
