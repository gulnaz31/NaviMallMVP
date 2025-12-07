import React from "react";

export default function MapObject({
  floor,
  stores,
  onStoreClick,
  highlightedId,
}) {
  // Simple rectangular store boxes positioned by x,y from data
  return (
    <div className="w-full h-64 mb-6 rounded overflow-hidden shadow bg-white flex items-center justify-center">
      <svg viewBox="0 0 600 200" className="w-full h-full">
        <rect
          width="600"
          height="200"
          fill={floor === 1 ? "#f8fafc" : "#fff7ed"}
        />
        {
          <image
            href="/mnt/data/A_2D_digital_mockup_depicts_NaviMall’s_user_interf.png"
            x="0"
            y="0"
            width="600"
            height="200"
            preserveAspectRatio="xMidYMid slice"
          />

          /* Optional background mockup image — replace with uploaded file path if you prefer a full image */
        }

        {stores
          .filter((s) => s.floor === floor)
          .map((store) => (
            <g
              key={store.id}
              transform={`translate(${store.x}, ${store.y})`}
              className="cursor-pointer"
              onClick={() => onStoreClick(store.id)}
            >
              <rect
                x="-60"
                y="-30"
                width="120"
                height="60"
                fill={store.id === highlightedId ? "#fde68a" : "#ffffff"}
                stroke="#cbd5e1"
                rx="8"
              />
              <text
                x="0"
                y="5"
                textAnchor="middle"
                fontSize="12"
                fill="#111827"
              >
                {store.name}
              </text>
            </g>
          ))}
      </svg>
    </div>
  );
}
