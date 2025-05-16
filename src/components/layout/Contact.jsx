import React, { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L’email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email invalide";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Message envoyé avec succès !");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaEnvelope className="text-orange-500" /> Nous contacter
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Envoyez-nous un message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-orange-500"
                }`}
                rows="4"
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <FaPaperPlane /> Envoyer
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Informations de contact
          </h2>
          <p className="text-gray-700 mb-2 flex items-center gap-2">
            <FaEnvelope className="text-orange-500" /> support@boutiquepro.com
          </p>
          <p className="text-gray-700 mb-2 flex items-center gap-2">
            <FaPhone className="text-orange-500" /> +237 1 23 45 67 89
          </p>
         
        </div>
      </div>
    </div>
  );
}

export default Contact;
