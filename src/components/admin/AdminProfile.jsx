import React, { useState } from "react";
import { FaUser, FaTimes } from "react-icons/fa";

function AdminProfile() {
  const [formData, setFormData] = useState({
    email: "admin@example.com",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      return "Email invalide.";
    if (formData.password && formData.password.length < 6)
      return "Le mot de passe doit avoir au moins 6 caractères.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    // Simulation de mise à jour
    setSuccessMessage("Profil mis à jour avec succès !");
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaUser className="text-orange-500" /> Profil Admin
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
        {successMessage && (
          <p className="mb-4 text-center text-green-600 font-semibold">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mb-4 text-center text-red-600">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              Nouveau mot de passe (optionnel)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Laissez vide pour ne pas changer"
            />
          </div>
          <button
            type="submit"
            disabled={validateForm() !== ""}
            className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:bg-gray-300"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
