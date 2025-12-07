import React from "react";

export default function Header({
  search,
  setSearch,
  floor,
  setFloor,
  onCategory,
}) {
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧭</span>
          <h1 className="text-xl font-semibold">NaviMall</h1>
        </div>

        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores (e.g. Adidas)"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={floor}
            onChange={(e) => setFloor(Number(e.target.value))}
            className="border rounded p-2"
          >
            <option value={1}>Floor 1</option>
            <option value={2}>Floor 2</option>
          </select>

          <select
            onChange={(e) => onCategory(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            <option value="Fashion">Fashion</option>
            <option value="Tech">Tech</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>
    </header>
  );
}
