import React, { useState } from "react";
import {
  FaFolder,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

function CategoryManagement() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Électronique" },
    { id: 2, name: "Vêtements" },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openAddModal = () => {
    setFormData({ name: "" });
    setErrorMessage("");
    setIsAddModalOpen(true);
  };

  const openEditModal = (category) => {
    setCurrentCategory(category);
    setFormData({ name: category.name });
    setErrorMessage("");
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ name: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name) return "Le nom de la catégorie est requis.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    const newCategory = { ...formData, id: categories.length + 1 };
    setCategories([...categories, newCategory]);
    setSuccessMessage("Catégorie ajoutée avec succès !");
    setIsAddModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setCategories(
      categories.map((c) =>
        c.id === currentCategory.id ? { ...formData, id: c.id } : c
      )
    );
    setSuccessMessage("Catégorie modifiée avec succès !");
    setIsEditModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const confirmDelete = () => {
    setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
    setSuccessMessage("Catégorie supprimée avec succès !");
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaFolder className="text-orange-500" /> Gestion des catégories
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={openAddModal}
          className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <FaPlus /> Ajouter une catégorie
        </button>
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
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
              <th className="p-2 sm:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category) => (
              <tr
                key={category.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-2 sm:p-4">{category.id}</td>
                <td className="p-2 sm:p-4 truncate max-w-[100px] sm:max-w-xs">
                  {category.name}
                </td>
                <td className="p-2 sm:p-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors relative group"
                  >
                    <FaEdit />
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                      Modifier
                    </span>
                  </button>
                  <button
                    onClick={() => openDeleteModal(category)}
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

      {/* Modal ajout */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Ajouter une catégorie
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={validateForm() !== ""}
                className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:bg-gray-300"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal modification */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Modifier la catégorie
            </h2>
            {errorMessage && (
              <p className="text-red-600 mb-4">{errorMessage}</p>
            )}
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={validateForm() !== ""}
                className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:bg-gray-300"
              >
                Modifier
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
              Voulez-vous vraiment supprimer la catégorie "
              {categoryToDelete?.name}" ?
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

export default CategoryManagement;
