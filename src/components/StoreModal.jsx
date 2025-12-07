// src/components/StoreModal.jsx
import React from "react";

export default function StoreModal({ store, onClose }) {
  if (!store) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500"
        >
          ✕
        </button>
        <div className="flex items-center gap-4">
          <img
            src={store.logo}
            alt={store.name}
            className="h-20 object-contain rounded"
          />
          <div>
            <h2 className="text-xl font-bold">{store.name}</h2>
            <p className="text-sm text-gray-600">{store.category}</p>
            <p className="text-xs text-gray-400 mt-1">Hours: {store.hours}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{store.desc}</p>
      </div>
    </div>
  );
}
