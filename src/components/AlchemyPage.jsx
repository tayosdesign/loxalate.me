import React, { useState, useEffect } from "react";

// ============================================================================
// LOxalate — AlchemyPage component
// ----------------------------------------------------------------------------
// Standalone, GitHub-ready slice of a kidney-stone/oxalate diet app.
// All UI tokens live in the THEME constant below. Recipe data is inline
// so this file is fully self-contained.
//
// Persistence uses localStorage with these keys:
//   - "alchemy-saved-recipes-v1"  → { [recipeId]: true } for favourited recipes
//   - "alchemy-my-recipes-v1"     → user-built recipe array
//
// Drop-in usage:
//   import AlchemyPage from "./AlchemyPage";
//   <AlchemyPage addToLog={(item) => ...} onNavigate={(page) => ...} />
// ============================================================================

// THEME — Health & Wellness palette
// ----------------------------------------------------------------------------
// Derived from the loxalate_color_palette: soft cream, deep charcoal, sage,
// muted terracotta, warm sand. Tints (primaryLight, border, dangerSoft,
// dangerBorder) are pre-mixed to avoid alpha hacks in the JSX below.
const THEME = {
  bg:           "#FDFBF7",   // Soft Cream — page bg
  surface:      "#FFFFFF",   // pure white card surface
  text:         "#1A1A1A",   // Deep Charcoal — hero, titles, primary buttons
  textMuted:    "#6E6862",   // muted body text
  primary:      "#8DAA91",   // Sage Green — primary accent, success
  primaryLight: "#E8EFE9",   // pale sage — chip bg, selected bg
  border:       "#E5DDD0",   // desaturated sand — card borders
  warmSand:     "#E5D3B3",   // Warm Sand — tip/warning accent
  danger:       "#D17A5D",   // Muted Terracotta — danger, "avoid" chips
  dangerSoft:   "#FBEEE8",   // pale terracotta — danger card bg
  dangerBorder: "#E3A78F",   // terracotta border
};

// Map recipe `tag` strings to wellness-palette colors (overrides the blue
// `tagColor` values still living in the recipe data — those are preserved
// so you can easily fork the data file later).
function getTagColor(tag) {
  switch (tag) {
    case "Doctor Recommended":       return THEME.primary;   // sage
    case "Kidney Dietitian Approved":return "#7A6843";       // sand-brown
    case "Urology Foundation":       return "#A47A56";       // warm brown
    case "My Recipe":                return THEME.textMuted;
    default:                         return THEME.primary;
  }
}

// Map oxalate mg to a color from the wellness palette.
//   ≤ 8mg  → sage          (low / safe)
//   ≤ 15mg → light sage    (low-medium)
//   ≤ 25mg → warm sand     (medium — be aware)
//   > 25mg → terracotta    (high — caution)
function oxColor(mg) {
  if (mg <= 8)  return THEME.primary;
  if (mg <= 15) return "#B5C7A6";
  if (mg <= 25) return "#D6B47A";
  return THEME.danger;
}

// Builder uses the same scale (separate fn for future divergence)
function builderOxColor(mg) {
  if (mg <= 8)  return THEME.primary;
  if (mg <= 15) return "#B5C7A6";
  if (mg <= 25) return "#D6B47A";
  return THEME.danger;
}

// ============================================================================
// Recipe data — 15 evidence-based recipes pulled from NKF, NIDDK, Urology Care
// Foundation, and registered dietitians who specialise in kidney stone diet.
// ============================================================================

const ALCHEMY_RECIPES = [
  // ── BREAKFAST ──────────────────────────────────────────────────────────────
  {
    id: "r1",
    title: "Calcium-Paired Scrambled Eggs",
    category: "Breakfast",
    tag: "Doctor Recommended",
    tagColor: "#7AAFD4",
    source: "National Kidney Foundation",
    sourceUrl: "https://www.kidney.org",
    totalOxalate: 3,
    prepTime: "10 min",
    servings: 1,
    whyItWorks: "Pairing dairy calcium with your meal binds oxalate in the gut before it reaches the kidneys — a strategy backed by a landmark Borghi et al. clinical trial showing 49% fewer stones.",
    ingredients: [
      { name: "Eggs", amount: "3 large", oxalate: 0 },
      { name: "Whole milk", amount: "2 tbsp", oxalate: 0 },
      { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
      { name: "Butter", amount: "1 tbsp", oxalate: 0 },
      { name: "White toast", amount: "2 slices", oxalate: 2 },
      { name: "Lemon water (8 oz)", amount: "1 glass", oxalate: 1 },
    ],
    steps: [
      "Whisk eggs with milk and a pinch of salt.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in egg mixture and stir slowly until just set — remove from heat slightly underdone.",
      "Top with cheddar, serve with white toast.",
      "Drink lemon water alongside — citrate in lemon helps prevent stone formation.",
    ],
    tips: "The milk + cheese provides ~300mg calcium which binds oxalate in your gut. Always pair calcium with meals, not supplements.",
  },
  {
    id: "r2",
    title: "Kefir Banana Smoothie",
    category: "Breakfast",
    tag: "Kidney Dietitian Approved",
    tagColor: "#0284c7",
    source: "Jill Harris RD — Kidney Stone Diet",
    sourceUrl: "https://kidneystonediet.com",
    totalOxalate: 6,
    prepTime: "5 min",
    servings: 1,
    whyItWorks: "Kefir is lactose-free drinkable yogurt — a calcium powerhouse recommended by nephrologists for patients who struggle with dairy. Banana is naturally low oxalate and high in potassium which inhibits stone formation.",
    ingredients: [
      { name: "Plain kefir", amount: "1 cup", oxalate: 0 },
      { name: "Banana (ripe)", amount: "1 medium", oxalate: 5 },
      { name: "Honeydew melon", amount: "½ cup", oxalate: 1 },
      { name: "Ice cubes", amount: "4–5 cubes", oxalate: 0 },
    ],
    steps: [
      "Add kefir to blender first.",
      "Add banana (frozen works great for creamier texture), honeydew, and ice.",
      "Blend on high for 30 seconds.",
      "Drink immediately — kefir's calcium counts toward your daily 1,000mg goal.",
    ],
    tips: "Nephrologist Dr. Fred Coe recommends 1,000–1,200mg calcium daily from food, spread across meals. This smoothie delivers ~300mg in one go.",
  },
  {
    id: "r3",
    title: "Cauliflower & Egg White Omelet",
    category: "Breakfast",
    tag: "Urology Foundation",
    tagColor: "#7c3aed",
    source: "Urology Care Foundation Cookbook",
    sourceUrl: "https://www.urologyhealth.org",
    totalOxalate: 5,
    prepTime: "12 min",
    servings: 1,
    whyItWorks: "Cauliflower is one of the best low-oxalate vegetables — just 2mg per cup. The Urology Care Foundation specifically calls it out as a spinach replacement. Egg whites add protein without any oxalate.",
    ingredients: [
      { name: "Egg whites", amount: "4 large", oxalate: 0 },
      { name: "Cauliflower florets (chopped fine)", amount: "½ cup", oxalate: 1 },
      { name: "Red bell pepper", amount: "¼ cup", oxalate: 1 },
      { name: "Mushrooms (sliced)", amount: "¼ cup", oxalate: 1 },
      { name: "Mozzarella cheese", amount: "1 oz", oxalate: 0 },
      { name: "Olive oil", amount: "1 tsp", oxalate: 0 },
      { name: "Fresh herbs (parsley, chives)", amount: "1 tbsp", oxalate: 1 },
    ],
    steps: [
      "Sauté cauliflower, bell pepper, and mushrooms in olive oil over medium heat for 4–5 min until soft.",
      "Whisk egg whites with a pinch of salt.",
      "Push vegetables to the side, pour in egg whites.",
      "When edges set, add mozzarella and vegetables on one half.",
      "Fold omelet in half, slide onto plate, top with fresh herbs.",
    ],
    tips: "Bok choy and cauliflower are the two best spinach substitutes per the Urology Foundation — both under 3mg oxalate per cup cooked.",
  },

  // ── LUNCH ──────────────────────────────────────────────────────────────────
  {
    id: "r4",
    title: "Salmon & Bok Choy Rice Bowl",
    category: "Lunch",
    tag: "Doctor Recommended",
    tagColor: "#7AAFD4",
    source: "Urology Care Foundation Cookbook",
    sourceUrl: "https://www.urologyhealth.org",
    totalOxalate: 9,
    prepTime: "20 min",
    servings: 2,
    whyItWorks: "The Urology Foundation cookbook specifically recommends bok choy as a kidney-stone-safe green, calling it 'great substitute for high-oxalate spinach.' Salmon provides omega-3s with zero oxalate.",
    ingredients: [
      { name: "Salmon fillets", amount: "2 × 5 oz", oxalate: 0 },
      { name: "Bok choy (chopped)", amount: "2 cups", oxalate: 4 },
      { name: "White jasmine rice (cooked)", amount: "1 cup", oxalate: 4 },
      { name: "Garlic (minced)", amount: "2 cloves", oxalate: 0 },
      { name: "Low-sodium chicken broth", amount: "¼ cup", oxalate: 0 },
      { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
      { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
      { name: "Seasoning blend (no-salt)", amount: "1 tsp", oxalate: 0 },
    ],
    steps: [
      "Brush salmon with olive oil and seasoning blend.",
      "Heat pan over medium-high, cook salmon 4 min per side. Set aside.",
      "In same pan, add garlic, bok choy, and broth. Stir-fry 3–5 min until leaves are soft but still have crunch.",
      "Plate rice, top with bok choy, then salmon.",
      "Squeeze lemon juice over everything before serving.",
    ],
    tips: "Low-sodium is key — NIDDK notes that excess sodium causes your kidneys to release calcium into urine, raising stone risk. Target under 2,300mg sodium daily.",
  },
  {
    id: "r5",
    title: "Cauliflower Rice Stir-Fry with Chicken",
    category: "Lunch",
    tag: "Kidney Dietitian Approved",
    tagColor: "#0284c7",
    source: "Melanie Betz MS RD — The Kidney Dietitian",
    sourceUrl: "https://www.thekidneydietitian.org",
    totalOxalate: 8,
    prepTime: "18 min",
    servings: 2,
    whyItWorks: "Cauliflower rice is called out by kidney RDs as an ideal grain substitute — high fiber, low oxalate, filling. The Urology Foundation notes 'broccoli rice is an interesting twist' — same concept applies here.",
    ingredients: [
      { name: "Cauliflower (riced)", amount: "2 cups", oxalate: 4 },
      { name: "Chicken breast (diced)", amount: "6 oz", oxalate: 0 },
      { name: "Eggs", amount: "2 large", oxalate: 0 },
      { name: "Red bell pepper (diced)", amount: "½ cup", oxalate: 2 },
      { name: "Zucchini (diced)", amount: "½ cup", oxalate: 1 },
      { name: "Garlic", amount: "2 cloves", oxalate: 0 },
      { name: "Low-sodium soy sauce", amount: "1 tbsp", oxalate: 1 },
      { name: "Sesame oil", amount: "1 tsp", oxalate: 0 },
      { name: "Scallions", amount: "2 tbsp", oxalate: 0 },
    ],
    steps: [
      "Cook diced chicken in a hot wok with a splash of oil until golden. Remove and set aside.",
      "Add garlic, bell pepper, and zucchini — stir-fry 3 min.",
      "Push veggies to the side, scramble eggs in the open space.",
      "Add cauliflower rice, chicken back in, soy sauce and sesame oil.",
      "Toss everything together on high heat for 2–3 min.",
      "Top with scallions and serve immediately.",
    ],
    tips: "Use low-sodium soy sauce — kidney stone RDs consistently flag sodium as a bigger driver of stones than oxalate for most patients.",
  },
  {
    id: "r6",
    title: "Black-Eyed Pea & Chicken Soup",
    category: "Lunch",
    tag: "Urology Foundation",
    tagColor: "#7c3aed",
    source: "Urology Care Foundation Cookbook",
    sourceUrl: "https://www.urologyhealth.org",
    totalOxalate: 14,
    prepTime: "30 min",
    servings: 4,
    whyItWorks: "The Urology Foundation specifically recommends black-eyed peas as 'a low-oxalate bean, great to use' for kidney stone prevention. Most beans are high oxalate — black-eyed peas are the rare exception.",
    ingredients: [
      { name: "Black-eyed peas (canned, rinsed)", amount: "1 can (15 oz)", oxalate: 8 },
      { name: "Chicken breast (cubed)", amount: "8 oz", oxalate: 0 },
      { name: "Low-sodium chicken broth", amount: "4 cups", oxalate: 0 },
      { name: "Celery (diced)", amount: "2 stalks", oxalate: 2 },
      { name: "Carrots (diced)", amount: "½ cup", oxalate: 2 },
      { name: "Onion (diced)", amount: "½ cup", oxalate: 1 },
      { name: "Garlic", amount: "3 cloves", oxalate: 0 },
      { name: "Bay leaf", amount: "1 leaf", oxalate: 0 },
      { name: "Fresh parsley", amount: "2 tbsp", oxalate: 1 },
    ],
    steps: [
      "Sauté onion, celery, carrots, and garlic in a large pot with olive oil for 5 min.",
      "Add chicken cubes, cook 3–4 min until no longer pink.",
      "Pour in broth and black-eyed peas. Add bay leaf.",
      "Simmer on medium-low for 20 min.",
      "Remove bay leaf, top with fresh parsley and serve.",
      "Pair with a glass of milk or yogurt on the side for calcium binding.",
    ],
    tips: "Serve with 8oz milk or calcium-fortified beverage — pairing calcium with your meal is the #1 most evidence-backed strategy per the National Kidney Foundation.",
  },

  // ── DINNER ─────────────────────────────────────────────────────────────────
  {
    id: "r7",
    title: "Low-Oxalate Meatballs with White Pasta",
    category: "Dinner",
    tag: "Kidney Stone Diet RD",
    tagColor: "#7AAFD4",
    source: "Jill Harris RD — Kidney Stone Diet",
    sourceUrl: "https://kidneystonediet.com",
    totalOxalate: 11,
    prepTime: "35 min",
    servings: 4,
    whyItWorks: "Jill Harris RD notes this dish is 'very low oxalate, yet satisfying and filling.' Ground beef has zero oxalate. White pasta is dramatically lower than whole wheat. Parmesan adds both flavor and calcium.",
    ingredients: [
      { name: "Ground beef (85/15)", amount: "1 lb", oxalate: 0 },
      { name: "Egg", amount: "1 large", oxalate: 0 },
      { name: "Breadcrumbs (white)", amount: "¼ cup", oxalate: 1 },
      { name: "Parmesan (grated)", amount: "3 tbsp", oxalate: 0 },
      { name: "Garlic (minced)", amount: "2 cloves", oxalate: 0 },
      { name: "White pasta (cooked)", amount: "2 cups", oxalate: 10 },
      { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
      { name: "Low-sodium chicken broth", amount: "¼ cup", oxalate: 0 },
      { name: "Fresh basil", amount: "4 leaves", oxalate: 0 },
    ],
    steps: [
      "Preheat oven to 400°F.",
      "Mix ground beef, egg, breadcrumbs, parmesan, garlic, and a pinch of salt. Form into 12 balls.",
      "Place on a lined baking sheet, bake 18–20 min until cooked through.",
      "Cook pasta per package directions — white pasta only.",
      "Toss pasta with olive oil, broth, and a little parmesan.",
      "Serve meatballs over pasta, top with fresh basil and extra parmesan.",
    ],
    tips: "Feta cheese is a great swap for parmesan — Jill Harris suggests it for a 'nice Greek flair' while keeping calcium high. Skip tomato sauce — it adds ~14mg oxalate per serving.",
  },
  {
    id: "r8",
    title: "Three-Cheese White Lasagna",
    category: "Dinner",
    tag: "Urology Foundation",
    tagColor: "#7c3aed",
    source: "Urology Care Foundation Cookbook",
    sourceUrl: "https://www.urologyhealth.org",
    totalOxalate: 16,
    prepTime: "55 min",
    servings: 6,
    whyItWorks: "The Urology Foundation cookbook features this exact concept — white sauce lasagna eliminates tomato (14mg oxalate per ½ cup) while three cheeses deliver heavy calcium. A crowd-pleasing stone-prevention meal.",
    ingredients: [
      { name: "Lasagna noodles (white)", amount: "9 sheets", oxalate: 10 },
      { name: "Ricotta cheese", amount: "15 oz", oxalate: 0 },
      { name: "Mozzarella (shredded)", amount: "2 cups", oxalate: 0 },
      { name: "Parmesan (grated)", amount: "½ cup", oxalate: 0 },
      { name: "Eggs", amount: "2 large", oxalate: 0 },
      { name: "Butter", amount: "3 tbsp", oxalate: 0 },
      { name: "White flour", amount: "3 tbsp", oxalate: 1 },
      { name: "Whole milk", amount: "2 cups", oxalate: 2 },
      { name: "Garlic", amount: "2 cloves", oxalate: 0 },
      { name: "Zucchini (thin sliced)", amount: "1 medium", oxalate: 3 },
    ],
    steps: [
      "Preheat oven to 375°F. Cook lasagna noodles, drain.",
      "Make white sauce: melt butter, whisk in flour, slowly add milk, stir until thickened. Add garlic, salt, half the parmesan.",
      "Mix ricotta, eggs, and a pinch of nutmeg in a bowl.",
      "Layer: white sauce → noodles → ricotta mix → zucchini → mozzarella. Repeat twice.",
      "Top layer: noodles → white sauce → mozzarella → remaining parmesan.",
      "Cover with foil, bake 35 min. Uncover, bake 10 more min until golden.",
      "Rest 10 min before cutting.",
    ],
    tips: "This delivers ~400mg calcium per serving from the three cheeses — hitting a third of your daily 1,200mg target in one meal.",
  },
  {
    id: "r9",
    title: "Persian Herb Chicken (Joojeh Style)",
    category: "Dinner",
    tag: "Low Oxalate Living",
    tagColor: "#2C5282",
    source: "Low Oxalate Living Community",
    sourceUrl: "https://loxalate.me",
    totalOxalate: 7,
    prepTime: "25 min + 1hr marinate",
    servings: 2,
    whyItWorks: "Inspired by local Pasadena Persian restaurants. Saffron, yogurt, and lemon marinade with zero oxalate. Paired with basmati white rice — a naturally low-oxalate grain — and plain yogurt for calcium binding.",
    ingredients: [
      { name: "Chicken breast", amount: "2 × 6 oz", oxalate: 0 },
      { name: "Plain yogurt", amount: "3 tbsp", oxalate: 0 },
      { name: "Lemon juice", amount: "2 tbsp", oxalate: 2 },
      { name: "Saffron (pinch, bloomed in 1 tbsp hot water)", amount: "pinch", oxalate: 0 },
      { name: "Garlic (minced)", amount: "2 cloves", oxalate: 0 },
      { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
      { name: "Basmati white rice (cooked)", amount: "1 cup", oxalate: 4 },
      { name: "Butter pat", amount: "½ tbsp", oxalate: 0 },
      { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
    ],
    steps: [
      "Mix yogurt, lemon juice, saffron water, garlic, olive oil, and salt. Add chicken and marinate at least 1 hour (overnight is better).",
      "Grill or broil chicken 6–7 min per side until charred and cooked through.",
      "Serve over saffron-tinted basmati rice with a butter pat on top.",
      "Add grilled tomato on the side.",
      "Serve with extra yogurt as a sauce — adds calcium to the meal.",
    ],
    tips: "The yogurt marinade serves double duty: it tenderizes the chicken AND provides calcium. NIDDK specifically recommends yogurt as a calcium source to pair with meals.",
  },
  {
    id: "r10",
    title: "Jerk Chicken & Plantain Rice Bowl",
    category: "Dinner",
    tag: "Low Oxalate Living",
    tagColor: "#2C5282",
    source: "Low Oxalate Living Community",
    sourceUrl: "https://loxalate.me",
    totalOxalate: 11,
    prepTime: "30 min",
    servings: 2,
    whyItWorks: "Caribbean-inspired, celebrating the diversity of Pasadena. Jerk seasoning is a dry rub — no high-oxalate sauces. Ripe plantain has ~4mg oxalate per serving, making it a safe tropical carb alongside white rice.",
    ingredients: [
      { name: "Chicken thighs (bone-in)", amount: "2 large", oxalate: 0 },
      { name: "Jerk dry rub (allspice, thyme, garlic powder, cayenne, brown sugar)", amount: "1 tbsp", oxalate: 1 },
      { name: "White rice (cooked)", amount: "1 cup", oxalate: 4 },
      { name: "Ripe plantain (sliced)", amount: "½ medium", oxalate: 4 },
      { name: "Cabbage slaw (shredded)", amount: "½ cup", oxalate: 2 },
      { name: "Lime juice", amount: "1 tbsp", oxalate: 1 },
      { name: "Butter", amount: "½ tbsp", oxalate: 0 },
    ],
    steps: [
      "Coat chicken thighs with jerk dry rub. Let sit 30 min or overnight.",
      "Grill chicken over medium-high heat 8–10 min per side until cooked through and skin is crispy.",
      "Fry plantain slices in butter 2 min per side until golden and soft.",
      "Toss cabbage slaw with lime juice and a pinch of salt.",
      "Plate white rice, top with chicken, plantain on the side, slaw on top.",
    ],
    tips: "Pair with a glass of whole milk or calcium-fortified coconut milk — the lime and spices can be mildly acidic, so calcium binding helps here.",
  },

  // ── SNACKS & SIDES ─────────────────────────────────────────────────────────
  {
    id: "r11",
    title: "Cauliflower Mash (Potato Substitute)",
    category: "Side",
    tag: "Kidney Stone Diet RD",
    tagColor: "#7AAFD4",
    source: "Jill Harris RD — Kidney Stone Diet",
    sourceUrl: "https://kidneystonediet.com",
    totalOxalate: 4,
    prepTime: "15 min",
    servings: 2,
    whyItWorks: "Jill Harris RD created this specifically because 'patients are constantly telling me that they miss mashed potatoes.' A baked potato has 97mg oxalate — cauliflower mash has just 2mg per cup.",
    ingredients: [
      { name: "Cauliflower head (florets)", amount: "1 medium", oxalate: 4 },
      { name: "Roasted garlic", amount: "3 cloves", oxalate: 0 },
      { name: "Low-sodium vegetable stock", amount: "¼ cup", oxalate: 0 },
      { name: "Butter", amount: "2 tbsp", oxalate: 0 },
      { name: "Parmesan (grated)", amount: "2 tbsp", oxalate: 0 },
    ],
    steps: [
      "Steam cauliflower florets until very tender, about 10–12 min.",
      "Drain thoroughly — removing excess water is key to fluffy texture.",
      "Add to food processor with roasted garlic, butter, stock, and parmesan.",
      "Blend until smooth and fluffy. Season with salt to taste.",
      "Top with a drizzle of olive oil and fresh chives.",
    ],
    tips: "The Urology Foundation also adds cannellini beans for extra protein and fiber — just note beans add ~5mg oxalate per ¼ cup.",
  },
  {
    id: "r12",
    title: "Yogurt & Melon Snack Bowl",
    category: "Snack",
    tag: "NKF Approved",
    tagColor: "#7AAFD4",
    source: "National Kidney Foundation",
    sourceUrl: "https://www.kidney.org",
    totalOxalate: 5,
    prepTime: "5 min",
    servings: 1,
    whyItWorks: "The NKF recommends 3 servings of dairy daily to hit 1,000–1,200mg calcium. Cantaloupe and honeydew are among the lowest-oxalate fruits (~2mg per cup) and are high in potassium which inhibits stone formation.",
    ingredients: [
      { name: "Plain Greek yogurt", amount: "¾ cup", oxalate: 0 },
      { name: "Cantaloupe (cubed)", amount: "½ cup", oxalate: 2 },
      { name: "Honeydew (cubed)", amount: "½ cup", oxalate: 3 },
      { name: "Honey drizzle", amount: "1 tsp", oxalate: 0 },
    ],
    steps: [
      "Spoon yogurt into a bowl.",
      "Top with cantaloupe and honeydew cubes.",
      "Drizzle with honey.",
      "Eat immediately — this counts as one of your three daily calcium servings.",
    ],
    tips: "This delivers ~200mg calcium. NKF recommends spreading calcium across all three meals rather than getting it all at once for maximum oxalate binding.",
  },
];

const ALCHEMY_CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Side", "Snack"];

export default function AlchemyPage({ addToLog = () => {}, onNavigate = () => {} }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe]     = useState(null);
  const [savedRecipes, setSavedRecipes]         = useState({});
  const [loadingSaved, setLoadingSaved]         = useState(true);
  const [loggedRecipes, setLoggedRecipes]       = useState({});

  function addRecipeToLog(recipe) {
    addToLog({
      dish: recipe.title,
      restaurantName: recipe.source,
      total: recipe.totalOxalate,
    });
    // Flash confirmation for 2s
    setLoggedRecipes(prev => ({ ...prev, [recipe.id]: true }));
    setTimeout(() => setLoggedRecipes(prev => ({ ...prev, [recipe.id]: false })), 2000);
  }

  useEffect(() => {
    (() => {
      try {
        const r = localStorage.getItem("alchemy-saved-recipes-v1");
        if (r) setSavedRecipes(JSON.parse(r));
      } catch (_) {}
      setLoadingSaved(false);
    })();
  }, []);

  function toggleSave(recipeId) {
    const updated = { ...savedRecipes, [recipeId]: !savedRecipes[recipeId] };
    if (!updated[recipeId]) delete updated[recipeId];
    setSavedRecipes(updated);
    try { localStorage.setItem("alchemy-saved-recipes-v1", JSON.stringify(updated)); } catch (_) {}
  }
  // ── Builder state ─────────────────────────────────────────────────────────
  const [showBuilder, setShowBuilder]               = useState(false);
  const [builderName, setBuilderName]               = useState("");
  const [builderCategory, setBuilderCategory]       = useState("Dinner");
  const [builderServings, setBuilderServings]       = useState(2);
  const [builderSteps, setBuilderSteps]             = useState([""]);
  const [builderTip, setBuilderTip]                 = useState("");
  const [builderError, setBuilderError]             = useState("");
  const [builderSaved, setBuilderSaved]             = useState(false);
  const [myRecipes, setMyRecipes]                   = useState([]);
  const [selectedMyRecipe, setSelectedMyRecipe]     = useState(null);
  const [builderIngInput, setBuilderIngInput]       = useState("");
  const [builderIngredients, setBuilderIngredients] = useState([
    { name: "", amount: "", oxalate: "" }
  ]);

  useEffect(() => {
    (() => {
      try {
        const m = localStorage.getItem("alchemy-my-recipes-v1");
        if (m) setMyRecipes(JSON.parse(m));
      } catch (_) {}
    })();
  }, []);

  const INGREDIENT_SUGGESTIONS = [
    "Chicken breast","Salmon","Beef (ground)","Lamb","Shrimp","Eggs","Turkey breast","Cod",
    "White rice","White pasta","Cauliflower","Zucchini","Cucumber","Romaine lettuce","Bok choy",
    "Mushrooms","Avocado","Banana","Cantaloupe","Apple (peeled)","Garlic","Onion","Red bell pepper",
    "Butter","Olive oil","Parmesan","Mozzarella","Cheddar","Yogurt (plain)","Milk","Lemon juice",
    "Low-sodium soy sauce","Ginger","Scallions","Basmati rice","Corn tortilla","White bread",
    "Asparagus","Yellow squash","Celery","Carrots",
  ];

  function addIngRow() { setBuilderIngredients(p => [...p, { name: "", amount: "", oxalate: "" }]); }
  function removeIngRow(i) { setBuilderIngredients(p => p.filter((_, idx) => idx !== i)); }
  function updateIng(i, field, val) {
    setBuilderIngredients(p => p.map((ing, idx) => idx !== i ? ing : {
      ...ing,
      [field]: field === "oxalate" ? val.replace(/[^0-9]/g,"") : val.slice(0,120)
    }));
  }
  function addStep() { setBuilderSteps(p => [...p, ""]); }
  function removeStep(i) { setBuilderSteps(p => p.filter((_,idx) => idx !== i)); }
  function updateStep(i, val) { setBuilderSteps(p => p.map((s,idx) => idx === i ? val.slice(0,300) : s)); }

  const builderTotal = builderIngredients.reduce((sum, i) => sum + (parseInt(i.oxalate)||0), 0);

  const rlSave = { ts: [] };
  function checkBuildRateLimit() {
    const now = Date.now();
    rlSave.ts = rlSave.ts.filter(t => now - t < 60000);
    if (rlSave.ts.length >= 5) return false;
    rlSave.ts.push(now); return true;
  }

  function saveMyRecipe() {
    setBuilderError("");
    const cleanName = builderName.trim().slice(0,80);
    const validIngs = builderIngredients.filter(i => i.name.trim());
    const validSteps = builderSteps.filter(s => s.trim());
    if (!cleanName)          { setBuilderError("Give your recipe a name."); return; }
    if (!validIngs.length)   { setBuilderError("Add at least one ingredient."); return; }
    if (!validSteps.length)  { setBuilderError("Add at least one step."); return; }
    if (!checkBuildRateLimit()) { setBuilderError("⏱ Slow down — max 5 saves per minute."); return; }

    const newRecipe = {
      id: "my_" + Date.now(),
      title: cleanName,
      category: builderCategory,
      servings: builderServings,
      totalOxalate: builderTotal,
      tag: "My Recipe",
      tagColor: THEME.textMuted,
      source: "Your Kitchen",
      prepTime: "Your timing",
      ingredients: validIngs.map(i => ({
        name: i.name.trim().slice(0,80),
        amount: i.amount.trim().slice(0,40),
        oxalate: parseInt(i.oxalate)||0
      })),
      steps: validSteps,
      tips: builderTip.trim().slice(0,300) || "Your personal note goes here.",
      whyItWorks: "Your own creation — track the total oxalate and adjust to hit your daily goal.",
      createdAt: new Date().toISOString(),
    };

    const updated = [newRecipe, ...myRecipes];
    setMyRecipes(updated);
    try { localStorage.setItem("alchemy-my-recipes-v1", JSON.stringify(updated)); } catch (_) {}

    setBuilderSaved(true);
    setTimeout(() => {
      setBuilderSaved(false); setShowBuilder(false);
      setBuilderName(""); setBuilderTip(""); setBuilderSteps([""]); setBuilderError("");
      setBuilderIngredients([{ name:"", amount:"", oxalate:"" }]);
    }, 1800);
  }

  function deleteMyRecipe(id) {
    const updated = myRecipes.filter(r => r.id !== id);
    setMyRecipes(updated);
    try { localStorage.setItem("alchemy-my-recipes-v1", JSON.stringify(updated)); } catch (_) {}
    setSelectedMyRecipe(null);
  }

  const filtered = selectedCategory === "All"
    ? ALCHEMY_RECIPES
    : ALCHEMY_RECIPES.filter(r => r.category === selectedCategory);

  return (
    <div style={{ background: THEME.bg, minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{
        background: THEME.text,
        padding: "28px 20px 32px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -40, right: -20, width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 6 }}>
            LOW OXALATE LIVING
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#FFFFFF", lineHeight: 1.1, marginBottom: 8 }}>
            Alchemy 🧪
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, maxWidth: 320 }}>
            Recipes backed by nephrologists, RDs, and kidney stone dietitians — not just food blogs.
          </div>
          {/* Source badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {[
              "Nat'l Kidney Foundation",
              "NIDDK",
              "Urology Care Foundation",
              "Kidney Stone Diet RD",
            ].map(label => (
              <span key={label} style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999,
                background: "rgba(255,255,255,0.12)", color: THEME.bg,
                border: "1px solid rgba(255,255,255,0.2)", whiteSpace: "nowrap"
              }}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Clinical note ── */}
      <div style={{ margin: "0 16px", marginTop: -16, position: "relative", zIndex: 10 }}>
        <div style={{
          background: "#FFFFFF", borderRadius: 16, padding: "12px 14px",
          border: `1px solid ${THEME.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
        }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: THEME.primary, marginBottom: 4 }}>
            🔬 Evidence-Based Approach
          </div>
          <div style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.6 }}>
            80% of kidney stones are calcium-oxalate. The Borghi et al. clinical trial found that pairing <strong>calcium with meals</strong> — not a strict low-oxalate diet — reduced recurrence by 49%. Every recipe here applies this principle.
          </div>
        </div>
      </div>

      {/* ── Category filter ── */}
      <div style={{ padding: "16px 16px 0", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
          {ALCHEMY_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700,
              border: `1.5px solid ${selectedCategory === cat ? THEME.primary : THEME.textMuted}`,
              background: selectedCategory === cat ? THEME.primary : "#FFFFFF",
              color: selectedCategory === cat ? "#FFFFFF" : THEME.textMuted,
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.15s"
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* ── Recipe count ── */}
      <div style={{ padding: "10px 18px 4px", fontSize: 14, color: THEME.textMuted, fontWeight: 600 }}>
        {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} · tap to open
      </div>

      {/* ── Recipe cards ── */}
      <div style={{ padding: "10px 18px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(recipe => {
          const isSaved = !!savedRecipes[recipe.id];
          const col = oxColor(recipe.totalOxalate);
          return (
            <div key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              style={{
                background: "#FFFFFF", borderRadius: 18,
                border: `1px solid ${THEME.textMuted}`,
                overflow: "hidden", cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "transform 0.15s, box-shadow 0.15s"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              {/* Color bar top */}
              <div style={{ height: 4, background: col }} />

              <div style={{ padding: "14px 14px 12px" }}>
                {/* Top row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    {/* Tag */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 999,
                        background: getTagColor(recipe.tag) + "18", color: getTagColor(recipe.tag),
                        border: `1px solid ${getTagColor(recipe.tag)}44`, textTransform: "uppercase", letterSpacing: "0.06em"
                      }}>{recipe.tag}</span>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: THEME.text, lineHeight: 1.2 }}>
                      {recipe.title}
                    </div>
                  </div>
                  {/* Oxalate badge */}
                  <div style={{ textAlign: "center", marginLeft: 12, flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: col, lineHeight: 1 }}>{recipe.totalOxalate}</div>
                    <div style={{ fontSize: 8, color: col, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>mg ox</div>
                  </div>
                </div>

                {/* Meta row */}
                <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                  {[
                    { icon: "⏱", val: recipe.prepTime },
                    { icon: "👤", val: `${recipe.servings} serving${recipe.servings > 1 ? "s" : ""}` },
                    { icon: "📚", val: recipe.category },
                  ].map(m => (
                    <span key={m.val} style={{ fontSize: 14, color: THEME.textMuted, display: "flex", alignItems: "center", gap: 3 }}>
                      {m.icon} {m.val}
                    </span>
                  ))}
                </div>

                {/* Source */}
                <div style={{ fontSize: 11, color: THEME.primary, fontWeight: 600 }}>
                  📖 {recipe.source}
                </div>
              </div>

              {/* Bottom: save + log + open */}
              <div style={{ display: "flex", borderTop: `1px solid ${THEME.primary}` }}>
                <button
                  onClick={e => { e.stopPropagation(); toggleSave(recipe.id); }}
                  style={{
                    flex: 1, padding: "10px", border: "none", background: "none",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    color: isSaved ? THEME.primary : THEME.textMuted,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5
                  }}
                >
                  {isSaved ? "❤️ Saved" : "🤍 Save"}
                </button>
                <div style={{ width: 1, background: THEME.primary }} />
                <button
                  onClick={e => { e.stopPropagation(); addRecipeToLog(recipe); }}
                  style={{
                    flex: 1, padding: "10px", border: "none",
                    background: loggedRecipes[recipe.id] ? THEME.primary : "none",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    color: loggedRecipes[recipe.id] ? THEME.text : THEME.primary,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    transition: "background 0.2s"
                  }}
                >
                  {loggedRecipes[recipe.id] ? "✓ Logged!" : "📋 Log"}
                </button>
                <div style={{ width: 1, background: THEME.primary }} />
                <button style={{
                  flex: 1, padding: "10px", border: "none", background: "none",
                  fontSize: 12, fontWeight: 700, color: THEME.primary, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5
                }}>
                  View →
                </button>
              </div>
            </div>
          );
        })}
      </div>


      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* ── CREATE YOUR OWN RECIPE ── */}
      <div style={{ padding: "0 18px 12px" }}>

        {/* Section header — sticky */}
        <div style={{
          background: THEME.text,
          borderRadius: 18, padding: "18px 18px 14px",
          marginBottom: 12, position: "sticky", top: 70, zIndex: 50, overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.65)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
            LOW OXALATE LIVING
          </div>
          <div style={{ fontSize: 19, fontWeight: 900, color: "#FFFFFF", marginBottom: 4 }}>
            Your Kitchen Lab 🧑‍🍳
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 14 }}>
            Build your own low-oxalate recipes. We calculate the total oxalate automatically as you add ingredients.
          </div>
          <button
            onClick={() => setShowBuilder(b => !b)}
            style={{
              padding: "10px 20px", borderRadius: 999, border: "2px solid rgba(255,255,255,0.5)",
              background: showBuilder ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.15)",
              color: "#FFFFFF", fontSize: 17, fontWeight: 800, cursor: "pointer",
              backdropFilter: "blur(4px)", transition: "all 0.2s"
            }}
          >
            {showBuilder ? "✕ Close Builder" : "+ New Recipe"}
          </button>
        </div>

        {/* ── Recipe Template Builder ── */}
        {showBuilder && (
          <div style={{ background: "#FFFFFF", borderRadius: 18, border: `1px solid ${THEME.border}`, marginBottom: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(44,82,130,0.08)" }}>

            {/* Template header — looks like a recipe card */}
            <div style={{ background: THEME.bg, borderBottom: `1px solid ${THEME.border}`, padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>New Recipe</div>
                {/* Recipe name inline — feels like filling in a title */}
                <input
                  value={builderName}
                  onChange={e => { setBuilderName(e.target.value); setBuilderError(""); }}
                  placeholder="Untitled Recipe..."
                  maxLength={80}
                  style={{
                    fontSize: 20, fontWeight: 900, color: THEME.text,
                    border: "none", borderBottom: builderName ? `2px solid ${THEME.primary}` : `2px dashed ${THEME.border}`,
                    outline: "none", background: "transparent", fontFamily: "inherit",
                    width: "100%", padding: "2px 0"
                  }}
                />
              </div>
              {/* Live oxalate badge */}
              <div style={{ textAlign: "center", flexShrink: 0, marginLeft: 12, background: builderOxColor(builderTotal) + "18", borderRadius: 12, padding: "8px 12px", border: `1.5px solid ${builderOxColor(builderTotal)}44` }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: builderOxColor(builderTotal), lineHeight: 1 }}>{builderTotal}</div>
                <div style={{ fontSize: 10, color: builderOxColor(builderTotal), fontWeight: 700 }}>mg total</div>
              </div>
            </div>

            <div style={{ padding: "16px 18px" }}>

              {/* Meal type + servings — pill selectors */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>This is a</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {["Breakfast","Lunch","Dinner","Side","Snack"].map(cat => (
                    <button key={cat} onClick={() => setBuilderCategory(cat)} style={{
                      padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                      border: `2px solid ${builderCategory === cat ? THEME.text : THEME.border}`,
                      background: builderCategory === cat ? THEME.text : "#FFFFFF",
                      color: builderCategory === cat ? "#FFFFFF" : THEME.textMuted,
                      cursor: "pointer", transition: "all 0.15s"
                    }}>{cat}</button>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, color: THEME.textMuted, fontWeight: 600 }}>Serves</span>
                  <button onClick={() => setBuilderServings(s => Math.max(1,s-1))} style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${THEME.border}`, background: THEME.bg, fontSize: 16, cursor: "pointer", fontWeight: 700, color: THEME.text, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontSize: 18, fontWeight: 900, color: THEME.text, minWidth: 22, textAlign: "center" }}>{builderServings}</span>
                  <button onClick={() => setBuilderServings(s => Math.min(12,s+1))} style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${THEME.border}`, background: THEME.bg, fontSize: 16, cursor: "pointer", fontWeight: 700, color: THEME.text, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
              </div>

              {/* Cooking method — tap to select chips */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Cooked by</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { label: "🔥 Grilled",    value: "Grilled" },
                    { label: "🍳 Pan-seared",  value: "Pan-seared" },
                    { label: "♨️ Steamed",     value: "Steamed" },
                    { label: "🫕 Simmered",    value: "Simmered" },
                    { label: "🌡 Roasted",     value: "Roasted" },
                    { label: "🥗 Raw",         value: "Raw" },
                    { label: "🍲 Slow cooked", value: "Slow cooked" },
                    { label: "🥘 Stir-fried",  value: "Stir-fried" },
                    { label: "🫙 Baked",       value: "Baked" },
                    { label: "💧 Boiled",      value: "Boiled" },
                  ].map(m => {
                    const isSelected = builderSteps[0] === m.value;
                    return (
                      <button key={m.value}
                        onClick={() => setBuilderSteps([m.value, ...builderSteps.slice(1)])}
                        style={{
                          padding: "7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                          border: `2px solid ${isSelected ? THEME.text : THEME.border}`,
                          background: isSelected ? THEME.primaryLight : "#FFFFFF",
                          color: isSelected ? THEME.text : THEME.textMuted,
                          cursor: "pointer", transition: "all 0.15s"
                        }}
                      >{m.label}</button>
                    );
                  })}
                </div>
              </div>

              {/* Ingredients — fill-in-the-blank rows */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                  Ingredients
                  <span style={{ fontSize: 11, fontWeight: 400, textTransform: "none", color: THEME.textMuted, marginLeft: 6 }}>— enter mg or 0 if unsure</span>
                </div>

                {builderIngredients.map((ing, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, padding: "10px 12px", background: THEME.bg, borderRadius: 12, border: `1px solid ${THEME.border}` }}>
                    {/* Number */}
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: THEME.text, color: "#FFFFFF", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i+1}</div>
                    {/* Ingredient name */}
                    <input
                      value={ing.name}
                      onChange={e => updateIng(i, "name", e.target.value)}
                      placeholder="Ingredient name..."
                      list={"ing-suggestions-" + i}
                      style={{ flex: 2, fontSize: 14, fontWeight: 600, border: "none", borderBottom: `1.5px dashed ${THEME.border}`, outline: "none", background: "transparent", fontFamily: "inherit", color: THEME.text, padding: "2px 4px" }}
                      onFocus={e => e.target.style.borderBottomColor = THEME.primary}
                      onBlur={e => e.target.style.borderBottomColor = THEME.border}
                    />
                    <datalist id={"ing-suggestions-" + i}>
                      {INGREDIENT_SUGGESTIONS.map(s => <option key={s} value={s} />)}
                    </datalist>
                    {/* Amount */}
                    <input
                      value={ing.amount}
                      onChange={e => updateIng(i, "amount", e.target.value)}
                      placeholder="1 cup"
                      style={{ width: 64, fontSize: 13, border: "none", borderBottom: `1.5px dashed ${THEME.border}`, outline: "none", background: "transparent", fontFamily: "inherit", color: THEME.textMuted, textAlign: "center", padding: "2px 4px" }}
                      onFocus={e => e.target.style.borderBottomColor = THEME.primary}
                      onBlur={e => e.target.style.borderBottomColor = THEME.border}
                    />
                    {/* mg */}
                    <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                      <input
                        value={ing.oxalate}
                        onChange={e => updateIng(i, "oxalate", e.target.value)}
                        placeholder="0"
                        type="number" min={0} max={999}
                        style={{ width: 44, fontSize: 14, fontWeight: 800, border: "none", borderBottom: `1.5px dashed ${ing.oxalate ? builderOxColor(parseInt(ing.oxalate)||0) : THEME.border}`, outline: "none", background: "transparent", fontFamily: "inherit", color: ing.oxalate ? builderOxColor(parseInt(ing.oxalate)||0) : THEME.textMuted, textAlign: "center", padding: "2px 2px" }}
                        onFocus={e => e.target.style.borderBottomColor = THEME.primary}
                        onBlur={e => e.target.style.borderBottomColor = ing.oxalate ? builderOxColor(parseInt(ing.oxalate)||0) : THEME.border}
                      />
                      <span style={{ fontSize: 11, color: THEME.textMuted, fontWeight: 600 }}>mg</span>
                    </div>
                    {/* Remove */}
                    {builderIngredients.length > 1 && (
                      <button onClick={() => removeIngRow(i)} style={{ width: 22, height: 22, borderRadius: "50%", border: "none", background: THEME.dangerSoft, color: THEME.danger, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>×</button>
                    )}
                  </div>
                ))}

                <button onClick={addIngRow} style={{
                  width: "100%", padding: "9px", borderRadius: 12,
                  border: `2px dashed ${THEME.border}`, background: "transparent",
                  color: THEME.primary, fontSize: 13, fontWeight: 700, cursor: "pointer"
                }}>+ Add Ingredient</button>
              </div>

              {/* Notes / tip */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Notes</div>
                <textarea
                  value={builderTip}
                  onChange={e => setBuilderTip(e.target.value)}
                  placeholder="Any tips, swaps, or things to remember..."
                  rows={2} maxLength={300}
                  style={{ width: "100%", padding: "10px 12px", fontSize: 14, border: `1.5px solid ${THEME.border}`, borderRadius: 12, outline: "none", fontFamily: "inherit", resize: "vertical", background: THEME.bg, boxSizing: "border-box", lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = THEME.primary}
                  onBlur={e => e.target.style.borderColor = THEME.border}
                />
              </div>

              {builderError && (
                <div style={{ background: THEME.dangerSoft, border: `1px solid ${THEME.dangerBorder}`, borderRadius: 12, padding: "10px 14px", marginBottom: 12, fontSize: 14, color: THEME.danger, fontWeight: 700 }}>
                  {builderError}
                </div>
              )}

              <button onClick={saveMyRecipe} style={{
                width: "100%", padding: "14px",
                background: builderSaved ? THEME.primary : THEME.text,
                color: "#FFFFFF", border: "none",
                borderRadius: 14, fontSize: 16, fontWeight: 800, cursor: "pointer",
                transition: "all 0.2s", boxShadow: builderSaved ? "none" : "0 4px 16px rgba(44,82,130,0.25)"
              }}>
                {builderSaved ? "✓ Recipe Saved!" : `Save Recipe · ${builderTotal}mg`}
              </button>
            </div>
          </div>
        )}

        {/* ── My Recipes list ── */}
        {myRecipes.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
              My Recipes ({myRecipes.length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {myRecipes.map(recipe => {
                const col = builderOxColor(recipe.totalOxalate);
                return (
                  <div key={recipe.id}
                    onClick={() => setSelectedMyRecipe(recipe)}
                    style={{
                      background: "#FFFFFF", borderRadius: 16,
                      border: `1px solid ${THEME.textMuted}`,
                      padding: "18px", cursor: "pointer",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                      transition: "transform 0.15s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = ""}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 17, fontWeight: 800, color: THEME.text, marginBottom: 4 }}>{recipe.title}</div>
                        <div style={{ display: "flex", gap: 12, fontSize: 14, color: THEME.textMuted }}>
                          <span>🍽 {recipe.category}</span>
                          <span>👤 {recipe.servings} serving{recipe.servings > 1 ? "s" : ""}</span>
                          <span>🧪 {recipe.ingredients.length} ingredients</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "center", marginLeft: 12, flexShrink: 0 }}>
                        <div style={{ fontSize: 24, fontWeight: 900, color: col, lineHeight: 1 }}>{recipe.totalOxalate}</div>
                        <div style={{ fontSize: 8, color: col, fontWeight: 700, textTransform: "uppercase" }}>mg ox</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Sources & Disclaimers Footer ── */}
      <div style={{ margin: "0 16px 24px", background: "#FFFFFF", borderRadius: 18, border: `1px solid ${THEME.border}`, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: THEME.text, padding: "18px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>📚</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.1em" }}>Clinical Sources</span>
        </div>
        <div style={{ padding: "18px" }}>
          <p style={{ fontSize: 14, color: THEME.textMuted, lineHeight: 1.6, marginBottom: 12 }}>
            All recipes and dietary guidance are grounded in peer-reviewed research and recommendations from registered dietitian nutritionists specializing in kidney stone prevention.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { name: "National Kidney Foundation", desc: "Kidney Stone Diet Plan & Prevention", url: "https://www.kidney.org/kidney-topics/kidney-stone-diet-plan-and-prevention" },
              { name: "NIDDK", desc: "Eating, Diet & Nutrition for Kidney Stones", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/eating-diet-nutrition" },
              { name: "Urology Care Foundation", desc: "Fight Kidney Stones with Food Cookbook", url: "https://www.urologyhealth.org/documents/Product-Store/English/Kidney-Stones-Cookbook.pdf" },
              { name: "Journal of Renal Nutrition", desc: "Whole Diet Approach to Calcium Oxalate Kidney Stone Prevention", url: "https://www.jrnjournal.org/article/S1051-2276(21)00268-5/fulltext" },
              { name: "Jill Harris RD — Kidney Stone Diet", desc: "Low Oxalate Recipes & Meal Plans", url: "https://kidneystonediet.com/recipes/" },
              { name: "Melanie Betz MS RD — The Kidney Dietitian", desc: "The Kidney Stone Diet: Evidence-Based Nutrition", url: "https://www.thekidneydietitian.org/kidney-stone-diet/" },
              { name: "NKF of Hawaii", desc: "How Oxalates Affect Kidney Health", url: "https://kidneyhi.org/blog/how-oxalates-affect-kidney-health-what-you-need-to-know-to-prevent-kidney-stones/" },
            ].map(source => (
              <a key={source.name} href={source.url} target="_blank" rel="noreferrer"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, padding: "9px 12px", background: "#ffffff", borderRadius: 12, border: `1px solid ${THEME.border}`, textDecoration: "none", transition: "border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = THEME.primary}
                onMouseLeave={e => e.currentTarget.style.borderColor = THEME.border}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: THEME.text, marginBottom: 2 }}>{source.name}</div>
                  <div style={{ fontSize: 14, color: THEME.textMuted }}>{source.desc}</div>
                </div>
                <span style={{ fontSize: 11, color: THEME.primary, flexShrink: 0, marginTop: 2 }}>↗</span>
              </a>
            ))}
          </div>
          {/* Disclaimer */}
          <div style={{ marginTop: 14, padding: "10px 12px", background: "#F0E9DB", border: `1px solid ${THEME.warmSand}`, borderRadius: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#7A6843", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>⚠️ Medical Disclaimer</div>
            <p style={{ fontSize: 11, color: "#7A6843", lineHeight: 1.6, margin: 0 }}>
              Loxalate is a dietary reference tool, not a substitute for medical advice. Oxalate targets vary by individual — always consult your nephrologist or registered dietitian before making significant dietary changes. Information is provided for general educational purposes only.
            </p>
          </div>
          {/* Copyright */}
          <div style={{ marginTop: 12, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: THEME.textMuted }}>© {new Date().getFullYear()} Loxalate · loxalate.me · All rights reserved</div>
          </div>
        </div>
      </div>

      {/* ── Recipe detail modal ── */}
      {selectedRecipe && (
        <div
          onClick={() => setSelectedRecipe(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "flex-end", justifyContent: "center"
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 560,
              background: "#FFFFFF",
              borderRadius: "20px 20px 0 0",
              maxHeight: "92vh",
              display: "flex", flexDirection: "column",
              animation: "modalUp 0.3s cubic-bezier(.15,.85,.3,1) forwards",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.2)"
            }}
          >
            {/* Handle */}
            <div style={{ padding: "14px 0 0", display: "flex", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: THEME.primary, borderRadius: 2 }} />
            </div>

            {/* Scrollable content */}
            <div style={{ overflowY: "auto", padding: "12px 22px 40px" }}>
              {/* Tag + title */}
              <span style={{
                display: "inline-block", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999,
                background: getTagColor(selectedRecipe.tag) + "18", color: getTagColor(selectedRecipe.tag),
                border: `1px solid ${getTagColor(selectedRecipe.tag)}44`, textTransform: "uppercase",
                letterSpacing: "0.06em", marginBottom: 8
              }}>{selectedRecipe.tag}</span>
              <div style={{ fontSize: 22, fontWeight: 900, color: THEME.text, lineHeight: 1.2, marginBottom: 6 }}>
                {selectedRecipe.title}
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                {[
                  { label: "Total Oxalate", val: `${selectedRecipe.totalOxalate}mg`, color: oxColor(selectedRecipe.totalOxalate) },
                  { label: "Prep Time", val: selectedRecipe.prepTime, color: THEME.textMuted },
                  { label: "Servings", val: selectedRecipe.servings, color: THEME.textMuted },
                  { label: "Category", val: selectedRecipe.category, color: THEME.textMuted },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Why it works */}
              <div style={{
                background: THEME.primaryLight, borderRadius: 14, padding: "12px 14px", marginBottom: 16,
                border: `1px solid ${THEME.primary}44`
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: THEME.primary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
                  🔬 Why This Works
                </div>
                <div style={{ fontSize: 13, color: THEME.text, lineHeight: 1.6 }}>
                  {selectedRecipe.whyItWorks}
                </div>
              </div>

              {/* Source */}
              <div style={{ fontSize: 14, color: THEME.textMuted, marginBottom: 16 }}>
                📖 Source:{" "}
                <a href={selectedRecipe.sourceUrl} target="_blank" rel="noreferrer"
                  style={{ color: THEME.primary, fontWeight: 700, textDecoration: "none" }}
                  onClick={e => e.stopPropagation()}
                >
                  {selectedRecipe.source}
                </a>
              </div>

              {/* Ingredients */}
              <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                Ingredients
              </div>
              {selectedRecipe.ingredients.map((ing, i) => {
                const maxOx = Math.max(...selectedRecipe.ingredients.map(x => x.oxalate), 1);
                const pct = ing.oxalate === 0 ? 0 : Math.max((ing.oxalate / maxOx) * 100, 5);
                const c = oxColor(ing.oxalate);
                return (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, color: THEME.text, fontWeight: 500 }}>{ing.name}</span>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 14, color: THEME.textMuted }}>{ing.amount}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: ing.oxalate === 0 ? THEME.textMuted : c, minWidth: 36, textAlign: "right" }}>
                          {ing.oxalate === 0 ? "0mg" : `${ing.oxalate}mg`}
                        </span>
                      </div>
                    </div>
                    <div style={{ height: 3, background: THEME.primary, borderRadius: 2 }}>
                      {ing.oxalate > 0 && <div style={{ height: "100%", width: `${pct}%`, background: c, borderRadius: 2 }} />}
                    </div>
                  </div>
                );
              })}

              {/* Steps */}
              <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "18px 0 10px" }}>
                Instructions
              </div>
              {selectedRecipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", background: THEME.primary,
                    color: "#FFFFFF", fontSize: 12, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1
                  }}>{i + 1}</div>
                  <div style={{ fontSize: 15, color: THEME.text, lineHeight: 1.6, flex: 1 }}>{step}</div>
                </div>
              ))}

              {/* Tips */}
              <div style={{
                background: "#F0E9DB", borderRadius: 14, padding: "12px 14px",
                border: `1px solid ${THEME.warmSand}`, marginTop: 8
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#7A6843", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
                  💡 Dietitian Tip
                </div>
                <div style={{ fontSize: 13, color: "#7A6843", lineHeight: 1.6 }}>
                  {selectedRecipe.tips}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                <button
                  onClick={() => addRecipeToLog(selectedRecipe)}
                  style={{
                    flex: 1, padding: "18px",
                    background: loggedRecipes[selectedRecipe.id] ? THEME.primary : THEME.text,
                    color: loggedRecipes[selectedRecipe.id] ? THEME.text : "#FFFFFF",
                    border: `2px solid ${THEME.text}`, borderRadius: 16,
                    fontSize: 16, fontWeight: 800, cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {loggedRecipes[selectedRecipe.id] ? "✓ Added to Log!" : "📋 Add to Daily Log"}
                </button>
                <button
                  onClick={() => toggleSave(selectedRecipe.id)}
                  style={{
                    flex: 1, padding: "18px",
                    background: savedRecipes[selectedRecipe.id] ? THEME.primary : "none",
                    color: savedRecipes[selectedRecipe.id] ? THEME.text : THEME.textMuted,
                    border: `2px solid ${THEME.primary}`, borderRadius: 16,
                    fontSize: 16, fontWeight: 800, cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {savedRecipes[selectedRecipe.id] ? "❤️ Saved" : "🤍 Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── My Recipe detail modal ── */}
      {selectedMyRecipe && (
        <div
          onClick={() => setSelectedMyRecipe(null)}
          style={{ position: "fixed", inset: 0, zIndex: 1001, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 560, background: "#FFFFFF", borderRadius: "20px 20px 0 0", maxHeight: "92vh", display: "flex", flexDirection: "column", animation: "modalUp 0.3s cubic-bezier(.15,.85,.3,1) forwards", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}
          >
            <div style={{ padding: "14px 0 0", display: "flex", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: THEME.primary, borderRadius: 2 }} />
            </div>
            <div style={{ overflowY: "auto", padding: "12px 22px 40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999, background: THEME.primaryLight, color: THEME.textMuted, display: "inline-block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>My Recipe</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: THEME.text, lineHeight: 1.2 }}>{selectedMyRecipe.title}</div>
                </div>
                <div style={{ textAlign: "center", marginLeft: 12, flexShrink: 0 }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: builderOxColor(selectedMyRecipe.totalOxalate), lineHeight: 1 }}>{selectedMyRecipe.totalOxalate}</div>
                  <div style={{ fontSize: 10, color: builderOxColor(selectedMyRecipe.totalOxalate), fontWeight: 700, textTransform: "uppercase" }}>mg oxalate</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
                {[
                  { label: "Category", val: selectedMyRecipe.category },
                  { label: "Servings", val: selectedMyRecipe.servings },
                  { label: "Ingredients", val: selectedMyRecipe.ingredients.length },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: THEME.text }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Ingredients</div>
              {selectedMyRecipe.ingredients.map((ing, i) => {
                const maxOx = Math.max(...selectedMyRecipe.ingredients.map(x => x.oxalate), 1);
                const pct = ing.oxalate === 0 ? 0 : Math.max((ing.oxalate / maxOx) * 100, 5);
                const c = builderOxColor(ing.oxalate);
                return (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, color: THEME.text, fontWeight: 500 }}>{ing.name}</span>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 14, color: THEME.textMuted }}>{ing.amount}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: ing.oxalate === 0 ? THEME.textMuted : c, minWidth: 36, textAlign: "right" }}>{ing.oxalate === 0 ? "0mg" : `${ing.oxalate}mg`}</span>
                      </div>
                    </div>
                    <div style={{ height: 3, background: THEME.primary, borderRadius: 2 }}>
                      {ing.oxalate > 0 && <div style={{ height: "100%", width: `${pct}%`, background: c, borderRadius: 2 }} />}
                    </div>
                  </div>
                );
              })}

              <div style={{ fontSize: 11, fontWeight: 800, color: THEME.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "16px 0 10px" }}>Instructions</div>
              {selectedMyRecipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: THEME.primary, color: "#FFFFFF", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <div style={{ fontSize: 15, color: THEME.text, lineHeight: 1.6, flex: 1 }}>{step}</div>
                </div>
              ))}

              {selectedMyRecipe.tips && (
                <div style={{ background: "#F0E9DB", borderRadius: 14, padding: "12px 14px", border: `1px solid ${THEME.warmSand}`, marginTop: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#7A6843", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>💡 My Note</div>
                  <div style={{ fontSize: 13, color: "#7A6843", lineHeight: 1.6 }}>{selectedMyRecipe.tips}</div>
                </div>
              )}

              <button
                onClick={() => deleteMyRecipe(selectedMyRecipe.id)}
                style={{ width: "100%", marginTop: 18, padding: "13px", background: THEME.dangerSoft, color: THEME.danger, border: `2px solid ${THEME.dangerBorder}`, borderRadius: 16, fontSize: 17, fontWeight: 800, cursor: "pointer" }}
              >
                🗑 Delete This Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
