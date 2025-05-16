import React, { useState } from "react";
import {
  FaShoppingBag,
  FaTimes,
  FaSearch,
  FaEdit,
  FaEye,
} from "react-icons/fa";

function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      date: "2025-03-10",
      total: 89.97,
      status: "En attente",
      items: [
        { title: "Casque Audio", qty: 1, price: 59.99 },
        { title: "T-shirt", qty: 1, price: 19.99 },
      ],
    },
    {
      id: "ORD002",
      date: "2025-03-12",
      total: 19.99,
      status: "Expédié",
      items: [{ title: "T-shirt Homme", qty: 1, price: 19.99 }],
    },
  ]);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openStatusModal = (order) => {
    setCurrentOrder(order);
    setNewStatus(order.status);
    setIsStatusModalOpen(true);
  };

  const openDetailsModal = (order) => {
    setCurrentOrder(order);
    setIsDetailsModalOpen(true);
  };

  const confirmStatusChange = () => {
    setOrders(
      orders.map((o) =>
        o.id === currentOrder.id ? { ...o, status: newStatus } : o
      )
    );
    setIsStatusModalOpen(false);
    setCurrentOrder(null);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || o.status === statusFilter)
  );
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaShoppingBag className="text-orange-500" /> Gestion des commandes
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="En attente">En attente</option>
          <option value="Expédié">Expédié</option>
          <option value="Livré">Livré</option>
        </select>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 sm:p-4">ID</th>
              <th className="p-2 sm:p-4">Date</th>
              <th className="p-2 sm:p-4">Total</th>
              <th className="p-2 sm:p-4">Statut</th>
              <th className="p-2 sm:p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-2 sm:p-4">{order.id}</td>
                <td className="p-2 sm:p-4">{order.date}</td>
                <td className="p-2 sm:p-4">{order.total.toFixed(2)} €</td>
                <td className="p-2 sm:p-4">{order.status}</td>
                <td className="p-2 sm:p-4 flex gap-2">
                  <button
                    onClick={() => openDetailsModal(order)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors relative group"
                  >
                    <FaEye />
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                      Détails
                    </span>
                  </button>
                  <button
                    onClick={() => openStatusModal(order)}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors relative group"
                  >
                    <FaEdit />
                    <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                      Statut
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

      {/* Modal changement de statut */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Changer le statut
            </h2>
            <p className="text-gray-700 mb-4">Commande : {currentOrder?.id}</p>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 mb-4 sm:mb-6"
            >
              <option value="En attente">En attente</option>
              <option value="Expédié">Expédié</option>
              <option value="Livré">Livré</option>
            </select>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={confirmStatusChange}
                className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Confirmer
              </button>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="w-full py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails commande */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Détails de la commande {currentOrder?.id}
            </h2>
            <p>
              <strong>Date :</strong> {currentOrder?.date}
            </p>
            <p>
              <strong>Total :</strong> {currentOrder?.total.toFixed(2)} €
            </p>
            <p>
              <strong>Statut :</strong> {currentOrder?.status}
            </p>
            <h3 className="mt-4 font-semibold">Articles :</h3>
            <ul className="list-disc pl-5">
              {currentOrder?.items.map((item, index) => (
                <li key={index}>
                  {item.title} - Qté : {item.qty} - Prix :{" "}
                  {item.price.toFixed(2)} €
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;
