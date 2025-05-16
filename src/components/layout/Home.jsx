import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // Ajout pour la redirection
import ProductCard from "../shop/ProductCard";

function Home({ addToCart }) {
  const slides = [
    {
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.KP3997733MzLyVxa1V-uqQHaEK%26pid%3DApi&f=1&ipt=879bf2892926d9ee63c0e934b2772f472d729c6014f7e71d2fc632db7f1f507c&ipo=images",
      text: "Grande Promo Hiver !",
    },
    {
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Osydb0Mz-8UYJSvboJdtcQHaEK%26pid%3DApi&f=1&ipt=01885bf023f2ee1d393e3587b847ad51cffba1b1bdb3b04b3ceaf9b96fea96c5&ipo=images",
      text: "Nouveautés Tech",
    },
    {
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LkvTExzwKPXZM9kcen0TJgHaFC%26pid%3DApi&f=1&ipt=32667a2258ae4003e94348c05a0a0245a2b178c6a3c27f09003b3f2f5c93a73b&ipo=images",
      text: "Mode Élégante",
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Ajout pour gérer buyNow

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur lors du chargement des produits");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const handleBuyNow = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart([productWithQuantity]); // Remplace le panier
    navigate("/cart"); // Redirige vers le panier
  };

  return (
    <div className="min-h-screen bg-white">
       <div className="max-w-7xl mx-auto p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 ">
          Bienvenue chez <span className="font-bold text-orange-500">Salomon Store</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Découvrez nos produits de qualité, des téléphones, ordinateurs ou d'autres équipements électroniques
        </p>
        <a
          href="/products"
          className="inline-block py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Explorer nos produits
        </a>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <img
          src={slides[currentSlide].image}
          alt="Slide"
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-bold bg-opacity-1">
          {slides[currentSlide].text}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600"
        >
          <FaChevronRight />
        </button>
      </div>
     
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6 text-center">
          Produits en vedette
        </h2>
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : error ? (
          <div className="text-center text-red-500">Erreur : {error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                buyNow={handleBuyNow} // Ajout de buyNow
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
