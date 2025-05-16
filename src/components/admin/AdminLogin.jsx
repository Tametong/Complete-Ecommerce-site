import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

function AdminLogin({ setIsAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "mesbus8@gmail.com" && password === "123") {
      setIsLoading(true);
      setTimeout(() => {
        setIsAdmin(true); // Déplacer ici ne garantit pas toujours la mise à jour immédiate
        setIsLoading(false);
        navigate("/admin/dashboard");
      }, 2000);
    } else {
      setMessage("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FaSignInAlt className="text-orange-500" /> Connexion Admin
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Se connecter
              </button>
            </form>
            {message && (
              <p className="mt-4 text-center text-sm sm:text-base text-red-600">
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
