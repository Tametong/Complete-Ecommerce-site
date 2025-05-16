import React, { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "Les commandes sont expédiées sous 2 à 3 jours ouvrables. La livraison prend ensuite 3 à 5 jours selon votre localisation.",
    },
    {
      question: "Puis-je retourner un produit ?",
      answer:
        "Oui, vous avez 30 jours pour retourner un produit en état neuf. Contactez notre support pour les détails.",
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les cartes bancaires (Visa, Mastercard). D’autres options comme PayPal seront bientôt disponibles.",
    },
    {
      question: "Comment suivre ma commande ?",
      answer:
        "Une fois votre commande expédiée, vous recevrez un lien de suivi par email.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FaQuestionCircle className="text-orange-500" /> Foire aux questions
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left flex justify-between items-center text-gray-800 font-semibold"
            >
              {faq.question}
              {openIndex === index ? (
                <FaChevronUp className="text-orange-500" />
              ) : (
                <FaChevronDown className="text-orange-500" />
              )}
            </button>
            {openIndex === index && (
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
