// src/components/StoreList.jsx
import React from "react";

export default function StoreList({ stores, onSelect, highlightId }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {stores.map((s) => (
        <div
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`bg-white rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition ${
            s.id === highlightId ? "ring-2 ring-indigo-300" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={s.logo}
              alt={s.name}
              className="h-12 object-contain"
              style={{ maxWidth: 80 }}
            />
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-500">
                {s.category} • Floor {s.floor}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
