import { useRef, useEffect } from "react";

function LeafletMap({ restaurants, selectedRestaurant, onSelectRestaurant, filter }) {
  const mapContainerRef = useRef(null);
  const mapRef          = useRef(null);
  const markersRef      = useRef({});
  const [leafletReady, setLeafletReady] = useState(false);

  // ── Load Leaflet CSS + JS once ───────────────────────────────────────────
  useEffect(() => {
    if (window.L) { setLeafletReady(true); return; }
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(css);
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, []);

  // ── Initialize map ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletReady || !mapContainerRef.current || mapRef.current) return;
    const L = window.L;

    mapRef.current = L.map(mapContainerRef.current, {
      center: [34.145, -118.155],
      zoom: 13,
      zoomControl: false,
    });

    // Original OSM tiles — proven working
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);

    L.control.zoom({ position: "bottomright" }).addTo(mapRef.current);

  }, [leafletReady]);

  // ── Build / refresh markers ──────────────────────────────────────────────
  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;
    const L   = window.L;
    const map = mapRef.current;

    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    const visible = restaurants.filter(r => {
      if (filter === "low")  return r.hasLowOxalate;
      if (filter === "high") return !r.hasLowOxalate;
      return true;
    });

    visible.forEach(r => {
      const hasMenu    = r.options.length > 0;
      const avgOxalate = hasMenu
        ? Math.round(r.options.reduce((s, o) => s + (o.total || 0), 0) / r.options.length * 10) / 10
        : null;

      const pinColor   = avgOxalate === null ? "#8A8580"
        : avgOxalate <= 10 ? "#8DAA91"
        : avgOxalate <= 25 ? "#E5D3B3"
        : "#D17A5D";
      const label      = avgOxalate === null ? "?" : avgOxalate <= 10 ? "Low" : avgOxalate <= 25 ? "Med" : "High";
      const isSelected = selectedRestaurant?.name === r.name;
      const avgText    = avgOxalate !== null ? `${avgOxalate}` : "?";

      // ── White pill, color dot + number, teardrop tail ─────────────────
      // Pill is compact: ~46px wide × 24px tall + 7px tail
      // iconAnchor at the tip of the tail so pin points exactly to location
      const PH   = isSelected ? 28 : 22;   // pill height
      const PW   = isSelected ? 60 : 50;   // pill width (fixed, no text overflow)
      const TH   = 7;                       // tail height
      const totalH = PH + TH;

      const pulseRing = isSelected ? `
        <div style="
          position:absolute;
          top:${-(PH * 0.45)}px; left:${-(PW * 0.22)}px;
          width:${PW * 1.44}px; height:${PH * 1.9}px;
          border-radius:${PH}px;
          border:2px solid ${pinColor}50;
          animation:pinPulse 1.8s ease-out infinite;
          pointer-events:none;
        "></div>` : "";

      const dotSize  = isSelected ? 9 : 7;
      const fontSize = isSelected ? 12 : 10;
      const fw       = isSelected ? 800 : 700;

      const icon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative; width:${PW}px; height:${totalH}px;">
            ${pulseRing}
            <!-- Pill body -->
            <div style="
              position:absolute; top:0; left:0;
              width:${PW}px; height:${PH}px;
              background:#FFFFFF;
              border:2px solid ${pinColor};
              border-radius:${PH}px;
              box-shadow: ${isSelected
                ? `0 4px 16px ${pinColor}55, 0 2px 8px rgba(0,0,0,0.15)`
                : `0 2px 8px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.08)`};
              display:flex; align-items:center; justify-content:center; gap:4px;
            ">
              <div style="
                width:${dotSize}px; height:${dotSize}px; border-radius:50%;
                background:${pinColor}; flex-shrink:0;
              "></div>
              <span style="
                font-family:ui-sans-serif,system-ui,sans-serif;
                font-size:${fontSize}px; font-weight:${fw};
                color:#1A1A1A; line-height:1; letter-spacing:-0.02em;
              ">${avgText}mg</span>
            </div>
            <!-- Tail triangle pointing down -->
            <div style="
              position:absolute;
              top:${PH - 1}px;
              left:${PW / 2 - 5}px;
              width:0; height:0;
              border-left:5px solid transparent;
              border-right:5px solid transparent;
              border-top:${TH}px solid ${pinColor};
            "></div>
          </div>`,
        iconSize:   [PW, totalH],
        iconAnchor: [PW / 2, totalH],   // anchor = tip of tail
      });

      const marker = L.marker([r.lat, r.lng], { icon });
      marker.on("click", () => onSelectRestaurant(r));

      // ── Tooltip ───────────────────────────────────────────────────────
      const avgLine = avgOxalate !== null
        ? `<div style="display:flex;align-items:center;gap:5px;margin-top:4px;">
             <div style="width:8px;height:8px;border-radius:50%;background:${pinColor};flex-shrink:0;"></div>
             <span style="color:${pinColor};font-size:11px;font-weight:700;">${avgOxalate}mg avg · ${label}</span>
           </div>`
        : `<span style="color:#8A8580;font-size:11px;">No dish data yet</span>`;
      const menuLine = hasMenu
        ? `<div style="font-size:10px;color:#8A8580;margin-top:3px;">📋 ${r.options.length} dish${r.options.length !== 1 ? "es" : ""} on menu</div>`
        : "";

      marker.bindTooltip(
        `<div style="font-weight:700;font-size:13px;color:#1A1A1A;line-height:1.2;">${r.name}</div>${avgLine}${menuLine}`,
        { direction: "top", offset: [0, -(totalH + 4)], className: "ox-tip" }
      );

      marker.addTo(map);
      markersRef.current[r.name] = marker;
    });
  }, [leafletReady, restaurants, filter, selectedRestaurant, onSelectRestaurant]);

  // ── Pan to selected ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletReady || !mapRef.current || !selectedRestaurant) return;
    mapRef.current.panTo([selectedRestaurant.lat, selectedRestaurant.lng], { animate: true, duration: 0.5 });
  }, [leafletReady, selectedRestaurant]);

  return (
    <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1.5px solid #E5D3B3", boxShadow: "0 4px 24px #F0E5CC" }}>
      <style>{`
        @keyframes pinPulse {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.9); }
        }

        /* Tooltip card */
        .ox-tip {
          background: #fff !important;
          border: 1.5px solid #E5D3B3 !important;
          border-radius: 12px !important;
          padding: 9px 13px !important;
          box-shadow: 0 8px 28px #E5D3B3 !important;
          font-family: ui-sans-serif, system-ui, sans-serif !important;
          line-height: 1.45 !important;
        }
        .ox-tip::before,
        .ox-tip.leaflet-tooltip-top::before { display: none !important; }

        /* Zoom controls */
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 14px !important;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(26,26,26,0.08) !important;
        }
        .leaflet-control-zoom a {
          background: #fff !important;
          color: #1A1A1A !important;
          border: none !important;
          border-bottom: 1px solid #F4ECD8 !important;
          font-size: 20px !important;
          font-weight: 300 !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: background 0.15s !important;
        }
        .leaflet-control-zoom a:hover { background: #F4ECD8 !important; }
        .leaflet-control-zoom-out { border-bottom: none !important; }

        /* Attribution */
        .leaflet-control-attribution {
          font-size: 8px !important;
          background: rgba(255,255,255,0.55) !important;
          backdrop-filter: blur(6px) !important;
          border-radius: 8px 0 0 0 !important;
          padding: 2px 6px !important;
        }

        /* Slightly boost CartoDB Voyager contrast */
        .leaflet-tile-pane {
          filter: saturate(1.1) brightness(1.02);
        }
      `}</style>

      {!leafletReady && (
        <div style={{ height: 420, background: "#FDFBF7", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🗺️</div>
            <div style={{ fontSize: 13, color: "#1A1A1A", fontWeight: 600 }}>Loading map…</div>
          </div>
        </div>
      )}

      <div ref={mapContainerRef} style={{ height: 420, display: leafletReady ? "block" : "none" }} />

      {/* Floating legend pill */}
      {leafletReady && (
        <div style={{
          position: "absolute", bottom: 12, left: 12, zIndex: 800,
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
          borderRadius: 999, padding: "5px 12px",
          boxShadow: "0 2px 12px #E5D3B3",
          border: "1px solid rgba(255,255,255,0.8)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          {[["#8DAA91","Low"],["#E5D3B3","Med"],["#D17A5D","High"],["#8A8580","?"]].map(([c,l]) => (
            <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:c }} />
              <span style={{ fontSize:10, fontWeight:600, color:"#1A1A1A" }}>{l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default LeafletMap;
