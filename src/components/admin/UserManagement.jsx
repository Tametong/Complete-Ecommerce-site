import React, { useState } from "react";
import {
  FaUsers,
  FaTrash,
  FaTimes,
  FaPlus,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "Client" },
    { id: 2, name: "Admin User", email: "admin@example.com", role: "Admin" },
  ]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Client",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openAddModal = () => {
    setFormData({ name: "", email: "", role: "Client" });
    setErrorMessage("");
    setIsAddModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setErrorMessage("");
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name) return "Le nom est requis.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      return "Email invalide.";
    if (!formData.role) return "Le rôle est requis.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    const newUser = { ...formData, id: users.length + 1 };
    setUsers([...users, newUser]);
    setSuccessMessage("Utilisateur ajouté avec succès !");
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
    setUsers(
      users.map((u) =>
        u.id === currentUser.id ? { ...formData, id: u.id } : u
      )
    );
    setSuccessMessage("Utilisateur modifié avec succès !");
    setIsEditModalOpen(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setSuccessMessage("Utilisateur supprimé avec succès !");
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "all" || u.role === roleFilter)
  );
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaUsers className="text-orange-500" /> Gestion des utilisateurs
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={openAddModal}
          className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <FaPlus /> Ajouter un utilisateur
        </button>
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-48 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">Tous les rôles</option>
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
        </select>
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
              <th className="p-2 sm:p-4">Email</th>
              <th className="p-2 sm:p-4">Rôle</th>
              <th className="p-2 sm:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-2 sm:p-4">{user.id}</td>
                <td className="p-2 sm:p-4 truncate max-w-[100px] sm:max-w-xs">
                  {user.name}
                </td>
                <td className="p-2 sm:p-4 truncate max-w-[150px] sm:max-w-xs">
                  {user.email}
                </td>
                <td className="p-2 sm:p-4">{user.role}</td>
                <td className="p-2 sm:p-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors relative group"
                  >
                    <FaEdit />
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                      Modifier
                    </span>
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
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
              Ajouter un utilisateur
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
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Rôle
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="Client">Client</option>
                  <option value="Admin">Admin</option>
                </select>
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
              Modifier l’utilisateur
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
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Rôle
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="Client">Client</option>
                  <option value="Admin">Admin</option>
                </select>
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
              Voulez-vous vraiment supprimer l’utilisateur "{userToDelete?.name}
              " ?
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

export default UserManagement;
