import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCartPlus,
  FaStar,
  FaArrowLeft,
  FaArrowRight,
  FaBolt,
} from "react-icons/fa";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id || isNaN(id) || Number(id) <= 0) {
      setError("ID de produit invalide");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Produit non trouvé (Code ${response.status})`);
        }
        return response.text();
      })
      .then((text) => {
        if (!text) throw new Error("Réponse vide de l’API");
        const data = JSON.parse(text);
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Aucune donnée renvoyée pour ce produit");
        }
        data.images = [
          data.image,
          "https://via.placeholder.com/300x300?text=Image+2",
          "https://via.placeholder.com/300x300?text=Image+3",
        ];
        data.reviews = [
          {
            user: "Alice",
            rating: 4,
            comment: "Très bon produit, mais livraison un peu lente.",
          },
          { user: "Bob", rating: 5, comment: "Parfait, je recommande !" },
          {
            user: "Clara",
            rating: 3,
            comment: "Correct, mais pourrait être mieux.",
          },
        ];
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setTimeout(() => navigate("/products"), 3000);
      });
  }, [id, navigate]);

  useEffect(() => {
    if (!product || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [product]);

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBuyNow = () => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart([productWithQuantity]); // Remplace le panier
    navigate("/cart"); // Redirige vers le panier
  };

  if (loading)
    return <div className="p-4 text-center text-gray-600">Chargement...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Erreur : {error}. Vous allez être redirigé vers la liste des produits
        dans quelques secondes...
      </div>
    );
  if (!product) return null;

  const averageRating =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="p-6 flex flex-col items-center justify-center bg-gray-100 relative">
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.title} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-96 object-contain transition-transform duration-300 hover:scale-105"
          />
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                <FaArrowRight />
              </button>
              <div className="absolute bottom-4 flex gap-2">
                {product.images.map((_, index) => (
                  <span
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {product.description}
            </p>
            <p className="text-xl md:text-2xl font-semibold text-orange-500 mb-4">
              {product.price.toFixed(2)} FCFA
            </p>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(averageRating)
                        ? "text-orange-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                ({averageRating.toFixed(1)} / 5 - {product.reviews.length} avis)
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              title="Ajouter au panier"
            >
              <FaCartPlus size={20} />
            </button>
            <button
              onClick={handleBuyNow}
              className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              title="Acheter maintenant"
            >
              <FaBolt size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Avis des clients
        </h2>
        {product.reviews.length === 0 ? (
          <p className="text-gray-600">
            Aucun avis pour ce produit pour le moment.
          </p>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">
                    {review.user}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < review.rating
                            ? "text-orange-500"
                            : "text-gray-300"
                        }
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
