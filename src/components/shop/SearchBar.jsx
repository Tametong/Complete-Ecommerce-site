import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({
  searchTerm,
  setSearchTerm,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
}) {
  return (
    <div className="mb-6 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Barre de recherche agrandie */}
      <div className="relative col-span-1 sm:col-span-2 lg:col-span-2">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white placeholder-gray-500 transition-all duration-300"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 text-xl" />
      </div>

      {/* Prix min */}
      <input
        type="number"
        placeholder="Prix min (FCFA)"
        value={minPrice || ""}
        onChange={(e) =>
          setMinPrice(e.target.value ? Number(e.target.value) : null)
        }
        className="p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white placeholder-gray-500 transition-all duration-300"
      />

      {/* Prix max */}
      <input
        type="number"
        placeholder="Prix max (FCFA)"
        value={maxPrice || ""}
        onChange={(e) =>
          setMaxPrice(e.target.value ? Number(e.target.value) : null)
        }
        className="p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white placeholder-gray-500 transition-all duration-300"
      />

      {/* Liste déroulante améliorée */}
      <div className="relative">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="appearance-none w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-800 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
        >
          <option value="default">Trier par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 pointer-events-none">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
