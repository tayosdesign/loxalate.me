// ─────────────────────────────────────────────────────────────────────────────
// SearchDishPanel.jsx
// Drop this file in:  src/components/SearchDishPanel.jsx
//
// Then in restaurant-map-v3.jsx, add at the top:
//   import SearchDishPanel from "./components/SearchDishPanel";
//
// And wherever your current search panel JSX lives, replace it with:
//   <SearchDishPanel />
//
// That's the entire integration — two lines in your existing file.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from "react";
import { ALL_DISHES } from "../data/dishes";
import { getDishSVG } from "./DishThumb";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const CUISINES = ["All", "Asian", "Mediterranean", "American", "Middle Eastern", "Seafood"];

const OX_BANDS = [
  { key: "low",  label: "Low",  sub: "≤10 mg",  max: 10  },
  { key: "med",  label: "Med",  sub: "11–25 mg", max: 25  },
  { key: "high", label: "High", sub: ">25 mg",   max: 9999 },
];

// How many cards to show per cuisine row before "View more"
const PREVIEW_COUNT = 4;

// ── CUISINE → area mapping (dishes.js uses area not cuisine tag, so we map) ──
const AREA_TO_CUISINE = {
  "Pasadena":         "American",
  "South Pasadena":   "American",
  "San Marino":       "American",
  "Oak Knoll":        "American",
  "Hastings Ranch":   "American",
  "Normandie Heights":"American",
  "Highland Park":    "Asian",
  "Eagle Rock":       "Mediterranean",
  "San Gabriel":      "Asian",
};

// Restaurant name → cuisine override (for places with a clear cuisine identity)
const RESTAURANT_CUISINE = {
  "A La Beirut":                 "Mediterranean",
  "Annapurna Grill":             "Middle Eastern",
  "New Delhi Palace":            "Middle Eastern",
  "Heidar Baba":                 "Middle Eastern",
  "Abu Kabab":                   "Middle Eastern",
  "Deda Restaurant":             "Middle Eastern",
  "Thai Eagle Rox":              "Asian",
  "Star Leaf":                   "Asian",
  "Joy":                         "Asian",
  "Bone Kettle":                 "Asian",
  "Manduyo":                     "Asian",
  "Young Dong Tofu House":       "Asian",
  "Caribbean Gourmet":           "Asian",
  "Lee's Sandwiches":            "Asian",
  "Marina Restaurant":           "Seafood",
  "Eden Garden Bar & Grill":     "Seafood",
  "Parkway Grill":               "American",
  "Granville":                   "American",
  "Houston's":                   "American",
  "Pie 'n Burger":               "American",
};

function getCuisine(dish) {
  return RESTAURANT_CUISINE[dish.restaurant]
    || AREA_TO_CUISINE[dish.area]
    || "American";
}

// ── STYLES (inline — matches your existing LOxalate palette) ──────────────────
const S = {
  panel: {
    display: "flex", flexDirection: "column", height: "100%",
    background: "#fdf5f2", fontFamily: "'DM Sans', sans-serif", overflow: "hidden",
  },
  searchWrap: {
    padding: "12px 16px 8px", background: "#fff",
    borderBottom: "1px solid rgba(58,112,144,0.1)", flexShrink: 0,
  },
  searchBar: {
    display: "flex", alignItems: "center", gap: 8,
    background: "#fde8e0", border: "1px solid #eacfc3",
    borderRadius: 40, padding: "0 14px", height: 42,
  },
  searchInput: {
    border: "none", background: "transparent", outline: "none",
    fontSize: 13.5, color: "#2c5266", flex: 1,
    fontFamily: "'DM Sans', sans-serif",
  },
  clearBtn: {
    width: 20, height: 20, borderRadius: "50%",
    background: "#eacfc3", border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, color: "#8AAFC0", flexShrink: 0,
  },
  cuisineRow: {
    display: "flex", gap: 7, padding: "8px 16px 10px",
    overflowX: "auto", background: "#fff", flexShrink: 0,
    scrollbarWidth: "none",
  },
  pill: (active) => ({
    padding: "5px 14px", borderRadius: 40, fontSize: 12, fontWeight: 500,
    whiteSpace: "nowrap", cursor: "pointer",
    border: active ? "1.5px solid #3A7090" : "1.5px solid rgba(58,112,144,0.15)",
    background: active ? "#3A7090" : "transparent",
    color: active ? "#fff" : "#8AAFC0",
    transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
  }),
  oxRow: {
    display: "flex", gap: 8, padding: "8px 16px 12px",
    background: "#fff", borderBottom: "1px solid rgba(58,112,144,0.1)", flexShrink: 0,
  },
  oxBtn: (key, active) => {
    const colors = {
      low:  { bg: active ? "#7AAFD4" : "#e8f4fb", text: active ? "#fff" : "#2a6a90", border: "#b0d8f0" },
      med:  { bg: active ? "#F5C518" : "#fdf6dc", text: active ? "#fff" : "#7a5500", border: "#f0d868" },
      high: { bg: active ? "#E05540" : "#fef0ee", text: active ? "#fff" : "#a83020", border: "#f0b4aa" },
    }[key];
    return {
      flex: 1, padding: "7px 0", borderRadius: 10, cursor: "pointer",
      border: `1.5px solid ${colors.border}`, background: colors.bg, color: colors.text,
      fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.15s", display: "flex", flexDirection: "column",
      alignItems: "center", gap: 1,
    };
  },
  scrollArea: { flex: 1, overflowY: "auto", padding: "4px 0 20px" },
  catSection: (dimmed) => ({
    padding: "14px 0 4px", opacity: dimmed ? 0.3 : 1, transition: "opacity 0.2s",
  }),
  catHeader: {
    display: "flex", alignItems: "baseline", justifyContent: "space-between",
    padding: "0 16px", marginBottom: 10,
  },
  catTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#3A7090",
  },
  catCount: { fontSize: 11, color: "#8AAFC0" },
  hrow: {
    display: "flex", gap: 10, padding: "0 16px",
    overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
  },
  card: (dimmed) => ({
    flexShrink: 0, width: 140, background: "#fff",
    borderRadius: 14, border: "1px solid rgba(58,112,144,0.12)",
    overflow: "hidden", cursor: "pointer",
    transition: "transform 0.12s, border-color 0.15s, opacity 0.2s",
    opacity: dimmed ? 0.2 : 1, filter: dimmed ? "grayscale(0.4)" : "none",
    pointerEvents: dimmed ? "none" : "auto",
  }),
  cardThumb: { width: "100%", display: "block" },
  cardBody: { padding: "8px 10px 10px" },
  cardMgRow: { display: "flex", alignItems: "baseline", gap: 3, marginBottom: 2 },
  cardMg: { fontSize: 18, fontWeight: 700, color: "#3A7090", lineHeight: 1 },
  cardMgUnit: { fontSize: 10, fontWeight: 400, color: "#8AAFC0" },
  cardName: { fontSize: 11, fontWeight: 500, color: "#2c5266", lineHeight: 1.35, marginBottom: 4 },
  cardTag: {
    display: "inline-block", padding: "2px 7px", borderRadius: 20,
    fontSize: 10, fontWeight: 500, background: "#fde8e0", color: "#8AAFC0",
  },
  viewMoreWrap: { padding: "10px 16px 0" },
  viewMoreBtn: {
    width: "100%", padding: 10, borderRadius: 12,
    border: "1.5px dashed rgba(58,112,144,0.18)", background: "transparent",
    fontSize: 12, fontWeight: 500, color: "#8AAFC0", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", display: "flex",
    alignItems: "center", justifyContent: "center", gap: 6,
  },
  divider: { height: 1, background: "rgba(58,112,144,0.08)", margin: "10px 16px 0" },
  emptyState: { padding: "48px 24px", textAlign: "center", color: "#8AAFC0", fontSize: 14 },
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function DishCard({ dish, dimmed, onClick }) {
  const cuisine = getCuisine(dish);
  return (
    <div style={S.card(dimmed)} onClick={onClick}>
      <div
        style={S.cardThumb}
        dangerouslySetInnerHTML={{ __html: getDishSVG(dish.dish, cuisine) }}
      />
      <div style={S.cardBody}>
        <div style={S.cardMgRow}>
          <span style={S.cardMg}>{dish.mg}</span>
          <span style={S.cardMgUnit}>mg</span>
        </div>
        <div style={S.cardName}>{dish.dish}</div>
        <span style={S.cardTag}>{dish.restaurant}</span>
      </div>
    </div>
  );
}

function CuisineSection({ cuisine, dishes, activeCuisine, oxBand, searchQuery, expanded, onToggleExpand, onSelectDish }) {
  const oxMax = OX_BANDS.find(b => b.key === oxBand)?.max ?? 9999;

  // All dishes for this section (for the row)
  const visibleDishes = dishes.filter(d =>
    d.mg <= oxMax &&
    (!searchQuery || d.dish.toLowerCase().includes(searchQuery.toLowerCase()) || d.restaurant.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const preview = dishes.slice(0, PREVIEW_COUNT);
  const extra   = dishes.slice(PREVIEW_COUNT);
  const shown   = expanded ? dishes : preview;
  const dimmed  = activeCuisine !== "All" && activeCuisine !== cuisine;

  return (
    <div style={S.catSection(dimmed)}>
      {/* Header */}
      <div style={S.catHeader}>
        <span style={S.catTitle}>{cuisine}</span>
        <span style={S.catCount}>{visibleDishes.length} of {dishes.length}</span>
      </div>

      {/* Horizontal scroll row */}
      <div style={S.hrow}>
        {shown.map((dish, i) => {
          const isDimmed = dish.mg > oxMax ||
            (searchQuery && !dish.dish.toLowerCase().includes(searchQuery.toLowerCase()) && !dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase()));
          return (
            <DishCard
              key={`${dish.restaurant}-${dish.dish}-${i}`}
              dish={dish}
              dimmed={isDimmed}
              onClick={() => !isDimmed && onSelectDish(dish)}
            />
          );
        })}
      </div>

      {/* View more / less */}
      {extra.length > 0 && (
        <div style={S.viewMoreWrap}>
          <button style={S.viewMoreBtn} onClick={() => onToggleExpand(cuisine)}>
            {expanded
              ? "▲  Show fewer"
              : `▼  ${extra.length} more in ${cuisine}`}
          </button>
        </div>
      )}

      <div style={S.divider} />
    </div>
  );
}

// ── DISH DETAIL MODAL ─────────────────────────────────────────────────────────

function oxColor(mg) {
  if (mg <= 5)  return "#7AAFD4";
  if (mg <= 15) return "#7AAFD4";
  if (mg <= 30) return "#F5C518";
  return "#E05540";
}
function oxLabel(mg) {
  if (mg <= 5)  return "Very Low";
  if (mg <= 15) return "Low";
  if (mg <= 30) return "Moderate";
  return "High";
}

function DishDetail({ dish, onClose, onAdd }) {
  const [added, setAdded] = useState(false);
  if (!dish) return null;

  const total = dish.total ?? dish.mg ?? 0;
  const col   = oxColor(total);
  const label = oxLabel(total);
  const restaurantName = dish.restaurantName ?? dish.restaurant ?? "";
  const area           = dish.restaurantArea ?? dish.area ?? "";
  const maxOx = dish.ingredients?.length
    ? Math.max(...dish.ingredients.map(i => i.oxalate), 1)
    : 1;

  const q   = encodeURIComponent(restaurantName);
  const loc = encodeURIComponent("Pasadena, CA");
  const platforms = [
    {
      name: "Uber Eats",
      url: `https://www.ubereats.com/search?q=${q}&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMlBhc2FkZW5hJTIwQ0ElMjIlN0Q=`,
      bg: "#000000",
      label: "Uber Eats",
    },
    {
      name: "DoorDash",
      url: `https://www.doordash.com/search/store/${q}/?query=${q}`,
      bg: "#ff3008",
      label: "DoorDash",
    },
    {
      name: "Grubhub",
      url: `https://www.grubhub.com/search?queryText=${q}&orderMethod=delivery&locationMode=DELIVERY&facetSet=umamiV2&pageSize=20&hideHateos=true&fetchCount=20&cityState=Pasadena%2C+CA`,
      bg: "#f63440",
      label: "Grubhub",
    },
  ];

  function handleAdd() {
    if (onAdd) onAdd({ ...dish, total, restaurantName, restaurantArea: area });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(44,82,102,0.7)",
      zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center",
      backdropFilter: "blur(4px)",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 520,
        maxHeight: "90vh", overflowY: "auto", paddingBottom: 32,
      }} onClick={e => e.stopPropagation()}>

        {/* Handle */}
        <div style={{ padding: "14px 0 0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 40, height: 4, background: "#D4E7F2", borderRadius: 2 }} />
        </div>

        <div style={{ padding: "12px 20px 0" }}>
          {/* Restaurant + dish name */}
          <div style={{ fontSize: 12, color: "#8AAFC0", marginBottom: 4 }}>{restaurantName} · {area}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#3A7090", lineHeight: 1.2, marginBottom: 12 }}>{dish.dish}</div>

          {/* Oxalate badge + modifications */}
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <div style={{ background: col + "18", border: `1.5px solid ${col}44`, borderRadius: 12, padding: "10px 14px", textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: col, lineHeight: 1 }}>{total}</div>
              <div style={{ fontSize: 10, color: col, fontWeight: 700 }}>mg oxalate</div>
              <div style={{ fontSize: 10, color: col }}>{label}</div>
            </div>
            {dish.modifications && dish.modifications !== "None needed" && (
              <div style={{ background: "#FDE8E0", borderRadius: 12, padding: "10px 14px", flex: 1 }}>
                <div style={{ fontSize: 10, color: "#8AAFC0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Tip</div>
                <div style={{ fontSize: 13, color: "#3A7090", lineHeight: 1.5 }}>{dish.modifications}</div>
              </div>
            )}
          </div>

          {/* Cooking method */}
          {dish.cookingMethod && (
            <div style={{ fontSize: 13, color: "#8AAFC0", marginBottom: 14 }}>🍳 {dish.cookingMethod}</div>
          )}

          {/* Ingredients */}
          {dish.ingredients?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#8AAFC0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Ingredients</div>
              {dish.ingredients.map((ing, i) => {
                const pct = ing.oxalate === 0 ? 0 : Math.max((ing.oxalate / maxOx) * 100, 6);
                const c   = oxColor(ing.oxalate);
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, color: "#3A7090", fontWeight: 500 }}>{ing.name}</span>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#8AAFC0" }}>{ing.amount}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: ing.oxalate === 0 ? "#8AAFC0" : c, minWidth: 36, textAlign: "right" }}>
                          {ing.oxalate}mg
                        </span>
                      </div>
                    </div>
                    <div style={{ height: 3, background: "#F0F0F0", borderRadius: 2 }}>
                      {ing.oxalate > 0 && <div style={{ height: "100%", width: `${pct}%`, background: c, borderRadius: 2 }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Order buttons */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#8AAFC0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Order for delivery</div>
            <div style={{ display: "flex", gap: 8 }}>
              {platforms.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
                  style={{
                    flex: 1, padding: "10px 6px", borderRadius: 12, textAlign: "center",
                    background: p.bg, color: "#fff", fontSize: 12, fontWeight: 700,
                    textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {p.label}
                </a>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#C8BEBB", textAlign: "center", marginTop: 6 }}>
              Opens search for "{restaurantName}"
            </div>
          </div>

          {/* Add to log button */}
          <button onClick={handleAdd} style={{
            width: "100%", padding: "15px",
            background: added ? "#7AAFD4" : "#3A7090",
            color: added ? "#3A7090" : "#FFFFFF",
            border: "none", borderRadius: 16,
            fontSize: 16, fontWeight: 800, cursor: "pointer",
            transition: "all 0.2s",
          }}>
            {added ? "✓ Added to Log!" : "📋 Add to Today's Log"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function SearchDishPanel({ onAdd = () => {} }) {
  const [search,        setSearch]        = useState("");
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [oxBand,        setOxBand]        = useState("low");
  const [expanded,      setExpanded]      = useState({});  // { [cuisineName]: bool }
  const [selectedDish,  setSelectedDish]  = useState(null);
  const scrollRef = useRef(null);

  // ── Derive dishes per cuisine ──────────────────────────────────────────────
  const cuisineGroups = CUISINES.filter(c => c !== "All").map(cuisine => {
    const dishes = ALL_DISHES.filter(d => getCuisine(d) === cuisine);
    return { cuisine, dishes };
  }).filter(g => g.dishes.length > 0);

  // Apply search filter to determine which cuisines have any matches
  const oxMax = OX_BANDS.find(b => b.key === oxBand)?.max ?? 9999;
  const q = search.toLowerCase();
  const hasMatch = (dish) =>
    dish.mg <= oxMax &&
    (!q || dish.dish.toLowerCase().includes(q) || dish.restaurant.toLowerCase().includes(q));

  const toggleExpand = useCallback((cuisine) => {
    setExpanded(prev => ({ ...prev, [cuisine]: !prev[cuisine] }));
  }, []);

  // When a cuisine pill is tapped, auto-scroll to that section
  const handleCuisine = (cuisine) => {
    setActiveCuisine(cuisine);
    if (cuisine !== "All" && scrollRef.current) {
      const target = scrollRef.current.querySelector(`[data-cuisine="${cuisine}"]`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalVisible = ALL_DISHES.filter(hasMatch).length;

  return (
    <div style={{ ...S.panel, position: "relative" }}>

      {/* Search bar */}
      <div style={S.searchWrap}>
        <div style={S.searchBar}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="#8AAFC0" strokeWidth="1.5"/>
            <line x1="10" y1="10" x2="14" y2="14" stroke="#8AAFC0" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            style={S.searchInput}
            type="text"
            placeholder="Search any dish or ingredient…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button style={S.clearBtn} onClick={() => setSearch("")}>✕</button>
          )}
        </div>
      </div>

      {/* Cuisine pills */}
      <div style={S.cuisineRow}>
        {CUISINES.map(c => (
          <button key={c} style={S.pill(activeCuisine === c)} onClick={() => handleCuisine(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* Oxalate band filters */}
      <div style={S.oxRow}>
        {OX_BANDS.map(b => (
          <button key={b.key} style={S.oxBtn(b.key, oxBand === b.key)} onClick={() => setOxBand(b.key)}>
            <span>{b.label}</span>
            <span style={{ fontSize: 10, opacity: 0.8 }}>{b.sub}</span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ padding: "10px 16px 4px", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexShrink: 0 }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#3A7090" }}>
          {activeCuisine === "All" ? "All Dishes" : activeCuisine}
        </span>
        <span style={{ fontSize: 11, color: "#8AAFC0" }}>{totalVisible} dishes</span>
      </div>

      {/* Scrollable content */}
      <div style={S.scrollArea} ref={scrollRef}>
        {cuisineGroups.length === 0 ? (
          <div style={S.emptyState}>No dishes match your search.</div>
        ) : (
          cuisineGroups.map(({ cuisine, dishes }) => (
            <div key={cuisine} data-cuisine={cuisine}>
              <CuisineSection
                cuisine={cuisine}
                dishes={dishes}
                activeCuisine={activeCuisine}
                oxBand={oxBand}
                searchQuery={search}
                expanded={!!expanded[cuisine]}
                onToggleExpand={toggleExpand}
                onSelectDish={setSelectedDish}
              />
            </div>
          ))
        )}
      </div>

      {/* Dish detail bottom sheet */}
      <DishDetail dish={selectedDish} onClose={() => setSelectedDish(null)} onAdd={onAdd} />
    </div>
  );
}
