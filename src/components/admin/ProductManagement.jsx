import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Casque Audio",
      price: 59.99,
      stock: 10,
      discountPercentage: 20,
      images: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300/FF0000",
      ],
    },
    {
      id: 2,
      title: "T-shirt Homme",
      price: 19.99,
      stock: 50,
      discountPercentage: 0,
      images: ["https://via.placeholder.com/300"],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPercentage: 0,
    stock: "",
    images: [""],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      title: "",
      price: "",
      discountPercentage: 0,
      stock: "",
      images: [""],
    });
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({ ...product, images: product.images || [""] });
    setErrorMessage("");
    setIsModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discountPercentage" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.title) return "Le nom est requis.";
    if (!formData.price || formData.price <= 0)
      return "Le prix doit être supérieur à 0.";
    if (!formData.stock || formData.stock < 0)
      return "Le stock ne peut pas être négatif.";
    if (formData.images.length === 0 || formData.images.every((img) => !img))
      return "Au moins une image est requise.";
    if (formData.discountPercentage < 0 || formData.discountPercentage > 100)
      return "La réduction doit être entre 0 et 100.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    const cleanedImages = formData.images.filter((img) => img.trim() !== "");
    if (currentProduct) {
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id
            ? { ...formData, id: p.id, images: cleanedImages }
            : p
        )
      );
      setSuccessMessage("Produit modifié avec succès !");
    } else {
      const newProduct = {
        ...formData,
        id: products.length + 1,
        images: cleanedImages,
      };
      setProducts([...products, newProduct]);
      setSuccessMessage("Produit ajouté avec succès !");
    }
    setIsModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete.id));
    setSuccessMessage("Produit supprimé avec succès !");
    setIsDeleteModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaBox className="text-orange-500" /> Gestion des produits
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={openAddModal}
              className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <FaPlus /> Ajouter un produit
            </button>
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          {successMessage && (
            <p className="mb-4 text-center text-green-600 font-semibold">
              {successMessage}
            </p>
          )}
          <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 sm:p-4">ID</th>
                  <th className="p-2 sm:p-4">Nom</th>
                  <th className="p-2 sm:p-4">Prix</th>
                  <th className="p-2 sm:p-4">Réduction (%)</th>
                  <th className="p-2 sm:p-4">Stock</th>
                  <th className="p-2 sm:p-4">Images</th>
                  <th className="p-2 sm:p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-2 sm:p-4">{product.id}</td>
                    <td className="p-2 sm:p-4 truncate max-w-[100px] sm:max-w-xs">
                      {product.title}
                    </td>
                    <td className="p-2 sm:p-4">
                      {product.discountPercentage ? (
                        <>
                          <span className="text-green-600">
                            {(
                              product.price *
                              (1 - product.discountPercentage / 100)
                            ).toFixed(2)}{" "}
                            €
                          </span>
                          <span className="line-through text-gray-400 text-sm ml-2">
                            {product.price.toFixed(2)} €
                          </span>
                        </>
                      ) : (
                        `${product.price.toFixed(2)} €`
                      )}
                    </td>
                    <td className="p-2 sm:p-4">
                      {product.discountPercentage}%
                    </td>
                    <td className="p-2 sm:p-4">{product.stock}</td>
                    <td className="p-2 sm:p-4">{product.images.length}</td>
                    <td className="p-2 sm:p-4 flex gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors relative group"
                      >
                        <FaEdit />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                          Modifier
                        </span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(product)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors relative group"
                      >
                        <FaTrash />
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                          Supprimer
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="py-1 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300"
            >
              Précédent
            </button>
            <span className="py-1 px-3">
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="py-1 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300"
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {/* Modal ajout/modification */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              {currentProduct ? "Modifier le produit" : "Ajouter un produit"}
            </h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Réduction (%)
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Images (URLs)
                </label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder={`URL de l'image ${index + 1}`}
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-2 py-1 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
                >
                  <FaPlus /> Ajouter une image
                </button>
              </div>
              <button
                type="submit"
                disabled={validateForm() !== ""}
                className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:bg-gray-300"
              >
                {currentProduct ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Confirmer la suppression
            </h2>
            <p className="text-gray-700 mb-4 sm:mb-6">
              Voulez-vous vraiment supprimer le produit "
              {productToDelete?.title}" ?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={confirmDelete}
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
              >
                Supprimer
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;
