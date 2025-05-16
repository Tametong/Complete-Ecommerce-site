import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function Cart({ cart, setCart }) {
  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateItemTotal = (item) => {
    const price = item.discountPercentage
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price;
    return (price * item.quantity).toFixed(2);
  };

  const total = cart
    .reduce((sum, item) => sum + parseFloat(calculateItemTotal(item)), 0)
    .toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Votre Panier
      </h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">
          Votre panier est vide.{" "}
          <Link to="/products" className="text-orange-500 hover:underline">
            Continuer vos achats
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">
                    Prix unitaire :{" "}
                    <span
                      className={
                        item.discountPercentage
                          ? "text-green-600"
                          : "text-orange-500"
                      }
                    >
                      {item.discountPercentage
                        ? (
                            item.price *
                            (1 - item.discountPercentage / 100)
                          ).toFixed(2)
                        : item.price.toFixed(2)}{" "}
                      FCFA
                    </span>
                    {item.discountPercentage && (
                      <span className="line-through text-gray-400 text-sm ml-2">
                        {item.price.toFixed(2)} FCFA
                      </span>
                    )}
                  </p>
                  <p className="text-gray-600">
                    Total : {calculateItemTotal(item)} FCFA
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <div className="bg-white shadow-lg rounded-lg p-4 text-right">
            <p className="text-xl font-bold text-gray-900">Total : {total} FCFA</p>
            <Link
              to="/checkout"
              className="mt-4 inline-block py-2 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Passer la commande
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
