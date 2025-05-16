import React, { useState } from "react";
import { FaBars, FaMicrochip, FaGem, FaTshirt, FaFemale } from "react-icons/fa";

function ProductFilters({ setCategory, activeCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    {
      name: "all",
      label: "Tous les produits",
      icon: <FaBars className="text-orange-500" />,
    },
    {
      name: "electronics",
      label: "Electronics",
      icon: <FaMicrochip className="text-orange-500" />,
    },
    {
      name: "jewelery",
      label: "Jewelery",
      icon: <FaGem className="text-orange-500" />,
    },
    {
      name: "men's clothing",
      label: "Men's Clothing",
      icon: <FaTshirt className="text-orange-500" />,
    },
    {
      name: "women's clothing",
      label: "Women's Clothing",
      icon: <FaFemale className="text-orange-500" />,
    },
  ];

  return (
    <div className="w-full md:w-64 bg-gray-900 text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 bg-orange-500 w-full text-left font-semibold flex items-center gap-2 sticky top-16 z-40"
      >
        <FaBars /> Filtres
      </button>
      <div
        className={`w-full md:w-64 p-4 sticky top-16 z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden md:block"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaBars className="text-orange-500" /> Catégories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => {
                  setCategory(category.name);
                  setIsOpen(false);
                }}
                className={`w-full text-left py-2 px-4 rounded flex items-center gap-2 ${
                  activeCategory === category.name
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-900 hover:bg-orange-100"
                }`}
              >
                {category.icon} {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductFilters;
