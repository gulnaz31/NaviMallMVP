import React, { useState, useMemo } from "react";
import "./styles.css";

const MALLS = [
  {
    id: "mega",
    name: "MEGA Center",
    address: "Almaty, Rozybakieva 263",
    logo: "🏢",
    hours: "10:00–22:00",
  },
  {
    id: "dostyk",
    name: "Dostyk Plaza",
    address: "Almaty, Dostyk Ave 136",
    logo: "🏬",
    hours: "10:00–22:00",
  },
  {
    id: "esentai",
    name: "Esentai Mall",
    address: "Al-Farabi Ave 77/8",
    logo: "🛍️",
    hours: "10:00–22:00",
  },
];

const FLOORS = [
  { id: "B1", label: "B1", name: "Parking & Supermarket" },
  { id: "G", label: "G", name: "Entrance & Cafés" },
  { id: "L1", label: "1", name: "Fashion & Beauty" },
  { id: "L2", label: "2", name: "Electronics & Kids" },
];

const CATEGORIES = [
  "All",
  "Fashion",
  "Food",
  "Electronics",
  "Kids",
  "Services",
  "Beauty",
];

const SHOPS = [
  {
    id: 1,
    name: "Zara",
    floor: "L1",
    category: "Fashion",
    x: 1,
    y: 1,
    description: "Women's & men's fashion",
  },
  {
    id: 2,
    name: "Adidas",
    floor: "L1",
    category: "Fashion",
    x: 2,
    y: 1,
    description: "Sportwear & sneakers",
  },
  {
    id: 3,
    name: "Starbucks",
    floor: "G",
    category: "Food",
    x: 0,
    y: 2,
    description: "Coffee & snacks",
  },
  {
    id: 4,
    name: "KFC",
    floor: "G",
    category: "Food",
    x: 1,
    y: 2,
    description: "Fried chicken",
  },
  {
    id: 5,
    name: "Mi Store",
    floor: "L2",
    category: "Electronics",
    x: 2,
    y: 0,
    description: "Smartphones & gadgets",
  },
  {
    id: 6,
    name: "LEGO Store",
    floor: "L2",
    category: "Kids",
    x: 0,
    y: 0,
    description: "Toys & games",
  },
];

const GRID_SIZE = 4;

function buildRoute(from, to) {
  const path = [];
  let x = from.x;
  let y = from.y;

  while (x !== to.x) {
    path.push({ x, y });
    x += x < to.x ? 1 : -1;
  }
  while (y !== to.y) {
    path.push({ x, y });
    y += y < to.y ? 1 : -1;
  }
  path.push({ x: to.x, y: to.y });

  return path;
}

function isInPath(cell, path) {
  return path.some((p) => p.x === cell.x && p.y === cell.y);
}

function MallSelector({ onSelect }) {
  return (
    <div className="selector-screen">
      <div className="selector-card">
        <h1 className="selector-title">Navimall</h1>
        <p className="selector-sub">
          Выберите торговый центр, чтобы построить маршрут до магазина.
        </p>
        <div className="selector-list">
          {MALLS.map((mall) => (
            <button
              key={mall.id}
              className="selector-mall"
              onClick={() => onSelect(mall)}
            >
              <span className="selector-mall-logo">{mall.logo}</span>
              <div className="selector-mall-info">
                <div className="selector-mall-name">{mall.name}</div>
                <div className="selector-mall-address">{mall.address}</div>
                <div className="selector-mall-hours">⏰ {mall.hours}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewSwitch({ view, setView }) {
  return (
    <div className="view-switch">
      <button
        className={view === "map" ? "active" : ""}
        onClick={() => setView("map")}
      >
        Map view
      </button>
      <button
        className={view === "list" ? "active" : ""}
        onClick={() => setView("list")}
      >
        Shops list
      </button>
    </div>
  );
}

function Filters({ search, setSearch, activeCategory, setActiveCategory }) {
  return (
    <div className="filters-card">
      <div className="filters-search">
        <span className="filters-search-icon">🔍</span>
        <input
          type="text"
          value={search}
          placeholder="Search shops, brands, categories..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filters-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={
              "filters-chip" +
              (activeCategory === cat ? " filters-chip--active" : "")
            }
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

function FloorSwitch({ activeFloor, setActiveFloor }) {
  return (
    <div className="floors-switch">
      {FLOORS.map((f) => (
        <button
          key={f.id}
          className={
            "floor-chip" + (activeFloor === f.id ? " floor-chip--active" : "")
          }
          onClick={() => setActiveFloor(f.id)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function MapCard({ activeFloor, selectedShop, path }) {
  return (
    <div className="map-card">
      <div className="map-card-header">
        <div>
          <div className="map-title">Interactive map</div>
          <div className="map-subtitle">
            Маршрут от входа до магазина по текущему этажу
          </div>
        </div>
        <div className="map-floor-info">
          <div className="map-floor-label">Floor</div>
          <div className="map-floor-name">
            {FLOORS.find((f) => f.id === activeFloor)?.name}
          </div>
        </div>
      </div>

      <FloorSwitch activeFloor={activeFloor} setActiveFloor={() => {}} />

      <div className="map-grid">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const cell = { x, y };

          const isEntrance = x === 0 && y === GRID_SIZE - 1;
          const isShop =
            selectedShop && selectedShop.x === x && selectedShop.y === y;
          const inPath = path && isInPath(cell, path);

          let cellClass = "map-cell";
          if (isEntrance) cellClass += " map-cell--entrance";
          else if (isShop) cellClass += " map-cell--shop";
          else if (inPath) cellClass += " map-cell--route";

          return (
            <div key={`${x}-${y}`} className={cellClass}>
              {isEntrance ? "ENT" : isShop ? "SHOP" : ""}
            </div>
          );
        })}
      </div>

      <div className="map-legend">
        <div className="map-legend-item">
          <span
            className="map-legend-dot"
            style={{
              background: "rgba(34,197,94,0.9)",
              border: "1px solid rgba(74,222,128,1)",
            }}
          />
          Entrance
        </div>
        <div className="map-legend-item">
          <span
            className="map-legend-dot"
            style={{
              background: "rgba(249,115,22,0.9)",
              border: "1px solid rgba(253,186,116,1)",
            }}
          />
          Selected shop
        </div>
        <div className="map-legend-item">
          <span
            className="map-legend-dot"
            style={{
              background: "rgba(34,197,94,0.3)",
              border: "1px solid rgba(74,222,128,0.6)",
            }}
          />
          Route
        </div>
      </div>

      <div className="route-box">
        {selectedShop ? (
          <>
            <div className="route-title">Route to {selectedShop.name}</div>
            {path && path.length > 0 ? (
              <ol className="route-list">
                <li>Start at entrance (ENT).</li>
                <li>Следуйте по коридору вдоль зелёного маршрута.</li>
                <li>
                  На пересечении поверните в сторону блока ({selectedShop.x},{" "}
                  {selectedShop.y}).
                </li>
                <li>
                  Магазин{" "}
                  <span className="route-shop-name">{selectedShop.name}</span>{" "}
                  будет отмечен оранжевым.
                </li>
              </ol>
            ) : (
              <p>Нажмите на магазин справа, чтобы построить маршрут.</p>
            )}
          </>
        ) : (
          <p>Выберите магазин справа, чтобы построить маршрут на карте.</p>
        )}
      </div>
    </div>
  );
}

function ShopsCard({
  shops,
  totalShops,
  setActiveFloor,
  setView,
  setSelectedShop,
}) {
  return (
    <div className="shops-card">
      <div className="shops-header">
        <div>
          <div className="shops-title">Shops</div>
          <div className="shops-subtitle">
            Tap a shop to preview route & details
          </div>
        </div>
        <div className="shops-total">{totalShops} total</div>
      </div>

      <div className="shops-list">
        {shops.length === 0 && (
          <div className="shops-empty">
            No shops found. Try clearing filters or changing floor.
          </div>
        )}

        {shops.map((shop) => (
          <div
            key={shop.id}
            className="shop-card"
            onClick={() => {
              setActiveFloor(shop.floor);
              setView("map");
              setSelectedShop(shop);
            }}
          >
            <div className="shop-main">
              <div className="shop-name">{shop.name}</div>
              <div className="shop-meta">
                {shop.category} • Floor {shop.floor}
              </div>
              <div className="shop-desc">{shop.description}</div>
            </div>

            <div className="shop-side">
              <div className="shop-badge">
                <span className="shop-badge-dot" />
                Open
              </div>
              <div>Show on map →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedMall, setSelectedMall] = useState(null);

  if (!selectedMall) {
    return <MallSelector onSelect={setSelectedMall} />;
  }

  return (
    <MallScreen mall={selectedMall} onBack={() => setSelectedMall(null)} />
  );
}

function MallScreen({ mall, onBack }) {
  const [search, setSearch] = useState("");
  const [activeFloor, setActiveFloor] = useState("G");
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState("map");
  const [selectedShop, setSelectedShop] = useState(null);

  const entrance = { x: 0, y: 3 };

  const filteredShops = useMemo(() => {
    return SHOPS.filter((shop) => {
      const matchesFloor = view === "map" ? shop.floor === activeFloor : true;
      const matchesCategory =
        activeCategory === "All" || shop.category === activeCategory;
      const term = search.trim().toLowerCase();
      const matchesSearch = !term
        ? true
        : shop.name.toLowerCase().includes(term) ||
          shop.description.toLowerCase().includes(term);
      return matchesFloor && matchesCategory && matchesSearch;
    });
  }, [view, activeFloor, activeCategory, search]);

  const filteredShopsOnFloor = useMemo(() => {
    return SHOPS.filter((shop) => {
      const matchesFloor = shop.floor === activeFloor;
      const matchesCategory =
        activeCategory === "All" || shop.category === activeCategory;
      const term = search.trim().toLowerCase();
      const matchesSearch = !term
        ? true
        : shop.name.toLowerCase().includes(term) ||
          shop.description.toLowerCase().includes(term);
      return matchesFloor && matchesCategory && matchesSearch;
    });
  }, [activeFloor, activeCategory, search]);

  const path = selectedShop ? buildRoute(entrance, selectedShop) : [];

  return (
    <div className="App">
      <div className="app-shell">
        {/* Back */}
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        {/* Mall header */}
        <div className="mall-header">
          <span className="mall-logo">{mall.logo}</span>
          <div>
            <div className="mall-info-title">{mall.name}</div>
            <div className="mall-info-sub">{mall.address}</div>
            <div className="mall-info-hours">⏰ {mall.hours}</div>
          </div>
        </div>

        {/* View switch */}
        <ViewSwitch view={view} setView={setView} />

        {/* Filters */}
        <Filters
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Layout: map + shops */}
        <div className="main-grid">
          <MapCard
            activeFloor={activeFloor}
            selectedShop={selectedShop}
            path={path}
          />
          <ShopsCard
            shops={view === "map" ? filteredShopsOnFloor : filteredShops}
            totalShops={SHOPS.length}
            setActiveFloor={setActiveFloor}
            setView={setView}
            setSelectedShop={setSelectedShop}
          />
        </div>

        <div className="footer-note">
          Prototype only: routes are simulated on grid map, data is static in
          frontend.
        </div>
      </div>
    </div>
  );
}
