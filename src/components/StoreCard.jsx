import React from "react";

export default function StoreCard({ store, onClick }) {
  return (
    <div
      onClick={() => onClick(store)}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
    >
      {/* Logo area */}
      <div className="flex items-center justify-center h-40 bg-gray-50 relative">
        <div className="absolute inset-0 border-4 border-white rounded-xl shadow-inner"></div>
        <img
          src={store.image}
          alt={store.name}
          className="h-20 object-contain z-10"
        />
      </div>

      {/* Store info */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
        <p className="text-sm text-gray-500">{store.category}</p>
        <p className="text-xs text-gray-400 mt-1">Floor {store.floor}</p>
      </div>
    </div>
  );
}
