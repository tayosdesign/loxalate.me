import { useState, useEffect } from "react";

/* ============================================================================
   ProfilePage — UX/UI extract
   ----------------------------------------------------------------------------
   A self-contained profile page component. The layout, structure, spacing,
   interaction flow, and modal edit pattern are preserved from the original.
   All brand-specific colors have been pulled out into the THEME object at
   the top of the file so you can re-skin the whole thing in one place.

   Drop-in usage:
     <ProfilePage />
     <ProfilePage trackedDishes={...} removeFromLog={...} clearLog={...} />

   Persistence uses localStorage by default (no external storage needed).
   ============================================================================ */

// ── Theme tokens ────────────────────────────────────────────────────────────
// Health & Wellness palette: Soft Cream, Deep Charcoal, Sage Green,
// Muted Terracotta, Warm Sand.
const THEME = {
  // Surfaces
  bg:           "#FDFBF7",   // Soft Cream — warm page background
  surface:      "#FFFFFF",   // Card surface
  surfaceAlt:   "#FAF7F0",   // Slight cream tint for nested surfaces

  // Text
  text:         "#1A1A1A",   // Deep Charcoal
  textMuted:    "#6B6B6B",   // Charcoal at lower contrast
  textOnDark:   "#FDFBF7",   // Cream on dark backgrounds (softer than pure white)

  // Primary accent — Sage Green
  primary:      "#8DAA91",   // Sage Green
  primaryDark:  "#1A1A1A",   // Deep Charcoal for hero + strong CTAs
  primaryLight: "#E8EFE9",   // Soft sage tint for chip backgrounds
  primarySoft:  "#F2F6F3",   // Even softer sage for hover states

  // Borders
  border:       "#E5DDD0",   // Warm Sand at low saturation
  borderSoft:   "#F0E9DB",   // Lighter warm border

  // Sand accents
  sand:         "#E5D3B3",   // Warm Sand — secondary highlight

  // Status (today's log thresholds, error states, etc.)
  success:      "#8DAA91",   // Sage Green — on-target
  warning:      "#D6B47A",   // Sand-derived amber — approaching limit
  danger:       "#D17A5D",   // Muted Terracotta — over-target / avoid
  dangerSoft:   "#FBEEE8",   // Pale terracotta tint
  dangerBorder: "#E3A78F",   // Soft terracotta border
};

// ── Defaults ────────────────────────────────────────────────────────────────
const PROFILE_DEFAULTS = {
  name: "", height_ft: "", height_in: "", weight: "", sex: "",
  oxalate_goal: "moderate",
  custom_oxalate_limit: "",
  dietary_needs: [],
  medical_conditions: [],
  cuisines: [],
  disliked_ingredients: [],
  spicy: null,
  eating_patterns: [],
  meals_per_day: 3,
  location: "",
  health_connected: [],
};

const STORAGE_KEY = "profile-v1";

// ── Helpers ─────────────────────────────────────────────────────────────────
function sanitizeProfileText(s) {
  if (typeof s !== "string") return "";
  return s.replace(/\0/g, "").replace(/<[^>]*>/g, "").replace(/javascript\s*:/gi, "").trim().slice(0, 120);
}

function openHealthApp(app) {
  const urls = {
    apple:   "x-apple-health://",
    google:  "https://health.google.com",
    samsung: "shealth://",
  };
  const fallbacks = {
    apple:   "https://support.apple.com/guide/iphone/intro-to-health-iphbefba7973/ios",
    google:  "https://health.google.com",
    samsung: "https://health.samsung.com",
  };
  try {
    window.location.href = urls[app];
    setTimeout(() => window.open(fallbacks[app], "_blank"), 1500);
  } catch {
    window.open(fallbacks[app], "_blank");
  }
}

// ── Tag chip input ──────────────────────────────────────────────────────────
function TagInput({ tags, onChange, placeholder, suggestions = [], maxTags = 20 }) {
  const [input, setInput] = useState("");
  const [showSug, setShowSug] = useState(false);

  const filtered = suggestions.filter(s =>
    s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  ).slice(0, 6);

  function add(val) {
    const clean = sanitizeProfileText(val);
    if (!clean || tags.includes(clean) || tags.length >= maxTags) return;
    onChange([...tags, clean]);
    setInput(""); setShowSug(false);
  }

  function remove(tag) { onChange(tags.filter(t => t !== tag)); }

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6, padding: "8px 10px",
        border: `1.5px solid ${THEME.border}`, borderRadius: 14, background: THEME.surface,
        minHeight: 44, cursor: "text"
      }} onClick={() => document.getElementById("ti-" + placeholder)?.focus()}>
        {tags.map(tag => (
          <span key={tag} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: THEME.primary, color: THEME.textOnDark, fontSize: 12, fontWeight: 700,
            padding: "3px 10px", borderRadius: 999
          }}>
            {tag}
            <button onClick={() => remove(tag)} style={{ background: "none", border: "none", color: THEME.textOnDark, cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0, marginLeft: 2 }}>×</button>
          </span>
        ))}
        <input
          id={"ti-" + placeholder}
          value={input}
          onChange={e => { setInput(e.target.value); setShowSug(true); }}
          onKeyDown={e => {
            if ((e.key === "Enter" || e.key === ",") && input.trim()) { e.preventDefault(); add(input.trim()); }
            if (e.key === "Backspace" && !input && tags.length) remove(tags[tags.length - 1]);
          }}
          onFocus={() => setShowSug(true)}
          onBlur={() => setTimeout(() => setShowSug(false), 180)}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: THEME.text, fontFamily: "inherit", minWidth: 100, flex: 1 }}
        />
      </div>
      {showSug && (filtered.length > 0 || input.length > 1) && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200, background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.1)", marginTop: 4, overflow: "hidden" }}>
          {input.length > 1 && !filtered.includes(input.trim()) && (
            <div onMouseDown={() => add(input.trim())} style={{ padding: "9px 12px", cursor: "pointer", fontSize: 13, color: THEME.primary, fontWeight: 700, borderBottom: filtered.length ? `1px solid ${THEME.borderSoft}` : "none" }}>
              + Add "{input.trim()}"
            </div>
          )}
          {filtered.map(s => (
            <div key={s} onMouseDown={() => add(s)} style={{ padding: "9px 12px", cursor: "pointer", fontSize: 15, color: THEME.text }}
              onMouseEnter={e => e.currentTarget.style.background = THEME.primarySoft}
              onMouseLeave={e => e.currentTarget.style.background = ""}
            >{s}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Multi-select pill group ─────────────────────────────────────────────────
function PillGroup({ options, value, onChange, multi = true, color = THEME.primary }) {
  function toggle(opt) {
    if (!multi) { onChange(value === opt ? null : opt); return; }
    onChange((value || []).includes(opt) ? value.filter(v => v !== opt) : [...(value || []), opt]);
  }
  const isActive = (opt) => multi ? (value || []).includes(opt) : value === opt;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {options.map(opt => {
        const val    = typeof opt === "object" ? opt.value : opt;
        const label  = typeof opt === "object" ? opt.label : opt;
        const active = isActive(val);
        return (
          <button key={val} onClick={() => toggle(val)} style={{
            padding: "7px 14px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
            border: `1.5px solid ${active ? color : THEME.border}`,
            background: active ? color : THEME.surface,
            color: active ? THEME.textOnDark : THEME.textMuted,
            transition: "all 0.15s"
          }}>{label}</button>
        );
      })}
    </div>
  );
}

// ── Section card wrapper (used inside edit modal) ───────────────────────────
function SectionCard({ number, title, icon, children, accent = THEME.primary }) {
  return (
    <div style={{
      background: THEME.surface, borderRadius: 16, border: `1px solid ${THEME.border}`,
      overflow: "hidden", marginBottom: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
    }}>
      <div style={{
        background: `${accent}10`,
        borderBottom: `1px solid ${accent}22`,
        padding: "14px 18px",
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 12,
          background: accent, color: THEME.textOnDark,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 900
        }}>{number}</div>
        <span style={{ fontSize: 16, fontWeight: 800, color: THEME.text, letterSpacing: "-0.01em" }}>
          {icon} {title}
        </span>
      </div>
      <div style={{ padding: "16px 18px" }}>{children}</div>
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</div>
      {children}
      {hint && <div style={{ fontSize: 13, color: THEME.textMuted, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", unit, min, max }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <input type={type} value={value} min={min} max={max}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, padding: "9px 12px", fontSize: 14, fontWeight: 500,
          border: `1.5px solid ${THEME.border}`, borderRadius: 12, outline: "none",
          background: THEME.surface, color: THEME.text, fontFamily: "inherit",
          boxSizing: "border-box"
        }}
        onFocus={e => e.currentTarget.style.borderColor = THEME.primary}
        onBlur={e => e.currentTarget.style.borderColor = THEME.border}
      />
      {unit && <span style={{ fontSize: 14, color: THEME.textMuted, whiteSpace: "nowrap" }}>{unit}</span>}
    </div>
  );
}

// ── ProfilePage ─────────────────────────────────────────────────────────────
export default function ProfilePage({
  trackedDishes = [],
  removeFromLog = () => {},
  clearLog = () => {},
}) {
  const [profile, setProfile] = useState(PROFILE_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen]   = useState(false);
  const [saved, setSaved]         = useState(false);
  const [saveError, setSaveError] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile({ ...PROFILE_DEFAULTS, ...JSON.parse(raw) });
    } catch (_) {}
    setLoading(false);
  }, []);

  function saveProfile() {
    setSaveError("");
    if (profile.name && profile.name.length < 2) { setSaveError("Name must be at least 2 characters."); return; }
    if (profile.weight && (isNaN(profile.weight) || profile.weight < 50 || profile.weight > 700)) { setSaveError("Please enter a valid weight."); return; }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      setSaved(true);
      setTimeout(() => { setSaved(false); setEditOpen(false); }, 1800);
    } catch { setSaveError("Could not save. Please try again."); }
  }

  function set(key, val) { setProfile(p => ({ ...p, [key]: val })); setSaved(false); }

  // Profile completion calculation
  const completionFields = [
    profile.name, profile.sex, profile.height_ft, profile.weight,
    profile.oxalate_goal, profile.location,
    profile.medical_conditions.length > 0 ? "x" : null,
    profile.eating_patterns.length > 0 ? "x" : null,
  ];
  const completion = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100);

  // Today's log totals
  const totalToday  = trackedDishes.reduce((s, d) => s + (d.total || 0), 0);
  const logColor    = totalToday < 50 ? THEME.success : totalToday < 100 ? THEME.warning : THEME.danger;
  const logStatus   = totalToday < 50 ? "Excellent" : totalToday < 100 ? "On Track" : "Over Target";
  const logPct      = Math.min((totalToday / 100) * 100, 100);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center", color: THEME.textMuted }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
        <div style={{ fontSize: 14 }}>Loading...</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: THEME.bg, minHeight: "100vh", paddingBottom: 80 }}>

      {/* ── HERO ── */}
      <div style={{ background: THEME.primaryDark, padding: "28px 20px", position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />

        {/* Identity row: avatar + name + edit button */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, position: "relative", zIndex: 2 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: THEME.primary, border: "3px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: THEME.textOnDark, flexShrink: 0 }}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : "🌿"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: THEME.textOnDark, lineHeight: 1.2 }}>
              {profile.name || "Your Name"}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 3, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {profile.location && <span>📍 {profile.location}</span>}
              {profile.sex && <span>· {profile.sex}</span>}
              {profile.oxalate_goal && <span>· {profile.oxalate_goal === "strict" ? "Strict <50mg" : profile.oxalate_goal === "moderate" ? "Moderate 50–100mg" : "Custom Goal"}</span>}
            </div>
          </div>
          <button onClick={() => setEditOpen(true)} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "7px 14px", color: THEME.textOnDark, fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
            Edit
          </button>
        </div>

        {/* Quick stat pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", position: "relative", zIndex: 2, marginBottom: 16 }}>
          {[
            profile.height_ft ? { label: "Height", val: `${profile.height_ft}'${profile.height_in || 0}"` } : null,
            profile.weight    ? { label: "Weight", val: `${profile.weight} lbs` } : null,
            profile.meals_per_day ? { label: "Meals/day", val: profile.meals_per_day } : null,
            profile.spicy     ? { label: "Spice", val: profile.spicy } : null,
          ].filter(Boolean).map(({ label, val }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "5px 10px", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: THEME.textOnDark }}>{val}</div>
            </div>
          ))}
          {profile.medical_conditions?.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "5px 10px", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Conditions</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: THEME.textOnDark }}>
                {profile.medical_conditions.slice(0, 2).join(", ")}
                {profile.medical_conditions.length > 2 ? " +" + (profile.medical_conditions.length - 2) : ""}
              </div>
            </div>
          )}
        </div>

        {/* Profile completion bar */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Profile {completion}% complete
            </span>
            {completion < 100 && (
              <span onClick={() => setEditOpen(true)} style={{ fontSize: 11, color: THEME.primary, fontWeight: 700, cursor: "pointer" }}>
                Complete →
              </span>
            )}
          </div>
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 999, height: 4 }}>
            <div style={{ height: "100%", width: completion + "%", background: THEME.primary, borderRadius: 999, transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      {/* ── CARDS GRID ── */}
      <div style={{ padding: "16px 16px 0" }}>

        {/* Today's Log card */}
        <div style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: THEME.text, textTransform: "uppercase", letterSpacing: "0.08em" }}>📋 Today's Log</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: logColor, lineHeight: 1 }}>{totalToday}</span>
              <span style={{ fontSize: 14, color: THEME.textMuted }}>mg</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: logColor, marginLeft: 4 }}>{logStatus}</span>
            </div>
          </div>
          <div style={{ background: THEME.borderSoft, borderRadius: 999, height: 6, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ height: "100%", width: logPct + "%", background: logColor, borderRadius: 999, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: trackedDishes.length ? 10 : 0 }}>
            <span style={{ fontSize: 10, color: THEME.textMuted }}>0mg</span>
            <span style={{ fontSize: 10, color: THEME.textMuted }}>Target: 50–100mg/day</span>
            <span style={{ fontSize: 10, color: THEME.textMuted }}>100mg</span>
          </div>
          {trackedDishes.length === 0 ? (
            <div style={{ fontSize: 14, color: THEME.textMuted, textAlign: "center", padding: "8px 0" }}>
              Nothing logged yet — add dishes from the Map 🗺
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {trackedDishes.map(entry => {
                const c = entry.total <= 10 ? THEME.success : entry.total <= 25 ? THEME.warning : THEME.danger;
                return (
                  <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: THEME.surface, borderRadius: 12, padding: "7px 10px", borderLeft: `3px solid ${c}` }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: THEME.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.dish}</div>
                      <div style={{ fontSize: 12, color: THEME.textMuted }}>{entry.restaurantName} · {entry.time}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: c }}>{entry.total}mg</span>
                      <button onClick={() => removeFromLog(entry.id)} style={{ background: "none", border: "none", color: THEME.border, cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 2 }}
                        onMouseEnter={e => e.currentTarget.style.color = THEME.danger}
                        onMouseLeave={e => e.currentTarget.style.color = THEME.border}
                      >×</button>
                    </div>
                  </div>
                );
              })}
              <button onClick={clearLog} style={{ marginTop: 4, width: "100%", padding: 6, background: "none", border: `1px solid ${THEME.dangerBorder}`, borderRadius: 10, color: THEME.danger, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Reset Day
              </button>
            </div>
          )}
        </div>

        {/* Two-col stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>

          {/* Dietary snapshot */}
          <div style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>🥗 Diet</div>
            {profile.eating_patterns?.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {profile.eating_patterns.slice(0, 3).map(p => (
                  <span key={p} style={{ fontSize: 11, color: THEME.primaryDark, background: THEME.primaryLight, borderRadius: 4, padding: "2px 7px", fontWeight: 600 }}>
                    {p.replace(/_/g, " ")}
                  </span>
                ))}
                {profile.eating_patterns.length > 3 && <span style={{ fontSize: 12, color: THEME.textMuted }}>+{profile.eating_patterns.length - 3} more</span>}
              </div>
            ) : (
              <span onClick={() => setEditOpen(true)} style={{ fontSize: 12, color: THEME.primary, cursor: "pointer", fontWeight: 600 }}>Set up →</span>
            )}
          </div>

          {/* Cuisines */}
          <div style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>🍜 Cuisines</div>
            {profile.cuisines?.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {profile.cuisines.slice(0, 4).map(c => (
                  <span key={c} style={{ fontSize: 11, color: THEME.primaryDark, background: THEME.primaryLight, borderRadius: 4, padding: "2px 7px", fontWeight: 600 }}>{c}</span>
                ))}
                {profile.cuisines.length > 4 && <span style={{ fontSize: 12, color: THEME.textMuted }}>+{profile.cuisines.length - 4}</span>}
              </div>
            ) : (
              <span onClick={() => setEditOpen(true)} style={{ fontSize: 12, color: THEME.primary, cursor: "pointer", fontWeight: 600 }}>Set up →</span>
            )}
          </div>

          {/* Avoid */}
          <div style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>🚫 Avoid</div>
            {profile.disliked_ingredients?.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {profile.disliked_ingredients.slice(0, 4).map(i => (
                  <span key={i} style={{ fontSize: 11, color: THEME.danger, background: THEME.dangerSoft, borderRadius: 4, padding: "2px 7px", fontWeight: 600 }}>{i}</span>
                ))}
                {profile.disliked_ingredients.length > 4 && <span style={{ fontSize: 12, color: THEME.textMuted }}>+{profile.disliked_ingredients.length - 4}</span>}
              </div>
            ) : (
              <span onClick={() => setEditOpen(true)} style={{ fontSize: 12, color: THEME.primary, cursor: "pointer", fontWeight: 600 }}>Set up →</span>
            )}
          </div>

          {/* Health Apps */}
          <div style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>🔗 Health Apps</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ id: "apple", logo: "🍎" }, { id: "google", logo: "🟢" }, { id: "samsung", logo: "🔵" }].map(app => {
                const connected = profile.health_connected?.includes(app.id);
                return (
                  <button key={app.id} onClick={() => {
                    openHealthApp(app.id);
                    if (!connected) set("health_connected", [...(profile.health_connected || []), app.id]);
                  }}
                    style={{ flex: 1, padding: "6px 4px", borderRadius: 12, border: `1.5px solid ${connected ? THEME.primary : THEME.border}`, background: connected ? THEME.primaryLight : THEME.surface, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <span style={{ fontSize: 16 }}>{app.logo}</span>
                    <span style={{ fontSize: 8, fontWeight: 700, color: connected ? THEME.primaryDark : THEME.textMuted }}>{connected ? "✓" : "Link"}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Medical conditions — full width if set */}
        {profile.medical_conditions?.length > 0 && (
          <div style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 18, padding: 18, marginBottom: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>🏥 Medical Conditions</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {profile.medical_conditions.map(c => (
                <span key={c} style={{ fontSize: 12, color: THEME.primaryDark, background: THEME.primaryLight, borderRadius: 6, padding: "3px 9px", fontWeight: 600, border: `1px solid ${THEME.primary}55` }}>{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* Empty state CTA */}
        {completion < 40 && (
          <div style={{ background: THEME.surface, border: `2px dashed ${THEME.primary}`, borderRadius: 18, padding: 20, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🌿</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: THEME.text, marginBottom: 6 }}>Complete your profile</div>
            <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 14, lineHeight: 1.5 }}>
              Add your goals, conditions, and dietary preferences for a personalized experience.
            </div>
            <button onClick={() => setEditOpen(true)} style={{ padding: "10px 24px", background: THEME.primaryDark, color: THEME.textOnDark, border: "none", borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
              Set Up Profile
            </button>
          </div>
        )}

      </div>

      {/* ── EDIT PROFILE MODAL (bottom sheet) ── */}
      {editOpen && (
        <div onClick={() => setEditOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 560, background: THEME.surface, borderRadius: "20px 20px 0 0", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>

            {/* Handle + header */}
            <div style={{ padding: "14px 20px 0", flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: THEME.border, borderRadius: 2, margin: "0 auto 14px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, borderBottom: `1px solid ${THEME.border}`, paddingBottom: 14 }}>
                <div style={{ fontSize: 17, fontWeight: 900, color: THEME.text }}>Edit Profile</div>
                <button onClick={() => setEditOpen(false)} style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, borderRadius: 12, width: 30, height: 30, cursor: "pointer", fontSize: 16, color: THEME.textMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
            </div>

            {/* Scrollable form */}
            <div style={{ overflowY: "auto", padding: "0 20px 20px", flex: 1 }}>

              <SectionCard number="1" title="About You" icon="👤">
                <Field label="Full Name">
                  <Input value={profile.name} onChange={v => set("name", sanitizeProfileText(v))} placeholder="Your name" />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <Field label="Height">
                    <div style={{ display: "flex", gap: 6 }}>
                      <Input value={profile.height_ft} onChange={v => set("height_ft", v)} placeholder="ft" type="number" min={3} max={8} />
                      <Input value={profile.height_in} onChange={v => set("height_in", v)} placeholder="in" type="number" min={0} max={11} />
                    </div>
                  </Field>
                  <Field label="Weight">
                    <Input value={profile.weight} onChange={v => set("weight", v)} placeholder="lbs" type="number" min={50} max={700} unit="lbs" />
                  </Field>
                </div>
                <Field label="Sex">
                  <PillGroup multi={false} value={profile.sex} onChange={v => set("sex", v)} options={["Male", "Female", "Non-binary", "Prefer not to say"]} />
                </Field>
              </SectionCard>

              <SectionCard number="2" title="Goals & Dietary Needs" icon="🎯">
                <Field label="Oxalate Goal" hint="Strict = <50mg/day · Moderate = 50–100mg/day">
                  <PillGroup multi={false} value={profile.oxalate_goal} onChange={v => set("oxalate_goal", v)}
                    options={[
                      { value: "strict", label: "Strict <50mg" },
                      { value: "moderate", label: "Moderate 50–100mg" },
                      { value: "custom", label: "Custom" },
                    ]}
                  />
                  {profile.oxalate_goal === "custom" && (
                    <div style={{ marginTop: 10 }}>
                      <Input value={profile.custom_oxalate_limit} onChange={v => set("custom_oxalate_limit", v)} placeholder="e.g. 75" type="number" min={0} max={999} unit="mg/day" />
                    </div>
                  )}
                </Field>
                <Field label="Dietary Style">
                  <PillGroup value={profile.dietary_needs} onChange={v => set("dietary_needs", v)}
                    options={["Gluten-Free", "Dairy-Free", "Vegan", "Vegetarian", "Keto", "Paleo", "Halal", "Kosher", "Low-Sodium", "Low-Sugar"]}
                  />
                </Field>
              </SectionCard>

              <SectionCard number="3" title="Medical Conditions" icon="🏥">
                <Field label="Relevant conditions" hint="Helps personalize recommendations">
                  <PillGroup value={profile.medical_conditions} onChange={v => set("medical_conditions", v)}
                    options={["Kidney Stones", "Crohn's Disease", "IBS", "Celiac Disease", "Type 2 Diabetes", "Hypertension", "Gout", "Hyperoxaluria", "Osteoporosis", "Other"]}
                  />
                </Field>
              </SectionCard>

              <SectionCard number="4" title="Cuisines You Love" icon="🍜">
                <Field label="Pick your favorites">
                  <PillGroup value={profile.cuisines} onChange={v => set("cuisines", v)}
                    options={["American", "Mexican", "Japanese", "Korean", "Chinese", "Thai", "Italian", "Mediterranean", "Persian", "Indian", "Caribbean", "Vietnamese", "Ethiopian", "French"]}
                  />
                </Field>
              </SectionCard>

              <SectionCard number="5" title="Ingredients to Avoid" icon="🚫">
                <Field label="We'll flag these in recommendations">
                  <TagInput tags={profile.disliked_ingredients} onChange={v => set("disliked_ingredients", v)}
                    placeholder="e.g. beets, spinach, tofu…"
                    suggestions={["Spinach", "Beets", "Almonds", "Peanuts", "Rhubarb", "Swiss chard", "Sweet potato", "Chocolate", "Black tea", "Tofu", "Soy milk", "Okra"]}
                  />
                </Field>
              </SectionCard>

              <SectionCard number="6" title="Eating Patterns" icon="🔄">
                <Field label="How do you typically eat?">
                  <PillGroup value={profile.eating_patterns} onChange={v => set("eating_patterns", v)}
                    options={[
                      { value: "intermittent_fasting", label: "Intermittent Fasting" },
                      { value: "time_restricted", label: "Time-Restricted" },
                      { value: "grazing", label: "Grazing" },
                      { value: "3_meals", label: "3 Structured Meals" },
                      { value: "meal_prep", label: "Meal Prep" },
                      { value: "eating_out", label: "Frequent Dining Out" },
                      { value: "skips_breakfast", label: "Skips Breakfast" },
                      { value: "mindful", label: "Mindful Eating" },
                    ]}
                  />
                </Field>
              </SectionCard>

              <SectionCard number="7" title="Meals Per Day" icon="🍽">
                <Field label="How many meals/eating occasions per day?">
                  <div style={{ textAlign: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 48, fontWeight: 900, color: THEME.primary, lineHeight: 1 }}>{profile.meals_per_day}</div>
                  </div>
                  <input type="range" min={2} max={5} step={1} value={profile.meals_per_day}
                    onChange={e => set("meals_per_day", parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: THEME.primary, marginBottom: 10 }}
                  />
                </Field>
              </SectionCard>

              <SectionCard number="8" title="Location" icon="📍">
                <Field label="Your area">
                  <PillGroup multi={false} value={profile.location} onChange={v => set("location", v)}
                    options={["Pasadena", "Highland Park", "South Pasadena", "Eagle Rock", "San Marino", "Hastings Ranch", "Other"]}
                  />
                </Field>
              </SectionCard>

              {saveError && (
                <div style={{ background: THEME.dangerSoft, border: `1px solid ${THEME.dangerBorder}`, borderRadius: 14, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: THEME.danger, fontWeight: 600 }}>
                  {saveError}
                </div>
              )}

              <button onClick={saveProfile} style={{
                width: "100%", padding: 15,
                background: saved ? THEME.primary : THEME.primaryDark,
                color: THEME.textOnDark, border: "none", borderRadius: 18,
                fontSize: 16, fontWeight: 800, cursor: "pointer",
                transition: "all 0.2s", marginTop: 8
              }}>
                {saved ? "✓ Saved!" : "Save Profile"}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
