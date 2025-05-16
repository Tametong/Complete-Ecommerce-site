import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import SearchBar from "./SearchBar";

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur lors du chargement des produits");
        return response.json();
      })
      .then((data) => {
        const updatedData = data.map((product, index) => {
          if (index % 3 === 0) {
            return { ...product, discountPercentage: 20 };
          }
          return product;
        });
        setProducts(updatedData);
        setFilteredProducts(updatedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    let result = [...products];
    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (minPrice !== null) {
      result = result.filter((product) =>
        product.discountPercentage
          ? product.price * (1 - product.discountPercentage / 100) >= minPrice
          : product.price >= minPrice
      );
    }
    if (maxPrice !== null) {
      result = result.filter((product) =>
        product.discountPercentage
          ? product.price * (1 - product.discountPercentage / 100) <= maxPrice
          : product.price <= maxPrice
      );
    }
    if (sort === "price-asc") {
      result.sort(
        (a, b) =>
          (a.discountPercentage
            ? a.price * (1 - a.discountPercentage / 100)
            : a.price) -
          (b.discountPercentage
            ? b.price * (1 - b.discountPercentage / 100)
            : b.price)
      );
    } else if (sort === "price-desc") {
      result.sort(
        (a, b) =>
          (b.discountPercentage
            ? b.price * (1 - b.discountPercentage / 100)
            : b.price) -
          (a.discountPercentage
            ? a.price * (1 - a.discountPercentage / 100)
            : a.price)
      );
    }
    setFilteredProducts(result);
  }, [searchTerm, minPrice, maxPrice, sort, products]);

  const handleBuyNow = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    addToCart([productWithQuantity]); // Remplace le panier
    navigate("/cart"); // Redirige vers le panier
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-center text-red-500 text-lg font-semibold">
          Erreur : {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ProductFilters setCategory={setCategory} activeCategory={category} />
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Nos Produits
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sort={sort}
          setSort={setSort}
        />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              buyNow={handleBuyNow} // Passage de la fonction buyNow
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
