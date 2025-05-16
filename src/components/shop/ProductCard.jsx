import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaBolt } from "react-icons/fa"; // Ajout de FaBolt pour "Acheter"

function ProductCard({ product, addToCart, buyNow }) {
  const { id, title, price, image, discountPercentage = 0 } = product;

  const discountedPrice = discountPercentage
    ? (price * (1 - discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative transition-transform duration-300 hover:scale-105">
      {/* Image avec bandeau promo */}
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-contain p-4"
          />
        </Link>
        {discountPercentage > 0 && (
          <div className="absolute top-0 left-0 w-36 h-12 bg-red-600 text-white transform -rotate-45 -translate-x-10 translate-y-4 flex items-center justify-center text-base font-bold shadow-md">
            <span>
              -{discountPercentage}%{" "}
              <span className="line-through text-sm">{price.toFixed(2)} FCFA</span>
            </span>
          </div>
        )}
      </div>

      {/* Détails */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2 gap-2">
          <p
            className={`text-lg font-bold ${
              discountedPrice ? "text-green-600" : "text-orange-500"
            }`}
          >
            {discountedPrice ? `${discountedPrice} FCFA` : `${price.toFixed(2)} FCFA`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              title="Ajouter au panier"
            >
              <FaCartPlus />
            </button>
            {buyNow && (
              <button
                onClick={() => buyNow(product)}
                className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                title="Acheter maintenant"
              >
                <FaBolt /> {/* Icône pour "Acheter" */}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
