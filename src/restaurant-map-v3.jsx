import { useState, useRef, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const RESTAURANTS = [
  {
    name: "Urth Caffé", area: "Pasadena", type: "Cafe",
    lat: 34.1453, lng: -118.1505, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken Salad", modifications: "Hold spinach, add romaine", cookingMethod: "Grilled chicken, raw vegetables", total: 11,
        ingredients: [
          { name: "Grilled chicken breast", amount: "6 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Cucumber", amount: "½ cup", oxalate: 1 },
          { name: "Tomatoes", amount: "½ cup", oxalate: 4 },
          { name: "Red bell pepper", amount: "¼ cup", oxalate: 1 },
          { name: "Olive oil dressing", amount: "2 tbsp", oxalate: 0 },
        ]},
      { dish: "Scrambled Eggs with White Toast", modifications: "None needed", cookingMethod: "Scrambled eggs in butter, toasted bread", total: 2,
        ingredients: [
          { name: "Scrambled eggs", amount: "3 large", oxalate: 0 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "White toast", amount: "2 slices", oxalate: 2 },
        ]},
      { dish: "Grilled Fish with Steamed Vegetables", modifications: "Request cauliflower and zucchini", cookingMethod: "Grilled fish, steamed vegetables", total: 6,
        ingredients: [
          { name: "Grilled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Steamed cauliflower", amount: "1 cup", oxalate: 2 },
          { name: "Steamed zucchini", amount: "1 cup", oxalate: 3 },
          { name: "Lemon juice", amount: "2 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "The Arbour", area: "Pasadena", type: "Restaurant",
    lat: 34.1478, lng: -118.1445, hasLowOxalate: true,
    options: [
      { dish: "Roasted Chicken with Cauliflower", modifications: "None needed", cookingMethod: "Oven-roasted at 400F", total: 3,
        ingredients: [
          { name: "Roasted chicken thigh & breast", amount: "8 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "1.5 cups", oxalate: 3 },
          { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "White Fish with Green Beans", modifications: "None needed", cookingMethod: "Pan-seared fish, sauteed vegetables", total: 16,
        ingredients: [
          { name: "Pan-seared cod", amount: "6 oz", oxalate: 0 },
          { name: "Sauteed green beans", amount: "1 cup", oxalate: 15 },
          { name: "Butter", amount: "2 tbsp", oxalate: 0 },
          { name: "White wine sauce", amount: "1/4 cup", oxalate: 1 },
        ]},
      { dish: "Egg White Omelet", modifications: "Request mushrooms, peppers, no spinach", cookingMethod: "Pan-cooked omelet", total: 2,
        ingredients: [
          { name: "Egg whites", amount: "4 large", oxalate: 0 },
          { name: "Mushrooms", amount: "1/2 cup", oxalate: 1 },
          { name: "Red bell peppers", amount: "1/4 cup", oxalate: 1 },
          { name: "Cheese", amount: "1 oz", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "La Grande Orange Cafe", area: "Pasadena", type: "Cafe",
    lat: 34.1442, lng: -118.1483, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken Sandwich", modifications: "Request on white bread", cookingMethod: "Grilled chicken, toasted bread", total: 5,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1/4 cup", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
        ]},
      { dish: "Roasted Turkey Plate", modifications: "None needed", cookingMethod: "Oven-roasted turkey, mashed cauliflower", total: 6,
        ingredients: [
          { name: "Roasted turkey breast", amount: "6 oz", oxalate: 0 },
          { name: "Mashed cauliflower", amount: "1 cup", oxalate: 2 },
          { name: "Roasted carrots", amount: "1/2 cup", oxalate: 4 },
        ]},
    ]
  },
  {
    name: "Civil Coffee", area: "Highland Park", type: "Cafe",
    lat: 34.1147, lng: -118.1989, hasLowOxalate: true,
    options: [
      { dish: "Avocado Toast on White Bread", modifications: "Moderate portion size", cookingMethod: "Toasted bread, mashed avocado", total: 6,
        ingredients: [
          { name: "White sourdough bread", amount: "2 slices", oxalate: 2 },
          { name: "Avocado", amount: "1/2 medium", oxalate: 3 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Egg Sandwich", modifications: "None needed", cookingMethod: "Fried eggs, toasted bread", total: 2,
        ingredients: [
          { name: "Fried eggs", amount: "2 large", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Cheese", amount: "1 slice", oxalate: 0 },
        ]},
      { dish: "Chicken Lettuce Wrap", modifications: "None needed", cookingMethod: "Grilled chicken, raw vegetables", total: 4,
        ingredients: [
          { name: "Grilled chicken breast", amount: "4 oz", oxalate: 0 },
          { name: "Iceberg lettuce wraps", amount: "3 large leaves", oxalate: 2 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
          { name: "Carrots", amount: "2 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Kitchen Mouse", area: "Highland Park", type: "Cafe",
    lat: 34.1125, lng: -118.1945, hasLowOxalate: true,
    options: [
      { dish: "Roasted Chicken Salad", modifications: "Request romaine base, no kale", cookingMethod: "Oven-roasted chicken, raw vegetables", total: 7,
        ingredients: [
          { name: "Roasted chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Cucumber", amount: "1/2 cup", oxalate: 1 },
          { name: "Red cabbage", amount: "1/4 cup", oxalate: 1 },
        ]},
      { dish: "Scrambled Eggs with Bacon", modifications: "None needed", cookingMethod: "Scrambled eggs, pan-fried bacon", total: 1,
        ingredients: [
          { name: "Scrambled eggs", amount: "3 large", oxalate: 0 },
          { name: "Bacon strips", amount: "3 strips", oxalate: 0 },
          { name: "White toast", amount: "1 slice", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Joy", area: "Highland Park", type: "Restaurant",
    lat: 34.1165, lng: -118.2012, hasLowOxalate: true,
    options: [
      { dish: "Grilled Fish with Bok Choy", modifications: "None needed", cookingMethod: "Grilled fish, steamed bok choy", total: 5,
        ingredients: [
          { name: "Grilled white fish", amount: "6 oz", oxalate: 0 },
          { name: "Steamed bok choy", amount: "1.5 cups", oxalate: 3 },
          { name: "Soy sauce", amount: "1 tbsp", oxalate: 2 },
        ]},
      { dish: "Chicken with White Rice", modifications: "None needed", cookingMethod: "Grilled chicken, steamed rice", total: 5,
        ingredients: [
          { name: "Grilled chicken thigh", amount: "6 oz", oxalate: 0 },
          { name: "Steamed white rice", amount: "1 cup", oxalate: 4 },
          { name: "Scallions", amount: "2 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "True Food Kitchen", area: "Pasadena", type: "Restaurant",
    lat: 34.1453, lng: -118.1508, hasLowOxalate: true,
    options: [
      { dish: "Grilled Sustainable Salmon", modifications: "Ask for snap peas steamed, no wild rice pilaf", cookingMethod: "Grilled salmon, steamed snap peas", total: 8,
        ingredients: [
          { name: "Grilled salmon fillet", amount: "5 oz", oxalate: 0 },
          { name: "Steamed snap peas", amount: "1 cup", oxalate: 2 },
          { name: "Thai basil vinaigrette", amount: "2 tbsp", oxalate: 2 },
          { name: "Lemon", amount: "1 wedge", oxalate: 1 },
          { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Jasmine Rice with Grilled Chicken", modifications: "Order plain; best low-oxalate option", cookingMethod: "Steamed jasmine rice, grilled chicken", total: 7,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Steamed jasmine rice", amount: "1 cup", oxalate: 4 },
          { name: "Lime juice", amount: "1 tbsp", oxalate: 1 },
          { name: "Cucumber slices", amount: "4 slices", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "El Dorado Pollos A La Brasa", area: "Pasadena", type: "Restaurant",
    lat: 34.1523, lng: -118.1554, hasLowOxalate: true,
    options: [
      { dish: "Quarter Chicken with Rice & Salad", modifications: "Request white rice", cookingMethod: "Peruvian wood-fired rotisserie chicken", total: 14,
        ingredients: [
          { name: "Rotisserie chicken (quarter)", amount: "6 oz", oxalate: 0 },
          { name: "Steamed white rice", amount: "1 cup", oxalate: 4 },
          { name: "Green salad (romaine, tomato)", amount: "1 cup", oxalate: 6 },
          { name: "Aji verde sauce", amount: "2 tbsp", oxalate: 3 },
        ]},
      { dish: "Half Chicken Plate", modifications: "Request white rice, no yuca", cookingMethod: "Peruvian rotisserie half chicken", total: 16,
        ingredients: [
          { name: "Rotisserie chicken (half)", amount: "10 oz", oxalate: 0 },
          { name: "Steamed white rice", amount: "1 cup", oxalate: 4 },
          { name: "Side salad", amount: "1 cup", oxalate: 6 },
          { name: "Aji verde sauce", amount: "3 tbsp", oxalate: 4 },
        ]},
    ]
  },
  {
    name: "Home State Tex-Mex", area: "Pasadena", type: "Restaurant",
    lat: 34.1618, lng: -118.1335, hasLowOxalate: true,
    options: [
      { dish: "Breakfast Taco - Egg & Cheese", modifications: "Request flour tortilla; avoid spinach add-ons", cookingMethod: "Scrambled eggs, cheese, flour tortilla", total: 6,
        ingredients: [
          { name: "Scrambled eggs", amount: "2 large", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
          { name: "Flour tortilla", amount: "1 medium", oxalate: 3 },
          { name: "Salsa roja (light)", amount: "1 tbsp", oxalate: 2 },
        ]},
      { dish: "Beef Brisket Plate", modifications: "None needed — brisket is zero oxalate", cookingMethod: "Low-and-slow smoked Texas brisket", total: 12,
        ingredients: [
          { name: "Smoked beef brisket", amount: "6 oz", oxalate: 0 },
          { name: "White rice or fries", amount: "1 cup", oxalate: 4 },
          { name: "Pickled jalapeños", amount: "2 slices", oxalate: 3 },
          { name: "BBQ sauce (light)", amount: "1 tbsp", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Seed Bakery", area: "Pasadena", type: "Cafe",
    lat: 34.1338, lng: -118.1200, hasLowOxalate: false,
    options: [
      { dish: "Breakfast Croissant Sandwich", modifications: "Best choice here — eggs, bacon, aioli are all zero oxalate", cookingMethod: "Scrambled eggs and bacon on a butter croissant with aioli", total: 3,
        ingredients: [
          { name: "Scrambled eggs", amount: "2 large", oxalate: 0 },
          { name: "Bacon", amount: "2 strips", oxalate: 0 },
          { name: "Aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Butter croissant", amount: "1 medium", oxalate: 3 },
        ]},
      { dish: "Pulled Pork Sandwich", modifications: "Good option — pork and aioli are zero oxalate; pickles and greens very low", cookingMethod: "Braised pork with cilantro, pickles, greens and aioli on bread", total: 9,
        ingredients: [
          { name: "Braised pulled pork", amount: "4 oz", oxalate: 0 },
          { name: "Bread (sourdough)", amount: "2 slices", oxalate: 3 },
          { name: "Mixed greens", amount: "1/4 cup", oxalate: 2 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Pickles", amount: "3-4 slices", oxalate: 2 },
          { name: "Aioli", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Turkey Sandwich", modifications: "Good choice — sub sunflower pesto for regular pesto to keep lower; pickles & greens fine", cookingMethod: "Oven roasted turkey, pesto, gruyere, tomato, pickles, greens", total: 15,
        ingredients: [
          { name: "Oven roasted turkey breast", amount: "4 oz", oxalate: 0 },
          { name: "Pesto", amount: "1.5 tbsp", oxalate: 6 },
          { name: "Gruyere cheese", amount: "1 oz", oxalate: 0 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Pickles", amount: "3-4 slices", oxalate: 2 },
          { name: "Mixed greens", amount: "1/4 cup", oxalate: 2 },
          { name: "Bread (sourdough)", amount: "2 slices", oxalate: 3 },
        ]},
      { dish: "Salmon Sandwich", modifications: "Good option — salmon, pickled onions, cucumber and greens are all low", cookingMethod: "House cured Scottish salmon, pickled red onions, radish, cucumber, greens, aioli", total: 13,
        ingredients: [
          { name: "Cured Scottish salmon", amount: "3 oz", oxalate: 0 },
          { name: "Pickled red onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Radish slices", amount: "4-5 slices", oxalate: 2 },
          { name: "Cucumber slices", amount: "1/4 cup", oxalate: 1 },
          { name: "Mixed greens", amount: "1/4 cup", oxalate: 2 },
          { name: "Aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Bread (sourdough)", amount: "2 slices", oxalate: 3 },
          { name: "Capers (if included)", amount: "1 tsp", oxalate: 1 },
        ]},
      { dish: "Avocado Toast", modifications: "Za'atar herb blend adds a small amount; overall a solid low-oxalate choice", cookingMethod: "Mashed avocado on toasted bread with za'atar herbs and olive oil (vegan)", total: 9,
        ingredients: [
          { name: "Avocado", amount: "1/2 medium", oxalate: 3 },
          { name: "Sourdough bread", amount: "2 slices", oxalate: 3 },
          { name: "Za'atar herb blend", amount: "1 tsp", oxalate: 2 },
          { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
          { name: "Mixed greens", amount: "small handful", oxalate: 1 },
        ]},
      { dish: "Squash Salad (Vegan)", modifications: "Best salad option here — cauliflower, avocado, cucumber, tomato all low; lemon garlic dressing clean", cookingMethod: "Roasted squash and cauliflower, avocado, cucumber, tomato, radish, lemon garlic dressing", total: 18,
        ingredients: [
          { name: "Roasted squash", amount: "1/2 cup", oxalate: 4 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
          { name: "Tomato", amount: "1/4 cup", oxalate: 2 },
          { name: "Radish", amount: "4-5 slices", oxalate: 2 },
          { name: "Mixed greens base", amount: "2 cups", oxalate: 4 },
          { name: "Lemon garlic dressing", amount: "2 tbsp", oxalate: 1 },
        ]},
      { dish: "Veggie Quiche", modifications: "Moderate choice — cheese is zero oxalate; veggies vary by day. Ask what vegetables are in it", cookingMethod: "Farmers market vegetables baked with mozzarella, parmesan, swiss in egg custard", total: 15,
        ingredients: [
          { name: "Egg custard base", amount: "2 eggs worth", oxalate: 0 },
          { name: "Mozzarella", amount: "1 oz", oxalate: 0 },
          { name: "Parmesan", amount: "1 tbsp", oxalate: 0 },
          { name: "Swiss cheese", amount: "1 oz", oxalate: 0 },
          { name: "Seasonal veggies (variable)", amount: "1/2 cup", oxalate: 10 },
          { name: "Pastry crust", amount: "1 slice", oxalate: 3 },
          { name: "Salt & herbs", amount: "to taste", oxalate: 1 },
        ]},
      { dish: "Cauliflower Sandwich (Vegan)", modifications: "CAUTION: pistachio pesto adds ~14mg and pepitas ~12mg — ask to sub aioli for pesto or omit pepitas", cookingMethod: "Roasted cauliflower with pistachio pesto and pepitas on bread (vegan)", total: 32,
        ingredients: [
          { name: "Roasted cauliflower", amount: "3/4 cup", oxalate: 2 },
          { name: "Pistachio pesto", amount: "2 tbsp", oxalate: 14 },
          { name: "Pepitas", amount: "2 tbsp", oxalate: 12 },
          { name: "Bread (sourdough)", amount: "2 slices", oxalate: 3 },
          { name: "Greens", amount: "small handful", oxalate: 1 },
        ]},
      { dish: "Greenbean Salad", modifications: "CAUTION: green beans at ~15mg and potatoes at ~10mg combine for a high total; share or skip", cookingMethod: "Green beans, tomato, cucumber, potato, pickled red onions, cilantro dressing", total: 38,
        ingredients: [
          { name: "Green beans", amount: "1 cup", oxalate: 15 },
          { name: "Tomato", amount: "1/4 cup", oxalate: 3 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
          { name: "Potato", amount: "1/3 cup", oxalate: 8 },
          { name: "Pickled red onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Cilantro dressing", amount: "2 tbsp", oxalate: 2 },
          { name: "Mixed greens base", amount: "1 cup", oxalate: 4 },
          { name: "Salt & pepper", amount: "to taste", oxalate: 0 },
        ]},
      { dish: "Eggplant Sandwich (Vegan)", modifications: "AVOID — eggplant is high oxalate (~18mg) and pomegranate-walnut pesto adds ~30mg. Very high total", cookingMethod: "Grilled eggplant, pomegranate-walnut pesto, greens, pepitas, pickles on bread (vegan)", total: 68,
        ingredients: [
          { name: "Grilled eggplant", amount: "3/4 cup", oxalate: 18 },
          { name: "Pomegranate-walnut pesto", amount: "2 tbsp", oxalate: 30 },
          { name: "Pepitas", amount: "2 tbsp", oxalate: 12 },
          { name: "Mixed greens", amount: "small handful", oxalate: 2 },
          { name: "Pickles", amount: "3-4 slices", oxalate: 2 },
          { name: "Bread (sourdough)", amount: "2 slices", oxalate: 3 },
          { name: "Pomegranate seeds", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Ratatouille (Vegan)", modifications: "AVOID — eggplant is high oxalate and squash/peppers add up. Very high total", cookingMethod: "Braised eggplant, squash, tomato, peppers, onions, garlic (vegan)", total: 52,
        ingredients: [
          { name: "Eggplant", amount: "1/2 cup", oxalate: 18 },
          { name: "Zucchini/squash", amount: "1/2 cup", oxalate: 4 },
          { name: "Tomato", amount: "1/2 cup", oxalate: 6 },
          { name: "Bell peppers", amount: "1/4 cup", oxalate: 3 },
          { name: "Onions", amount: "1/4 cup", oxalate: 3 },
          { name: "Garlic", amount: "2 cloves", oxalate: 0 },
          { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
        ]},
      { dish: "Beet Salad", modifications: "AVOID — beets are extremely high oxalate (~76mg per half cup). Do not order if managing kidney stones", cookingMethod: "Roasted beets, shaved fennel, roasted corn, parmesan, greens, balsamic dressing", total: 101,
        ingredients: [
          { name: "Roasted beets", amount: "1/2 cup", oxalate: 76 },
          { name: "Shaved fennel", amount: "1/4 cup", oxalate: 5 },
          { name: "Roasted corn", amount: "1/4 cup", oxalate: 10 },
          { name: "Parmesan", amount: "1 tbsp", oxalate: 0 },
          { name: "Mixed greens", amount: "2 cups", oxalate: 5 },
          { name: "Balsamic dressing", amount: "2 tbsp", oxalate: 3 },
          { name: "Walnuts (if included)", amount: "1 tbsp", oxalate: 2 },
        ]},
      { dish: "Curry Bowl (Vegan)", modifications: "CAUTION: pumpkin/squash adds up and pepitas are high. Request no pepitas to save ~12mg", cookingMethod: "Roasted veggies, pumpkin, carrots, cauliflower, green coconut curry, pepitas (vegan)", total: 37,
        ingredients: [
          { name: "Cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Carrots", amount: "1/4 cup", oxalate: 3 },
          { name: "Roasted pumpkin/squash", amount: "1/2 cup", oxalate: 4 },
          { name: "Green coconut curry sauce", amount: "1/4 cup", oxalate: 6 },
          { name: "Pepitas", amount: "2 tbsp", oxalate: 12 },
          { name: "Rice or grain base", amount: "3/4 cup", oxalate: 6 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Lime juice", amount: "1 tbsp", oxalate: 1 },
          { name: "Coconut milk", amount: "2 tbsp", oxalate: 2 },
        ]},
    ]
  },

  {
    name: "Pie 'n Burger", area: "Pasadena", type: "Restaurant",
    lat: 34.1421, lng: -118.1318, hasLowOxalate: true,
    options: [
      { dish: "Two Eggs & Bacon", modifications: "None needed — one of the best low-oxalate breakfasts anywhere", cookingMethod: "Fried or scrambled eggs, crispy bacon, served with toast", total: 4,
        ingredients: [
          { name: "Eggs", amount: "2 large", oxalate: 0 },
          { name: "Bacon strips", amount: "3 strips", oxalate: 0 },
          { name: "White toast", amount: "1 slice", oxalate: 2 },
          { name: "Butter", amount: "1 tsp", oxalate: 0 },
          { name: "Salt & pepper", amount: "to taste", oxalate: 0 },
        ]},
      { dish: "Ham & Cheese Omelet", modifications: "None needed — ham, eggs and cheese are all zero oxalate", cookingMethod: "Pan-cooked egg omelet with sliced ham and melted cheese", total: 2,
        ingredients: [
          { name: "Eggs", amount: "3 large", oxalate: 0 },
          { name: "Sliced ham", amount: "2 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "White toast (side)", amount: "1 slice", oxalate: 2 },
        ]},
      { dish: "Bacon or Sausage Omelet", modifications: "None needed — all zero-oxalate ingredients", cookingMethod: "Pan-cooked egg omelet with bacon or sausage", total: 2,
        ingredients: [
          { name: "Eggs", amount: "3 large", oxalate: 0 },
          { name: "Bacon or sausage", amount: "2 oz", oxalate: 0 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "White toast (side)", amount: "1 slice", oxalate: 2 },
        ]},
      { dish: "Ham or Pork Chops Breakfast", modifications: "None needed — excellent low-oxalate protein plate", cookingMethod: "Pan-seared ham or pork chops, served with eggs and hashbrowns", total: 7,
        ingredients: [
          { name: "Ham or pork chops", amount: "4 oz", oxalate: 0 },
          { name: "Eggs (2)", amount: "2 large", oxalate: 0 },
          { name: "Hashbrowns", amount: "1/2 cup", oxalate: 5 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Salt & pepper", amount: "to taste", oxalate: 0 },
        ]},
      { dish: "Breakfast Burrito", modifications: "Request no added salsa or swap for mild; hashbrowns inside add ~5mg", cookingMethod: "Scrambled eggs, choice of meat, cheese, and hashbrowns wrapped in flour tortilla", total: 10,
        ingredients: [
          { name: "Scrambled eggs (3)", amount: "3 large", oxalate: 0 },
          { name: "Meat of choice (bacon/sausage/ham)", amount: "2 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
          { name: "Hashbrowns", amount: "1/2 cup", oxalate: 5 },
          { name: "Flour tortilla", amount: "1 large", oxalate: 3 },
          { name: "Butter", amount: "1 tsp", oxalate: 0 },
        ]},
      { dish: "Hamburger", modifications: "Classic low-oxalate choice — skip the pickle if very strict, but it's only ~1mg", cookingMethod: "Beef patty on toasted bun with Thousand Island, pickles, lettuce, tomato, cheese", total: 10,
        ingredients: [
          { name: "Beef patty", amount: "4 oz", oxalate: 0 },
          { name: "Toasted white bun", amount: "1 bun", oxalate: 2 },
          { name: "Cheddar cheese", amount: "1 slice", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "1 slice", oxalate: 2 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
          { name: "Thousand Island dressing", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Grilled Chicken Sandwich", modifications: "None needed — great lean low-oxalate option", cookingMethod: "Grilled chicken breast on toasted bun with lettuce, tomato", total: 9,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Toasted white bun", amount: "1 bun", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
        ]},
      { dish: "Turkey Sandwich", modifications: "None needed — request on white bread for lowest oxalate", cookingMethod: "Sliced roast turkey on toasted bread with lettuce, tomato", total: 8,
        ingredients: [
          { name: "Sliced roast turkey", amount: "4 oz", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
          { name: "Swiss cheese", amount: "1 slice", oxalate: 0 },
        ]},
      { dish: "B.L.T.", modifications: "None needed — bacon, lettuce, tomato on white is a classic low-oxalate sandwich", cookingMethod: "Crispy bacon, romaine lettuce, tomato on toasted white bread with mayo", total: 7,
        ingredients: [
          { name: "Bacon strips", amount: "3-4 strips", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1-2 leaves", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Grilled Tuna Sandwich", modifications: "None needed — tuna is zero oxalate; white bread keeps it clean", cookingMethod: "Grilled or tuna salad on toasted white bread with lettuce, tomato", total: 7,
        ingredients: [
          { name: "Tuna", amount: "4 oz", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
        ]},
      { dish: "Tri-Tip Sandwich", modifications: "Request on ciabatta or white roll; spring mix greens add ~5mg — swap for romaine to reduce", cookingMethod: "Sliced tri-tip steak on ciabatta with provolone, greens, mayo", total: 12,
        ingredients: [
          { name: "Tri-tip steak (sliced)", amount: "4 oz", oxalate: 0 },
          { name: "Ciabatta roll", amount: "1 roll", oxalate: 3 },
          { name: "Provolone cheese", amount: "2 slices", oxalate: 0 },
          { name: "Spring mix greens", amount: "1/4 cup", oxalate: 4 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
          { name: "Sliced onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Olive oil", amount: "1 tsp", oxalate: 0 },
        ]},
      { dish: "Lo Cal Plate", modifications: "Unique low-calorie plate — cottage cheese and peaches are both low oxalate", cookingMethod: "Beef patty served with canned peaches, cottage cheese, and rye crisp", total: 11,
        ingredients: [
          { name: "Beef patty", amount: "4 oz", oxalate: 0 },
          { name: "Canned peaches", amount: "1/2 cup", oxalate: 4 },
          { name: "Cottage cheese", amount: "1/2 cup", oxalate: 0 },
          { name: "Rye crisp crackers", amount: "2 crackers", oxalate: 4 },
          { name: "Lettuce leaf", amount: "1 leaf", oxalate: 1 },
        ]},
      { dish: "Quiche", modifications: "Ham, eggs and cheese are all zero oxalate; green onions add minimal", cookingMethod: "Baked egg custard with ham, cheddar cheese, and green onions in pie crust", total: 9,
        ingredients: [
          { name: "Eggs (6 for whole quiche)", amount: "per slice: ~1.5 eggs", oxalate: 0 },
          { name: "Ham (cubed)", amount: "1.5 oz per slice", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 oz per slice", oxalate: 0 },
          { name: "Green onions (sliced)", amount: "1 tbsp", oxalate: 2 },
          { name: "Milk or cream", amount: "2 tbsp", oxalate: 0 },
          { name: "Pie crust (unbaked)", amount: "1 slice portion", oxalate: 3 },
          { name: "Salt & pepper", amount: "to taste", oxalate: 0 },
        ]},
      { dish: "Patty Melt", modifications: "Rye bread adds ~6mg — request on white bread instead to reduce to ~4mg total", cookingMethod: "Beef patty with melted cheese and grilled onions on rye bread", total: 12,
        ingredients: [
          { name: "Beef patty", amount: "4 oz", oxalate: 0 },
          { name: "Rye bread", amount: "2 slices", oxalate: 6 },
          { name: "Swiss cheese", amount: "1 slice", oxalate: 0 },
          { name: "Grilled onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Thousand Island", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Strip Steak", modifications: "None needed — steak is zero oxalate; green salad and hashbrowns add minimal", cookingMethod: "Grilled strip steak served with green salad and hashbrowns", total: 12,
        ingredients: [
          { name: "Strip steak", amount: "8 oz", oxalate: 0 },
          { name: "Green salad (romaine, tomato)", amount: "1 cup", oxalate: 5 },
          { name: "Hashbrowns", amount: "1/2 cup", oxalate: 5 },
          { name: "Toasted bun (side)", amount: "1 bun", oxalate: 2 },
        ]},
      { dish: "Chili Size", modifications: "CAUTION: chili has tomatoes and kidney beans (~15mg combined) — enjoy occasionally", cookingMethod: "Two beef patties topped with house chili on a toasted bun", total: 22,
        ingredients: [
          { name: "Beef patties (2)", amount: "6 oz total", oxalate: 0 },
          { name: "House chili", amount: "1/2 cup", oxalate: 15 },
          { name: "Toasted bun", amount: "1 bun", oxalate: 2 },
          { name: "Cheddar cheese (optional)", amount: "1 slice", oxalate: 0 },
          { name: "Onion (optional)", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Chicken Pot Pie", modifications: "CAUTION: frozen veggie mix (peas, carrots, green beans, corn) adds ~18mg; eat half portion", cookingMethod: "Boneless chicken, butter sauce, celery, onion, flour, milk, frozen veggies in pastry", total: 32,
        ingredients: [
          { name: "Chicken breast", amount: "3 oz per serving", oxalate: 0 },
          { name: "Frozen veggie mix (carrots, peas, beans, corn)", amount: "1/2 cup", oxalate: 18 },
          { name: "Celery", amount: "2 tbsp", oxalate: 3 },
          { name: "Onion", amount: "2 tbsp", oxalate: 2 },
          { name: "Milk", amount: "2 tbsp", oxalate: 0 },
          { name: "Butter sauce (flour-based)", amount: "3 tbsp", oxalate: 2 },
          { name: "Pastry crust (top & bottom)", amount: "1 portion", oxalate: 4 },
          { name: "Salt, pepper, celery seed", amount: "to taste", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Tender Greens", area: "Pasadena", type: "Restaurant",
    lat: 34.1469, lng: -118.1501, hasLowOxalate: false,
    options: [
      { dish: "Chipotle BBQ Chicken Salad", modifications: "Skip crispy tortilla strips to cut ~4mg; dressing is low-oxalate", cookingMethod: "Grilled chipotle BBQ chicken over romaine with fresh toppings", total: 18,
        ingredients: [
          { name: "Grilled chipotle BBQ chicken", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Queso fresco", amount: "1 oz", oxalate: 0 },
          { name: "Radish slices", amount: "4-5 slices", oxalate: 2 },
          { name: "Green onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Crispy tortilla strips", amount: "2 tbsp", oxalate: 4 },
          { name: "Cilantro", amount: "2 tbsp", oxalate: 1 },
          { name: "Lime dressing", amount: "2 tbsp", oxalate: 1 },
          { name: "Chipotle BBQ sauce", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Grilled Chicken Cobb Salad", modifications: "Excellent choice — blue cheese, bacon, egg are all zero oxalate", cookingMethod: "Grilled chicken over romaine with classic Cobb toppings", total: 14,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Blue cheese crumbles", amount: "1 oz", oxalate: 0 },
          { name: "Bacon", amount: "2 strips", oxalate: 0 },
          { name: "Egg", amount: "1 large", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Cherry tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Tarragon dressing", amount: "2 tbsp", oxalate: 1 },
          { name: "Black pepper", amount: "to taste", oxalate: 0 },
        ]},
      { dish: "Tuna Nicoise Salad", modifications: "Fingerling potatoes add ~10mg — ask for a smaller portion to reduce", cookingMethod: "Seared or canned tuna, roasted potatoes, baby greens, sherry vinaigrette", total: 36,
        ingredients: [
          { name: "Tuna (seared or canned)", amount: "4 oz", oxalate: 0 },
          { name: "Baby greens mix", amount: "2 cups", oxalate: 5 },
          { name: "Cherry tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Roasted fingerling potatoes", amount: "1/2 cup", oxalate: 10 },
          { name: "Capers", amount: "1 tbsp", oxalate: 2 },
          { name: "French green beans", amount: "1/2 cup", oxalate: 8 },
          { name: "Egg", amount: "1 large", oxalate: 0 },
          { name: "Black olives", amount: "5-6 olives", oxalate: 2 },
          { name: "Sherry vinaigrette", amount: "2 tbsp", oxalate: 1 },
          { name: "Red onion (light)", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Mediterranean Steak Salad", modifications: "Arugula has moderate oxalate (~4mg) — ask for extra red gem instead", cookingMethod: "Grilled steak over red gem lettuce and arugula with Mediterranean toppings", total: 22,
        ingredients: [
          { name: "Grilled steak", amount: "5 oz", oxalate: 0 },
          { name: "Red gem lettuce", amount: "1.5 cups", oxalate: 4 },
          { name: "Arugula", amount: "1 cup", oxalate: 4 },
          { name: "Feta cheese", amount: "1 oz", oxalate: 0 },
          { name: "Cherry tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Pickled cucumbers", amount: "2 tbsp", oxalate: 2 },
          { name: "Sweet peppers", amount: "1/4 cup", oxalate: 3 },
          { name: "Green olives", amount: "5-6 olives", oxalate: 2 },
          { name: "Lemon vinaigrette", amount: "2 tbsp", oxalate: 1 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
        ]},
      { dish: "Grilled Salmon Salad", modifications: "Sesame seeds add ~5mg — skip to reduce; miso mayo adds ~6mg", cookingMethod: "Grilled salmon over gem lettuce with Asian-inspired toppings", total: 34,
        ingredients: [
          { name: "Grilled salmon", amount: "5 oz", oxalate: 0 },
          { name: "Gem lettuces", amount: "2 cups", oxalate: 4 },
          { name: "Miso mayo", amount: "2 tbsp", oxalate: 6 },
          { name: "Pickled cucumber & onion", amount: "3 tbsp", oxalate: 3 },
          { name: "Cherry tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Papaya", amount: "1/4 cup", oxalate: 4 },
          { name: "Cilantro", amount: "2 tbsp", oxalate: 1 },
          { name: "Sesame seeds", amount: "1 tsp", oxalate: 5 },
          { name: "Ginger dressing", amount: "2 tbsp", oxalate: 1 },
          { name: "Green onions", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Fried Chicken Sandwich", modifications: "Sesame bun adds ~4mg; overall moderate — reasonable occasional choice", cookingMethod: "Country-style fried chicken breast, cabbage slaw, spicy maple glaze, miso mayo", total: 22,
        ingredients: [
          { name: "Fried chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Cabbage slaw", amount: "1/4 cup", oxalate: 4 },
          { name: "Pickles", amount: "3-4 slices", oxalate: 2 },
          { name: "Spicy maple glaze", amount: "1 tbsp", oxalate: 2 },
          { name: "Miso mayo", amount: "1 tbsp", oxalate: 3 },
          { name: "Sesame bun", amount: "1 bun", oxalate: 4 },
          { name: "Lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato slice", amount: "1 slice", oxalate: 1 },
        ]},
      { dish: "Chicken Pesto Sandwich", modifications: "Sunflower seed pesto is lower than nut-based pesto (~8mg); good choice", cookingMethod: "Grilled chicken breast, provolone, sourdough with sunflower seed pesto", total: 18,
        ingredients: [
          { name: "Chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Provolone cheese", amount: "1 oz", oxalate: 0 },
          { name: "Preserved tomatoes", amount: "2 tbsp", oxalate: 2 },
          { name: "Arugula", amount: "1/2 cup", oxalate: 2 },
          { name: "Sunflower seed pesto", amount: "2 tbsp", oxalate: 8 },
          { name: "Aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Grilled sourdough", amount: "2 slices", oxalate: 4 },
          { name: "Fresh basil", amount: "garnish", oxalate: 1 },
        ]},
      { dish: "Salami & Provolone Sandwich", modifications: "Sunflower pesto is reasonable; giardiniera (pickled veggies) very low oxalate", cookingMethod: "Italian meats with provolone and sunflower seed pesto on grilled sourdough", total: 16,
        ingredients: [
          { name: "Salami", amount: "2 oz", oxalate: 0 },
          { name: "Mortadella", amount: "2 oz", oxalate: 0 },
          { name: "Provolone cheese", amount: "1 oz", oxalate: 0 },
          { name: "Sunflower seed pesto", amount: "2 tbsp", oxalate: 8 },
          { name: "Giardiniera (pickled veggies)", amount: "2 tbsp", oxalate: 2 },
          { name: "Aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Grilled sourdough", amount: "2 slices", oxalate: 4 },
          { name: "Mustard (optional)", amount: "1 tsp", oxalate: 1 },
        ]},
      { dish: "Tomato Mozzarella Sandwich", modifications: "Skip arugula for romaine to reduce by ~2mg; one of the better sandwich options", cookingMethod: "Fresh mozzarella, preserved tomatoes, arugula, sunflower pesto on sourdough", total: 19,
        ingredients: [
          { name: "Fresh mozzarella", amount: "2 oz", oxalate: 0 },
          { name: "Preserved tomatoes", amount: "3 tbsp", oxalate: 3 },
          { name: "Arugula", amount: "1 cup", oxalate: 4 },
          { name: "Sunflower seed pesto", amount: "2 tbsp", oxalate: 8 },
          { name: "Aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Grilled sourdough", amount: "2 slices", oxalate: 4 },
        ]},
      { dish: "Longevity Bowl (Grilled Sea Bass)", modifications: "Fingerling potatoes and mushrooms are the main oxalate contributors — skip or reduce", cookingMethod: "Panzanella salad base with caramelized apples, winter squash, roasted vegetables, labneh", total: 38,
        ingredients: [
          { name: "Grilled sea bass", amount: "5 oz", oxalate: 0 },
          { name: "Panzanella bread", amount: "1/2 cup cubed", oxalate: 3 },
          { name: "Caramelized apples", amount: "1/4 cup", oxalate: 2 },
          { name: "Winter squash", amount: "1/2 cup", oxalate: 4 },
          { name: "Roasted tomato vinaigrette", amount: "2 tbsp", oxalate: 5 },
          { name: "Tokyo turnips", amount: "1/4 cup", oxalate: 3 },
          { name: "Mushrooms", amount: "1/2 cup", oxalate: 2 },
          { name: "Fingerling potatoes", amount: "1/3 cup", oxalate: 7 },
          { name: "Olive oil labneh", amount: "2 tbsp", oxalate: 1 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
        ]},
      { dish: "California Bowl (Grilled Salmon)", modifications: "Brown rice adds ~8mg; swap for white rice if possible. Pepitas are the big contributor at ~12mg — ask to skip", cookingMethod: "Grilled salmon over cilantro lime brown rice with butternut squash salsa", total: 44,
        ingredients: [
          { name: "Grilled salmon", amount: "5 oz", oxalate: 0 },
          { name: "Cilantro lime brown rice", amount: "1 cup", oxalate: 8 },
          { name: "Roasted butternut squash salsa", amount: "1/4 cup", oxalate: 4 },
          { name: "Cabbage slaw", amount: "1/4 cup", oxalate: 4 },
          { name: "Queso fresco", amount: "1 oz", oxalate: 0 },
          { name: "Pepitas", amount: "2 tbsp", oxalate: 12 },
          { name: "Lime crema", amount: "2 tbsp", oxalate: 1 },
          { name: "Cilantro", amount: "2 tbsp", oxalate: 1 },
          { name: "Lime juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Thai Bowl (Grilled Shrimp)", modifications: "Thai basil adds ~8mg; spicy thai vinaigrette adds ~3mg. Toasted coconut adds ~4mg. High overall — eat half portion", cookingMethod: "Grilled shrimp over sushi rice with Thai-inspired toppings and chili vinaigrette", total: 46,
        ingredients: [
          { name: "Grilled shrimp", amount: "4 oz", oxalate: 0 },
          { name: "Sushi rice", amount: "3/4 cup", oxalate: 4 },
          { name: "Toasted coconut", amount: "2 tbsp", oxalate: 4 },
          { name: "Green papaya", amount: "1/4 cup", oxalate: 4 },
          { name: "Cabbage", amount: "1/4 cup", oxalate: 4 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Carrots", amount: "2 tbsp", oxalate: 2 },
          { name: "Cucumbers", amount: "2 tbsp", oxalate: 1 },
          { name: "Thai basil", amount: "2 tbsp", oxalate: 8 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Pickled fresno chilis", amount: "1 tbsp", oxalate: 2 },
          { name: "Spicy Thai chili vinaigrette", amount: "2 tbsp", oxalate: 3 },
        ]},
    ]
  },
  {
    name: "Sweetgreen", area: "Pasadena", type: "Cafe",
    lat: 34.1451, lng: -118.1498, hasLowOxalate: false,
    options: [
      { dish: "Chicken + Squash Plate", modifications: "Almonds add ~9mg; swap for goat cheese extra or skip to reduce. Quinoa & wild rice are moderate", cookingMethod: "Roasted chicken and maple glazed squash over golden quinoa and wild rice", total: 44,
        ingredients: [
          { name: "Roasted chicken", amount: "4 oz", oxalate: 0 },
          { name: "Maple glazed squash", amount: "1/2 cup", oxalate: 4 },
          { name: "Charred balsamic cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Goat cheese", amount: "1 oz", oxalate: 0 },
          { name: "Roasted almonds", amount: "2 tbsp", oxalate: 9 },
          { name: "Golden quinoa", amount: "1/2 cup", oxalate: 6 },
          { name: "Wild rice", amount: "1/2 cup", oxalate: 6 },
          { name: "Apple vinaigrette", amount: "2 tbsp", oxalate: 2 },
        ]},
      { dish: "Steak Mezze Bowl", modifications: "Best bowl here — white rice base, cucumber and tomato are all low. Skip crispy onions to save ~2mg", cookingMethod: "Caramelized garlic steak over white rice with hummus and fresh Mediterranean toppings", total: 20,
        ingredients: [
          { name: "Caramelized garlic steak", amount: "4 oz", oxalate: 0 },
          { name: "Hummus", amount: "2 tbsp", oxalate: 4 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Cucumbers", amount: "1/4 cup", oxalate: 1 },
          { name: "Crispy onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Pickled onions", amount: "1 tbsp", oxalate: 2 },
          { name: "White rice", amount: "1/2 cup", oxalate: 2 },
          { name: "Lime cilantro sauce", amount: "2 tbsp", oxalate: 2 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Chicken Avocado Ranch Bowl", modifications: "Solid choice — romaine and avocado are low; tortilla chips add ~4mg, skip to reduce further", cookingMethod: "Blackened chicken over white rice and romaine with avocado and green goddess ranch", total: 22,
        ingredients: [
          { name: "Blackened chicken", amount: "4 oz", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 3 },
          { name: "Pickled onions", amount: "1 tbsp", oxalate: 2 },
          { name: "Apples", amount: "2 tbsp", oxalate: 2 },
          { name: "Tortilla chips", amount: "small handful", oxalate: 4 },
          { name: "White rice", amount: "1/2 cup", oxalate: 2 },
          { name: "Chopped romaine", amount: "2 cups", oxalate: 5 },
          { name: "Green goddess ranch", amount: "2 tbsp", oxalate: 1 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Miso Glazed Salmon (High Protein)", modifications: "Good option — skip crispy onions to save 2mg; spicy cashew sauce adds ~8mg, ask for half", cookingMethod: "Miso glazed salmon over white rice with avocado, cucumbers and spicy cashew sauce", total: 27,
        ingredients: [
          { name: "Miso glazed salmon", amount: "4 oz", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 3 },
          { name: "Cucumbers", amount: "1/4 cup", oxalate: 1 },
          { name: "Pickled onions", amount: "1 tbsp", oxalate: 2 },
          { name: "Crispy onions", amount: "2 tbsp", oxalate: 2 },
          { name: "White rice", amount: "1/2 cup", oxalate: 2 },
          { name: "Nori sesame seasoning", amount: "1 tsp", oxalate: 3 },
          { name: "Spicy cashew sauce", amount: "2 tbsp", oxalate: 8 },
          { name: "Lime juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Steak Honey Crunch Bowl", modifications: "Herbed quinoa adds ~6mg; garlic breadcrumbs ~3mg. Romaine base keeps it reasonable", cookingMethod: "Caramelized garlic steak over herbed quinoa and chopped romaine with hot honey mustard", total: 25,
        ingredients: [
          { name: "Caramelized garlic steak", amount: "4 oz", oxalate: 0 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Garlic breadcrumbs", amount: "2 tbsp", oxalate: 3 },
          { name: "Pickled onions", amount: "1 tbsp", oxalate: 2 },
          { name: "Herbed quinoa", amount: "1/2 cup", oxalate: 6 },
          { name: "Chopped romaine", amount: "2 cups", oxalate: 5 },
          { name: "Hot honey mustard sauce", amount: "2 tbsp", oxalate: 1 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Buffalo Chicken Salad", modifications: "Skip kale to save ~18mg — ask for all romaine instead. Feta and carrots are low", cookingMethod: "Blackened chicken over romaine and kale with feta, carrots and caesar dressing", total: 38,
        ingredients: [
          { name: "Blackened chicken", amount: "4 oz", oxalate: 0 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Feta cheese", amount: "1 oz", oxalate: 0 },
          { name: "Raw carrots", amount: "1/4 cup", oxalate: 2 },
          { name: "Pickled onions", amount: "1 tbsp", oxalate: 2 },
          { name: "Garlic breadcrumbs", amount: "2 tbsp", oxalate: 3 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Chopped romaine", amount: "1.5 cups", oxalate: 4 },
          { name: "Shredded kale", amount: "1 cup", oxalate: 18 },
          { name: "Caesar dressing", amount: "2 tbsp", oxalate: 1 },
          { name: "Sweetgreen hot sauce", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Kale Caesar Salad", modifications: "Swap kale for all romaine to cut ~18mg — caesar and parmesan are near-zero", cookingMethod: "Roasted chicken over kale and romaine with shaved parmesan and caesar dressing", total: 33,
        ingredients: [
          { name: "Roasted chicken", amount: "4 oz", oxalate: 0 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Shaved parmesan", amount: "1 oz", oxalate: 0 },
          { name: "Crips (croutons)", amount: "2 tbsp", oxalate: 2 },
          { name: "Shredded kale", amount: "1 cup", oxalate: 18 },
          { name: "Chopped romaine", amount: "1 cup", oxalate: 3 },
          { name: "Caesar dressing", amount: "2 tbsp", oxalate: 1 },
          { name: "Lime squeeze", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Guacamole Greens Salad", modifications: "Spring mix is low; tortilla chips add ~4mg. Skip kale on the side if adding — romaine only", cookingMethod: "Roasted chicken over spring mix and romaine with avocado and lime cilantro vinaigrette", total: 24,
        ingredients: [
          { name: "Roasted chicken", amount: "4 oz", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 3 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Pickled onions", amount: "1 tbsp", oxalate: 2 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Tortilla chips", amount: "small handful", oxalate: 4 },
          { name: "Organic spring mix", amount: "1 cup", oxalate: 3 },
          { name: "Chopped romaine", amount: "1 cup", oxalate: 3 },
          { name: "Lime cilantro jalapeno vinaigrette", amount: "2 tbsp", oxalate: 2 },
          { name: "Lime squeeze", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Hot Honey Chicken (High Protein)", modifications: "CAUTION: sweet potatoes add ~25mg. Swap for white rice if available to cut significantly", cookingMethod: "Blackened chicken over golden quinoa with roasted sweet potatoes and hot honey mustard", total: 43,
        ingredients: [
          { name: "Blackened chicken", amount: "4 oz", oxalate: 0 },
          { name: "Roasted sweet potatoes", amount: "1/2 cup", oxalate: 25 },
          { name: "Napa cabbage slaw", amount: "1/4 cup", oxalate: 2 },
          { name: "Crispy onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Golden quinoa", amount: "1/2 cup", oxalate: 6 },
          { name: "Hot honey mustard sauce", amount: "2 tbsp", oxalate: 1 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "BBQ Chicken Salad", modifications: "Swap kale for extra romaine to save ~18mg; tortilla chips add ~4mg, skip if strict", cookingMethod: "Blackened chicken over romaine and kale with apples, tortilla chips and honey BBQ sauce", total: 46,
        ingredients: [
          { name: "Blackened chicken", amount: "4 oz", oxalate: 0 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Pickled onions", amount: "1 tbsp", oxalate: 2 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Apples", amount: "2 tbsp", oxalate: 2 },
          { name: "Tortilla chips", amount: "small handful", oxalate: 4 },
          { name: "Chopped romaine", amount: "1.5 cups", oxalate: 4 },
          { name: "Shredded kale", amount: "1 cup", oxalate: 18 },
          { name: "Honey BBQ sauce", amount: "2 tbsp", oxalate: 2 },
          { name: "Green goddess ranch", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Crispy Rice Bowl", modifications: "CAUTION: almonds add ~9mg; arugula ~4mg; spicy cashew ~8mg. Skip almonds + ask for half cashew sauce", cookingMethod: "Blackened chicken over wild rice and arugula with cabbage, carrots and spicy cashew", total: 47,
        ingredients: [
          { name: "Blackened chicken", amount: "4 oz", oxalate: 0 },
          { name: "Raw carrots", amount: "1/4 cup", oxalate: 2 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Cucumbers", amount: "1/4 cup", oxalate: 1 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Roasted almonds", amount: "2 tbsp", oxalate: 9 },
          { name: "Crispy rice", amount: "1/4 cup", oxalate: 3 },
          { name: "Wild rice", amount: "1/2 cup", oxalate: 6 },
          { name: "Organic arugula", amount: "1 cup", oxalate: 4 },
          { name: "Spicy cashew sauce", amount: "2 tbsp", oxalate: 8 },
          { name: "Lime squeeze", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Fish Taco Bowl", modifications: "CAUTION: almonds ~9mg, tortilla chips ~4mg. Ask to swap wild rice for white rice; skip almonds", cookingMethod: "Miso glazed salmon over golden quinoa and arugula with avocado and lime cilantro sauce", total: 48,
        ingredients: [
          { name: "Miso glazed salmon", amount: "4 oz", oxalate: 0 },
          { name: "Organic arugula", amount: "1 cup", oxalate: 4 },
          { name: "Golden quinoa", amount: "1/2 cup", oxalate: 6 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Tortilla chips", amount: "small handful", oxalate: 4 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 3 },
          { name: "Roasted almonds", amount: "2 tbsp", oxalate: 9 },
          { name: "Lime cilantro jalapeno sauce", amount: "2 tbsp", oxalate: 2 },
          { name: "Sweetgreen hot sauce", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Caramelized Garlic Steak (High Protein)", modifications: "CAUTION: sweet potatoes add ~25mg; spicy broccoli is low at ~2mg. Swap sweet potato for white rice if possible", cookingMethod: "Caramelized garlic steak over wild rice with roasted sweet potatoes, spicy broccoli and pesto vinaigrette", total: 45,
        ingredients: [
          { name: "Caramelized garlic steak", amount: "4 oz", oxalate: 0 },
          { name: "Roasted sweet potatoes", amount: "1/2 cup", oxalate: 25 },
          { name: "Spicy broccoli", amount: "1/2 cup", oxalate: 2 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Wild rice", amount: "1/2 cup", oxalate: 6 },
          { name: "Pesto vinaigrette", amount: "2 tbsp", oxalate: 5 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Winter Harvest Bowl", modifications: "CAUTION: kale adds ~18mg + almonds ~9mg. Replace kale with romaine and skip almonds to bring to ~20mg", cookingMethod: "Roasted chicken over wild rice and kale with maple glazed squash, goat cheese and apple vinaigrette", total: 53,
        ingredients: [
          { name: "Roasted chicken", amount: "4 oz", oxalate: 0 },
          { name: "Maple glazed squash", amount: "1/2 cup", oxalate: 4 },
          { name: "Charred balsamic cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Goat cheese", amount: "1 oz", oxalate: 0 },
          { name: "Roasted almonds", amount: "2 tbsp", oxalate: 9 },
          { name: "Shredded kale", amount: "1.5 cups", oxalate: 27 },
          { name: "Wild rice", amount: "1/2 cup", oxalate: 6 },
          { name: "Apple vinaigrette", amount: "2 tbsp", oxalate: 2 },
        ]},
      { dish: "Chicken Pesto Parm Bowl", modifications: "CAUTION: spinach is very high oxalate (~66mg/cup). AVOID or replace spinach with romaine entirely", cookingMethod: "Roasted chicken over golden quinoa and baby spinach with spicy broccoli, tomatoes and pesto vinaigrette", total: 89,
        ingredients: [
          { name: "Roasted chicken", amount: "4 oz", oxalate: 0 },
          { name: "Spicy broccoli", amount: "1/2 cup", oxalate: 2 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Shaved parmesan", amount: "1 oz", oxalate: 0 },
          { name: "Garlic breadcrumbs", amount: "2 tbsp", oxalate: 3 },
          { name: "Golden quinoa", amount: "1/2 cup", oxalate: 6 },
          { name: "Organic baby spinach", amount: "1.5 cups", oxalate: 66 },
          { name: "Pesto vinaigrette", amount: "2 tbsp", oxalate: 5 },
          { name: "Sweetgreen hot sauce", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Harvest Bowl", modifications: "AVOID — sweet potatoes (~25mg) + kale (~18mg) + almonds (~9mg) = very high. Major modifications needed", cookingMethod: "Roasted chicken over wild rice and kale with roasted sweet potatoes, apples, almonds and balsamic vinaigrette", total: 73,
        ingredients: [
          { name: "Roasted chicken", amount: "4 oz", oxalate: 0 },
          { name: "Roasted sweet potatoes", amount: "1/2 cup", oxalate: 25 },
          { name: "Apples", amount: "2 tbsp", oxalate: 2 },
          { name: "Goat cheese", amount: "1 oz", oxalate: 0 },
          { name: "Roasted almonds", amount: "2 tbsp", oxalate: 9 },
          { name: "Wild rice", amount: "1/2 cup", oxalate: 6 },
          { name: "Shredded kale", amount: "1.5 cups", oxalate: 27 },
          { name: "Balsamic vinaigrette", amount: "2 tbsp", oxalate: 1 },
        ]},
      { dish: "Super Green Goddess Salad", modifications: "AVOID — kale + spinach + sweet potato + chickpeas all high. No good low-oxalate modification possible", cookingMethod: "Kale, baby spinach, roasted sweet potatoes, spicy broccoli, almonds, chickpeas, carrots, green goddess ranch", total: 136,
        ingredients: [
          { name: "Shredded kale", amount: "1 cup", oxalate: 18 },
          { name: "Baby spinach", amount: "1 cup", oxalate: 44 },
          { name: "Roasted sweet potatoes", amount: "1/2 cup", oxalate: 25 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Spicy broccoli", amount: "1/4 cup", oxalate: 1 },
          { name: "Roasted almonds", amount: "2 tbsp", oxalate: 9 },
          { name: "Chickpeas", amount: "1/4 cup", oxalate: 8 },
          { name: "Raw carrots", amount: "1/4 cup", oxalate: 2 },
          { name: "Green goddess ranch", amount: "2 tbsp", oxalate: 1 },
        ]},
      { dish: "Hummus Crunch Salad", modifications: "AVOID as-is — kale adds ~18mg + chickpeas ~8mg. Replace kale with romaine and skip chickpeas to get to ~20mg", cookingMethod: "Hummus, feta, chickpeas, tomatoes, cucumbers, kale and romaine with pesto vinaigrette", total: 58,
        ingredients: [
          { name: "Hummus", amount: "3 tbsp", oxalate: 6 },
          { name: "Feta crumble", amount: "1 oz", oxalate: 0 },
          { name: "Napa cabbage slaw", amount: "1/4 cup", oxalate: 2 },
          { name: "Chickpeas", amount: "1/4 cup", oxalate: 8 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Cucumbers", amount: "1/4 cup", oxalate: 1 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Garlic breadcrumbs", amount: "2 tbsp", oxalate: 3 },
          { name: "Basil", amount: "1 tbsp", oxalate: 2 },
          { name: "Shredded kale", amount: "1 cup", oxalate: 18 },
          { name: "Chopped romaine", amount: "1 cup", oxalate: 3 },
          { name: "Pesto vinaigrette", amount: "2 tbsp", oxalate: 5 },
        ]},
      { dish: "Shroomami Bowl", modifications: "AVOID — tofu adds ~15mg + kale ~18mg. Replace tofu with chicken and kale with romaine to bring to ~25mg", cookingMethod: "Roasted tofu, warm portobello mushrooms, cucumbers, basil, cabbage, almonds, wild rice, kale, miso sesame ginger", total: 71,
        ingredients: [
          { name: "Roasted tofu", amount: "4 oz", oxalate: 15 },
          { name: "Warm portobello mix", amount: "1/2 cup", oxalate: 2 },
          { name: "Cucumbers", amount: "1/4 cup", oxalate: 1 },
          { name: "Basil", amount: "1 tbsp", oxalate: 2 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Roasted almonds", amount: "2 tbsp", oxalate: 9 },
          { name: "Wild rice", amount: "1/2 cup", oxalate: 6 },
          { name: "Shredded kale", amount: "1.5 cups", oxalate: 27 },
          { name: "Miso sesame ginger dressing", amount: "2 tbsp", oxalate: 4 },
        ]},
    ]
  },
  {
    name: "Veggie Grill", area: "Pasadena", type: "Restaurant",
    lat: 34.1463, lng: -118.1519, hasLowOxalate: false,
    options: [
      { dish: "Buffalo Blitz Wrap", modifications: "Best option here — lettuce, tomato, pickles are all low. Ranch is near-zero. Crispy chik'n preferred over tempeh (~12mg)", cookingMethod: "Crispy buffalo chik'n or tempeh, house ranch, lettuce, tomato, pickles in a wrap", total: 19,
        ingredients: [
          { name: "Crispy buffalo chik'n", amount: "3 oz", oxalate: 4 },
          { name: "House-made ranch", amount: "2 tbsp", oxalate: 1 },
          { name: "Romaine lettuce", amount: "1 cup", oxalate: 3 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Pickles", amount: "3 slices", oxalate: 1 },
          { name: "Flour tortilla", amount: "1 large", oxalate: 5 },
          { name: "Hot sauce", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Cauliflower Taco", modifications: "Good low-oxalate taco — cauliflower, cabbage and aioli all low. Corn tortillas keep it clean", cookingMethod: "Crispy battered cauliflower, cilantro pesto, shredded cabbage, citrus sriracha aioli in corn tortillas", total: 16,
        ingredients: [
          { name: "Crispy cauliflower", amount: "3 oz", oxalate: 2 },
          { name: "Cilantro pesto", amount: "1 tbsp", oxalate: 3 },
          { name: "Shredded cabbage", amount: "1/4 cup", oxalate: 2 },
          { name: "Citrus sriracha aioli", amount: "1 tbsp", oxalate: 1 },
          { name: "Corn tortillas", amount: "2 tortillas", oxalate: 4 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Green onions", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Baja Taco", modifications: "Good option — avoid tofu version (~15mg extra). Fish-less filet or order cauliflower sub. Slaw and pico are low", cookingMethod: "Crispy fish-less filets or tofu, jalapeño slaw, cilantro, pico de gallo in corn tortillas", total: 18,
        ingredients: [
          { name: "Crispy fish-less filets", amount: "3 oz", oxalate: 4 },
          { name: "Jalapeño slaw", amount: "1/4 cup", oxalate: 3 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Pico de gallo", amount: "3 tbsp", oxalate: 3 },
          { name: "Corn tortillas", amount: "2 tortillas", oxalate: 4 },
          { name: "Lime juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Pan Seared Salmon Plate", modifications: "Best plate option — salmon is zero oxalate. Choose chimichurri (~2mg) over teriyaki. Mango salsa is low", cookingMethod: "Pan-seared Oshi salmon with chimichurri or teriyaki and fresh mango salsa", total: 8,
        ingredients: [
          { name: "Pan-seared salmon", amount: "5 oz", oxalate: 0 },
          { name: "Chimichurri sauce", amount: "2 tbsp", oxalate: 2 },
          { name: "Fresh mango salsa", amount: "1/4 cup", oxalate: 3 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Lime juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Tejano Taco", modifications: "Choose chik'n over walnut meat (~18mg) or Beyond crumbles (~5mg). Queso and lettuce are low", cookingMethod: "Beefy crumbles or walnut taco meat, queso, shredded lettuce, pico de gallo, cilantro, pepper crema in corn tortillas", total: 24,
        ingredients: [
          { name: "Tex-Mex beefy crumbles (Beyond)", amount: "3 oz", oxalate: 5 },
          { name: "House-made queso", amount: "2 tbsp", oxalate: 0 },
          { name: "Shredded lettuce", amount: "1/2 cup", oxalate: 3 },
          { name: "Pico de gallo", amount: "3 tbsp", oxalate: 3 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Tangy pepper crema", amount: "1 tbsp", oxalate: 1 },
          { name: "Corn tortillas", amount: "2 tortillas", oxalate: 4 },
          { name: "Green onions", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Beyond Steak Filet Plate", modifications: "Choose chimichurri sauce. Blue cheese is zero oxalate. Beyond Steak has minimal oxalate from pea protein", cookingMethod: "Seared Beyond Steak filet with blue cheese, peppercorn sauce, or chimichurri", total: 12,
        ingredients: [
          { name: "Beyond Steak filet", amount: "4 oz", oxalate: 5 },
          { name: "Blue cheese crumbles", amount: "1 oz", oxalate: 0 },
          { name: "Chimichurri sauce", amount: "2 tbsp", oxalate: 2 },
          { name: "Garlic", amount: "1 clove", oxalate: 0 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Citrus Glazed Tofu Bowl", modifications: "CAUTION: tofu adds ~15mg; sesame seeds ~3mg. Request half tofu portion. Broccoli, peppers and pineapple are low", cookingMethod: "Crispy tofu in citrus glaze over white rice with peppers, onions, broccoli, pineapple and carrots", total: 39,
        ingredients: [
          { name: "Crispy organic tofu", amount: "4 oz", oxalate: 15 },
          { name: "Citrus glaze", amount: "2 tbsp", oxalate: 1 },
          { name: "Organic rice", amount: "1/2 cup", oxalate: 2 },
          { name: "Grilled red & green peppers", amount: "1/4 cup", oxalate: 3 },
          { name: "Sautéed onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Griddled broccoli", amount: "1/2 cup", oxalate: 2 },
          { name: "Caramelized pineapple", amount: "1/4 cup", oxalate: 4 },
          { name: "Carrots", amount: "1/4 cup", oxalate: 2 },
          { name: "Green onions", amount: "1 tbsp", oxalate: 1 },
          { name: "Tuxedo sesame seeds", amount: "1 tsp", oxalate: 3 },
        ]},
      { dish: "Steak Asada Burrito", modifications: "CAUTION: ranchero beans (~10mg) + brown rice (~8mg) add up. Ask for white rice instead; beans are the main contributor", cookingMethod: "Vegan carne asada, organic rice, ranchero beans, pepper jack, lettuce, pico de gallo, guac in flour tortilla", total: 37,
        ingredients: [
          { name: "Seasoned carne asada vegan steak", amount: "3 oz", oxalate: 5 },
          { name: "Organic rice", amount: "1/2 cup", oxalate: 2 },
          { name: "Ranchero beans", amount: "1/4 cup", oxalate: 10 },
          { name: "Pepper jack cheese", amount: "1 oz", oxalate: 0 },
          { name: "Shredded lettuce", amount: "1/2 cup", oxalate: 3 },
          { name: "Pico de gallo", amount: "3 tbsp", oxalate: 3 },
          { name: "Tangy pepper crema", amount: "1 tbsp", oxalate: 1 },
          { name: "Guacamole", amount: "2 tbsp", oxalate: 3 },
          { name: "Flour tortilla", amount: "1 large", oxalate: 5 },
        ]},
      { dish: "Far East Thai Bowl", modifications: "CAUTION: brown rice (~8mg) + coconut curry + Thai chili add up. Choose chik'n over tofu (~15mg). Ask for white rice", cookingMethod: "Crispy chik'n or tofu over brown rice with broccoli, pickled vegetables, fresh herbs and coconut curry sauce", total: 38,
        ingredients: [
          { name: "Crispy sesame chik'n", amount: "3 oz", oxalate: 4 },
          { name: "Organic brown rice", amount: "1/2 cup", oxalate: 8 },
          { name: "Griddled broccoli", amount: "1/2 cup", oxalate: 2 },
          { name: "House-pickled vegetables", amount: "3 tbsp", oxalate: 3 },
          { name: "Fresh herbs (cilantro, basil)", amount: "2 tbsp", oxalate: 2 },
          { name: "Jalapeño peppers", amount: "1 tbsp", oxalate: 1 },
          { name: "Thai chili sauce", amount: "2 tbsp", oxalate: 2 },
          { name: "Coconut curry sauce", amount: "2 tbsp", oxalate: 3 },
          { name: "Green onions", amount: "1 tbsp", oxalate: 1 },
          { name: "Sesame seeds", amount: "1 tsp", oxalate: 3 },
        ]},
      { dish: "Crispy Tofu Plate", modifications: "CAUTION: tofu itself is ~15mg. Choose chimichurri sauce; skip teriyaki. Mango salsa is low and fine", cookingMethod: "Crispy tofu in custom spice blend with peppercorn sauce, chimichurri, or teriyaki and mango salsa", total: 24,
        ingredients: [
          { name: "Crispy organic tofu", amount: "4 oz", oxalate: 15 },
          { name: "Custom spice blend", amount: "1 tsp", oxalate: 1 },
          { name: "Chimichurri sauce", amount: "2 tbsp", oxalate: 2 },
          { name: "Fresh mango salsa", amount: "1/4 cup", oxalate: 3 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Lime juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Steakhouse Burger", modifications: "CAUTION: whole wheat bun adds ~6mg vs brioche ~3mg — request brioche. Beyond patty is moderate; blue cheese is zero", cookingMethod: "Beyond patty with caramelized onions, horseradish aioli, lettuce and blue cheese on brioche bun", total: 18,
        ingredients: [
          { name: "Beyond burger patty (1/4 lb)", amount: "4 oz", oxalate: 5 },
          { name: "Caramelized organic onions", amount: "2 tbsp", oxalate: 2 },
          { name: "Horseradish aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Organic lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Blue cheese crumbles", amount: "1 oz", oxalate: 0 },
          { name: "Brioche bun", amount: "1 bun", oxalate: 3 },
          { name: "Mustard or ketchup", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Caesar Crunch Wrap", modifications: "CAUTION: kale adds ~18mg + almond parmesan ~4mg + hemp hearts ~1mg. Ask for all romaine, no kale. Capers fine", cookingMethod: "Romaine, kale, almond parmesan, mushroom crisps, capers, hemp hearts, Caesar dressing and croutons with protein choice", total: 46,
        ingredients: [
          { name: "Crispy chik'n", amount: "3 oz", oxalate: 4 },
          { name: "Organic romaine", amount: "1 cup", oxalate: 3 },
          { name: "Organic kale", amount: "1 cup", oxalate: 18 },
          { name: "Almond parmesan", amount: "1 tbsp", oxalate: 4 },
          { name: "Mushroom crisps", amount: "2 tbsp", oxalate: 2 },
          { name: "Capers", amount: "1 tbsp", oxalate: 2 },
          { name: "Hemp hearts", amount: "1 tbsp", oxalate: 1 },
          { name: "House-made Caesar dressing", amount: "2 tbsp", oxalate: 1 },
          { name: "House-made croutons", amount: "2 tbsp", oxalate: 3 },
          { name: "Flour tortilla", amount: "1 large", oxalate: 5 },
        ]},
      { dish: "The Loaded Burrito", modifications: "AVOID — walnut taco meat (~18mg) + ranchero beans (~10mg) + brown rice (~8mg). Use Beyond crumbles + white rice to bring down to ~35mg", cookingMethod: "Beefy crumbles or walnut taco meat, brown rice, ranchero beans, queso, guacamole, jalapeño Baja sauce, lettuce, pico de gallo in flour tortilla", total: 54,
        ingredients: [
          { name: "Walnut taco meat", amount: "3 oz", oxalate: 18 },
          { name: "Organic brown rice", amount: "1/2 cup", oxalate: 8 },
          { name: "Ranchero beans", amount: "1/4 cup", oxalate: 10 },
          { name: "House-made queso", amount: "2 tbsp", oxalate: 0 },
          { name: "Guacamole", amount: "2 tbsp", oxalate: 3 },
          { name: "Jalapeño Baja sauce", amount: "1 tbsp", oxalate: 1 },
          { name: "Shredded lettuce", amount: "1/2 cup", oxalate: 3 },
          { name: "Pico de gallo", amount: "3 tbsp", oxalate: 3 },
          { name: "Flour tortilla", amount: "1 large", oxalate: 5 },
        ]},
      { dish: "Chipotle Black Bean Burger", modifications: "AVOID — black bean patty (~12mg) + whole wheat bun (~6mg) + guacamole + jalapeños. Switch to brioche bun to save ~3mg", cookingMethod: "Chipotle black bean patty, guacamole, pickled jalapeños, lettuce, tomato, onion, chipotle aioli on whole wheat bun", total: 37,
        ingredients: [
          { name: "Chipotle black bean patty", amount: "4 oz", oxalate: 12 },
          { name: "Guacamole", amount: "2 tbsp", oxalate: 3 },
          { name: "Pickled jalapeños", amount: "1 tbsp", oxalate: 1 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Onion", amount: "2 slices", oxalate: 1 },
          { name: "Chipotle aioli", amount: "1 tbsp", oxalate: 1 },
          { name: "Whole wheat bun", amount: "1 bun", oxalate: 6 },
        ]},
      { dish: "Buddha Brunch Bowl", modifications: "AVOID — kale (~18mg) + pepitas (~12mg) + tempeh bacon (~12mg) + quinoa (~6mg). Very high combined. No good sub keeps the spirit of the dish", cookingMethod: "Quinoa, grilled kale, mushrooms, butternut squash, tempeh bacon, blistered tomatoes, spiced pepitas, Yo! Egg, chipotle aioli", total: 72,
        ingredients: [
          { name: "Organic quinoa", amount: "1/2 cup", oxalate: 6 },
          { name: "Grilled citrus kale", amount: "1 cup", oxalate: 18 },
          { name: "Sautéed mushrooms", amount: "1/2 cup", oxalate: 2 },
          { name: "Roasted butternut squash", amount: "1/3 cup", oxalate: 3 },
          { name: "Tempeh bacon", amount: "2 oz", oxalate: 12 },
          { name: "Blistered tomatoes", amount: "1/4 cup", oxalate: 3 },
          { name: "Spiced pepitas", amount: "2 tbsp", oxalate: 12 },
          { name: "Green onions", amount: "1 tbsp", oxalate: 1 },
          { name: "Yo! Egg (vegan sunny side up)", amount: "1 egg", oxalate: 2 },
          { name: "Chipotle aioli", amount: "2 tbsp", oxalate: 1 },
        ]},
      { dish: "Moroccan Lentil Soup", modifications: "AVOID — lentils are moderate-high oxalate; Moroccan spices (cumin, coriander) add more. Small cup portion only if having", cookingMethod: "House-made lentil soup with Moroccan spices, vegetables and herbs", total: 42,
        ingredients: [
          { name: "Green or red lentils", amount: "1/2 cup cooked", oxalate: 14 },
          { name: "Tomatoes (diced)", amount: "1/4 cup", oxalate: 3 },
          { name: "Carrots", amount: "1/4 cup", oxalate: 2 },
          { name: "Onion", amount: "2 tbsp", oxalate: 2 },
          { name: "Celery", amount: "1 stalk", oxalate: 3 },
          { name: "Moroccan spice blend (cumin, coriander, turmeric)", amount: "1 tsp", oxalate: 4 },
          { name: "Garlic", amount: "1 clove", oxalate: 0 },
          { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
          { name: "Vegetable broth", amount: "1 cup", oxalate: 1 },
          { name: "Fresh cilantro", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Three Bean Chili Soup", modifications: "AVOID — three types of beans combine for very high oxalate load. One small cup maximum if you must", cookingMethod: "House-made three bean chili with mixed beans, tomatoes, spices and vegetables", total: 56,
        ingredients: [
          { name: "Black beans", amount: "3 tbsp", oxalate: 9 },
          { name: "Kidney beans", amount: "3 tbsp", oxalate: 11 },
          { name: "Pinto beans", amount: "3 tbsp", oxalate: 8 },
          { name: "Diced tomatoes", amount: "1/3 cup", oxalate: 5 },
          { name: "Onion", amount: "2 tbsp", oxalate: 2 },
          { name: "Bell peppers", amount: "2 tbsp", oxalate: 2 },
          { name: "Chili spice blend", amount: "1 tsp", oxalate: 3 },
          { name: "Garlic", amount: "1 clove", oxalate: 0 },
          { name: "Vegetable broth", amount: "1/2 cup", oxalate: 1 },
          { name: "Corn", amount: "2 tbsp", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Thai Eagle Rox", area: "Highland Park", type: "Restaurant",
    lat: 34.1310, lng: -118.2020, hasLowOxalate: false,
    options: [
      { dish: "Steamed Fish with Ginger", modifications: "Best low-oxalate option on menu", cookingMethod: "Whole fish steamed with ginger, scallions, soy sauce", total: 8,
        ingredients: [
          { name: "Steamed white fish fillet", amount: "6 oz", oxalate: 0 },
          { name: "Fresh ginger", amount: "1 tbsp", oxalate: 1 },
          { name: "Scallions", amount: "2 tbsp", oxalate: 2 },
          { name: "Soy sauce", amount: "1 tbsp", oxalate: 2 },
          { name: "Steamed jasmine rice", amount: "1/2 cup", oxalate: 1 },
        ]},
      { dish: "Chicken Satay", modifications: "Avoid peanut sauce; request fish sauce dip instead", cookingMethod: "Marinated grilled chicken skewers", total: 45,
        ingredients: [
          { name: "Grilled chicken skewers", amount: "4 oz", oxalate: 0 },
          { name: "Peanut sauce (high oxalate!)", amount: "3 tbsp", oxalate: 38 },
          { name: "Cucumber salad", amount: "1/4 cup", oxalate: 1 },
          { name: "Lime juice", amount: "1 tsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "A La Beirut", area: "Eagle Rock", type: "Restaurant",
    lat: 34.1358, lng: -118.2095, hasLowOxalate: true,
    options: [
      { dish: "Chicken Shawarma Plate", modifications: "Request with white rice", cookingMethod: "Marinated chicken slow-roasted on vertical spit", total: 22,
        ingredients: [
          { name: "Chicken shawarma", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Romaine salad", amount: "1 cup", oxalate: 5 },
          { name: "Tomatoes", amount: "1/4 cup", oxalate: 2 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
          { name: "Garlic toum sauce", amount: "2 tbsp", oxalate: 0 },
          { name: "Tahini drizzle", amount: "1 tbsp", oxalate: 4 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Lemon Chicken Soup", modifications: "None needed — great starter", cookingMethod: "Slow-simmered chicken broth with lemon", total: 10,
        ingredients: [
          { name: "Shredded chicken breast", amount: "3 oz", oxalate: 0 },
          { name: "Chicken broth", amount: "2 cups", oxalate: 0 },
          { name: "Vermicelli noodles", amount: "1/4 cup", oxalate: 3 },
          { name: "Lemon juice", amount: "2 tbsp", oxalate: 2 },
          { name: "Fresh parsley", amount: "1 tbsp", oxalate: 2 },
        ]},
    ]
  },

  // ── GRANVILLE + HOUSTON'S (Pasadena) ──
  {
    name: "Granville", area: "Pasadena", type: "Restaurant",
    lat: 34.1411, lng: -118.1321, hasLowOxalate: true,
    options: [
      { dish: "Scottish Salmon", modifications: "One of the best options on the menu — broccoli and salmon are both near-zero. Skip any spinach add-ons", cookingMethod: "Broiled in white wine, served with lentil vinaigrette and broccoli", total: 11,
        ingredients: [
          { name: "Broiled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Steamed broccoli", amount: "1/2 cup", oxalate: 2 },
          { name: "Lentil vinaigrette", amount: "2 tbsp", oxalate: 7 },
          { name: "White wine sauce", amount: "2 tbsp", oxalate: 1 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
        ]},
      { dish: "USDA Prime French Dip Au Jus", modifications: "None needed — prime rib on a French roll with au jus is naturally low. Skip the side of beets", cookingMethod: "Roasted prime rib thinly sliced, piled high on toasted French roll with au jus", total: 10,
        ingredients: [
          { name: "Roasted prime rib", amount: "5 oz", oxalate: 0 },
          { name: "French roll", amount: "1 roll", oxalate: 4 },
          { name: "Au jus", amount: "1/4 cup", oxalate: 0 },
          { name: "Horseradish aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Romaine (optional)", amount: "1 leaf", oxalate: 2 },
        ]},
      { dish: "Village Burger", modifications: "None needed on brioche bun — grass-fed beef, arugula and tomato are all low. Request brioche not whole wheat", cookingMethod: "Non-GMO grass-fed beef on brioche bun with Roma tomato, arugula, garlic aioli", total: 12,
        ingredients: [
          { name: "Grass-fed beef patty", amount: "4 oz", oxalate: 0 },
          { name: "Brioche bun", amount: "1 bun", oxalate: 3 },
          { name: "Roma tomato", amount: "2 slices", oxalate: 2 },
          { name: "Red onion", amount: "2 slices", oxalate: 2 },
          { name: "Arugula", amount: "1/4 cup", oxalate: 1 },
          { name: "Garlic aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Housemade potato chips", amount: "1 oz", oxalate: 3 },
        ]},
      { dish: "Caesar Salad", modifications: "Add chicken or salmon for protein. Housemade croutons are low; parmesan is zero oxalate", cookingMethod: "Crisp romaine, shaved Parmesan, housemade croutons and eggless Caesar dressing", total: 10,
        ingredients: [
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Shaved Parmesan", amount: "1 oz", oxalate: 0 },
          { name: "Housemade croutons", amount: "2 tbsp", oxalate: 3 },
          { name: "Caesar dressing (eggless)", amount: "2 tbsp", oxalate: 1 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Chipotle Chicken Club", modifications: "Ciabatta is slightly higher (~5mg) than white bread; request white bread if available. Avocado and chicken are low", cookingMethod: "Antibiotic-free grilled chicken, bacon, avocado, jack cheese, chipotle aioli on ciabatta", total: 14,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Pure cane bacon", amount: "2 strips", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Jack cheese", amount: "1 oz", oxalate: 0 },
          { name: "Red onion", amount: "2 slices", oxalate: 2 },
          { name: "Chipotle aioli", amount: "1 tbsp", oxalate: 1 },
          { name: "Ciabatta roll", amount: "1 roll", oxalate: 5 },
          { name: "Housemade potato chips", amount: "1 oz", oxalate: 3 },
        ]},
      { dish: "Garlic Tomato Bisque", modifications: "Good low-oxalate soup — tomatoes are moderate but a cup portion keeps it in range. Pair with the Caesar", cookingMethod: "House-made bisque with white wine, cream, garlic and fresh basil", total: 9,
        ingredients: [
          { name: "Tomato bisque", amount: "1 cup", oxalate: 6 },
          { name: "White wine & cream", amount: "1/4 cup", oxalate: 1 },
          { name: "Garlic", amount: "2 cloves", oxalate: 0 },
          { name: "Fresh basil", amount: "garnish", oxalate: 2 },
        ]},
      { dish: "Rotisserie Chicken", modifications: "CAUTION: kale panzanella base adds ~18mg. Ask for steamed broccoli or cauliflower instead of the kale side", cookingMethod: "Herb-roasted chicken with apricot glaze, served with warm kale panzanella", total: 29,
        ingredients: [
          { name: "Rotisserie chicken breast", amount: "6 oz", oxalate: 0 },
          { name: "Apricot glaze", amount: "1 tbsp", oxalate: 2 },
          { name: "Warm kale panzanella", amount: "1 cup", oxalate: 21 },
          { name: "Olive oil & herbs", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Spring Chicken Salad", modifications: "CAUTION: candied pecans add ~10mg, seasonal berries ~8mg. Ask to swap pecans for cucumber and reduce berries", cookingMethod: "Antibiotic-free chicken, seasonal berries, gorgonzola, candied pecans, red onion, caramel vinaigrette", total: 28,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Seasonal berries", amount: "1/4 cup", oxalate: 8 },
          { name: "Gorgonzola cheese", amount: "1 oz", oxalate: 0 },
          { name: "Candied pecans", amount: "1 oz", oxalate: 10 },
          { name: "Red onion", amount: "2 tbsp", oxalate: 2 },
          { name: "Mixed greens", amount: "2 cups", oxalate: 5 },
          { name: "Caramel vinaigrette", amount: "2 tbsp", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Houston's", area: "Pasadena", type: "Restaurant",
    lat: 34.1365, lng: -118.1578, hasLowOxalate: true,
    options: [
      { dish: "USDA Prime Wood Grilled Rib-Eye", modifications: "Best steak option — beef and French fries are both very low. Avoid the Hawaiian marinade (pineapple-soy adds ~5mg)", cookingMethod: "Hardwood-grilled USDA prime rib-eye, seasoned simply, served with French fries", total: 8,
        ingredients: [
          { name: "USDA prime rib-eye steak", amount: "10 oz", oxalate: 0 },
          { name: "Seasoning (salt, pepper, garlic)", amount: "to taste", oxalate: 0 },
          { name: "Hand-cut French fries", amount: "1 cup", oxalate: 5 },
          { name: "Compound butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
      { dish: "USDA Prime French Dip Au Jus", modifications: "A Houston's classic — prime rib on a French roll with au jus. Ask for coleslaw over barley as your side", cookingMethod: "Roasted prime rib thinly sliced and piled high on a toasted French roll", total: 9,
        ingredients: [
          { name: "Roasted prime rib", amount: "5 oz", oxalate: 0 },
          { name: "French roll", amount: "1 roll", oxalate: 4 },
          { name: "Au jus", amount: "1/4 cup", oxalate: 0 },
          { name: "Coleslaw (side)", amount: "1/4 cup", oxalate: 3 },
          { name: "Spicy garlic aioli", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Cheeseburger", modifications: "None needed — fresh-ground chuck, cheddar and classic toppings on a toasted bun. Request coleslaw not barley as side", cookingMethod: "Fresh-ground chuck, cheddar, tomato, lettuce and onion on a toasted bun", total: 10,
        ingredients: [
          { name: "Ground chuck patty", amount: "4 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 slice", oxalate: 0 },
          { name: "Toasted bun", amount: "1 bun", oxalate: 3 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "1 slice", oxalate: 2 },
          { name: "Onion", amount: "1 slice", oxalate: 1 },
          { name: "Coleslaw (side)", amount: "1/4 cup", oxalate: 3 },
        ]},
      { dish: "Scottish Salmon", modifications: "CAUTION: lentil vinaigrette adds ~7mg — ask for plain lemon butter instead to bring to ~4mg. Broccoli is fine", cookingMethod: "Broiled in white wine, served with lentil vinaigrette and broccoli", total: 12,
        ingredients: [
          { name: "Scottish salmon fillet", amount: "7 oz", oxalate: 0 },
          { name: "White wine sauce", amount: "2 tbsp", oxalate: 1 },
          { name: "Lentil vinaigrette", amount: "2 tbsp", oxalate: 7 },
          { name: "Steamed broccoli", amount: "1/2 cup", oxalate: 2 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Knife & Fork Barbecue Ribs", modifications: "Excellent choice — pork ribs with coleslaw and fries are all very low oxalate. A Houston's signature", cookingMethod: "Slow-cooked fall-off-the-bone pork ribs, served with French fries and coleslaw", total: 11,
        ingredients: [
          { name: "Slow-cooked pork ribs", amount: "12 oz", oxalate: 0 },
          { name: "BBQ sauce", amount: "3 tbsp", oxalate: 3 },
          { name: "Hand-cut French fries", amount: "1 cup", oxalate: 5 },
          { name: "Coleslaw", amount: "1/4 cup", oxalate: 3 },
        ]},
      { dish: "California Burger", modifications: "None needed — avocado and jack cheese are both low. Arugula adds just ~1mg", cookingMethod: "Fresh-ground chuck, melted Monterey jack, avocado, arugula and red onion on a toasted bun", total: 12,
        ingredients: [
          { name: "Ground chuck patty", amount: "4 oz", oxalate: 0 },
          { name: "Monterey jack cheese", amount: "1 slice", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Arugula", amount: "1/4 cup", oxalate: 1 },
          { name: "Red onion", amount: "1 slice", oxalate: 1 },
          { name: "Toasted bun", amount: "1 bun", oxalate: 3 },
          { name: "Coleslaw (side)", amount: "1/4 cup", oxalate: 3 },
        ]},
      { dish: "Ruby Star Salad (with Salmon)", modifications: "Hearts of palm and grapefruit are low; avocado is low. Crispy salmon adds great protein with near-zero oxalate", cookingMethod: "Crispy salmon, grapefruit, hearts of palm, avocado and classic vinaigrette", total: 16,
        ingredients: [
          { name: "Crispy salmon", amount: "5 oz", oxalate: 0 },
          { name: "Grapefruit segments", amount: "1/4 cup", oxalate: 2 },
          { name: "Hearts of palm", amount: "1/4 cup", oxalate: 3 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Mixed greens", amount: "2 cups", oxalate: 5 },
          { name: "Classic vinaigrette", amount: "2 tbsp", oxalate: 1 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Emerald Kale Salad", modifications: "AVOID as-is — kale adds ~18mg and roasted peanut vinaigrette ~8mg. If ordered, ask for romaine substitution entirely", cookingMethod: "Shredded kale tossed with Reggiano and roasted peanut vinaigrette", total: 29,
        ingredients: [
          { name: "Shredded kale", amount: "2 cups", oxalate: 18 },
          { name: "Reggiano Parmesan", amount: "1 oz", oxalate: 0 },
          { name: "Roasted peanut vinaigrette", amount: "3 tbsp", oxalate: 8 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Pan-Asian Noodle Salad (Chicken)", modifications: "AVOID — soba noodles (~15mg) + peanuts (~12mg) + mango (~5mg) = very high. No good low-oxalate modification", cookingMethod: "Rotisserie chicken with mango, avocado, soba noodles, peanuts, basil, mint in Thai dressing", total: 38,
        ingredients: [
          { name: "Rotisserie chicken", amount: "5 oz", oxalate: 0 },
          { name: "Soba noodles", amount: "1 cup", oxalate: 15 },
          { name: "Mango", amount: "1/4 cup", oxalate: 5 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "Chopped peanuts", amount: "2 tbsp", oxalate: 12 },
          { name: "Basil & mint", amount: "2 tbsp", oxalate: 2 },
          { name: "Thai dressing", amount: "2 tbsp", oxalate: 2 },
        ]},
    ]
  },

  // ── SOUTH PASADENA ──
  {
    name: "Shiro Restaurant", area: "South Pasadena", type: "Restaurant",
    lat: 34.1135, lng: -118.1578, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon with Vegetables", modifications: "None needed — salmon and steamed vegetables are naturally very low", cookingMethod: "Pan-seared salmon with seasonal vegetables and lemon butter", total: 8,
        ingredients: [
          { name: "Pan-seared salmon", amount: "6 oz", oxalate: 0 },
          { name: "Steamed zucchini", amount: "1/2 cup", oxalate: 3 },
          { name: "Steamed carrots", amount: "1/4 cup", oxalate: 2 },
          { name: "Lemon butter sauce", amount: "2 tbsp", oxalate: 1 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
        ]},
      { dish: "Roasted Chicken Breast", modifications: "Request steamed vegetables instead of roasted potatoes to cut ~10mg", cookingMethod: "Herb-roasted chicken breast with seasonal sides", total: 6,
        ingredients: [
          { name: "Roasted chicken breast", amount: "6 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Green beans", amount: "1/4 cup", oxalate: 4 },
          { name: "Olive oil & herbs", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Fair Oaks Pharmacy & Soda Fountain", area: "South Pasadena", type: "Cafe",
    lat: 34.1142, lng: -118.1601, hasLowOxalate: true,
    options: [
      { dish: "Grilled Cheese Sandwich", modifications: "None needed — white bread and American cheese are both near-zero oxalate", cookingMethod: "Buttered white bread grilled with melted American cheese", total: 4,
        ingredients: [
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "American cheese", amount: "2 slices", oxalate: 0 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Tomato soup (optional)", amount: "4 oz", oxalate: 2 },
        ]},
      { dish: "BLT Sandwich", modifications: "None needed — classic low-oxalate combination on white bread", cookingMethod: "Crispy bacon, romaine, tomato on toasted white bread with mayo", total: 6,
        ingredients: [
          { name: "Bacon strips", amount: "3 strips", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },

  // ── OAK KNOLL ──
  {
    name: "Lovebirds Cafe", area: "Oak Knoll", type: "Cafe",
    lat: 34.1265, lng: -118.1280, hasLowOxalate: true,
    options: [
      { dish: "Avocado & Egg Toast", modifications: "Request on sourdough — avocado and egg are both low oxalate", cookingMethod: "Toasted bread with smashed avocado, fried egg, sea salt", total: 7,
        ingredients: [
          { name: "Fried egg", amount: "1 large", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "White sourdough", amount: "1 thick slice", oxalate: 3 },
          { name: "Sea salt & red pepper flakes", amount: "pinch", oxalate: 0 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Grilled Chicken Plate", modifications: "None needed — clean protein plate with low-oxalate sides", cookingMethod: "Grilled chicken with white rice and simple salad", total: 11,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "1/2 cup", oxalate: 2 },
          { name: "Romaine salad", amount: "1 cup", oxalate: 3 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Lemon vinaigrette", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },

  // ── HASTINGS RANCH ──
  {
    name: "Lume Restaurant", area: "Hastings Ranch", type: "Restaurant",
    lat: 34.1476, lng: -118.0831, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon Fillet", modifications: "None needed — salmon with asparagus is an ideal low-oxalate fine dining plate", cookingMethod: "Grilled salmon with lemon herb butter and seasonal vegetables", total: 7,
        ingredients: [
          { name: "Grilled salmon fillet", amount: "6 oz", oxalate: 0 },
          { name: "Steamed asparagus", amount: "6 spears", oxalate: 4 },
          { name: "Lemon herb butter", amount: "1 tbsp", oxalate: 1 },
          { name: "Garlic", amount: "1 clove", oxalate: 0 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Roasted Half Chicken", modifications: "Ask for cauliflower or zucchini instead of potatoes as side", cookingMethod: "Herb-roasted half chicken with roasted vegetables", total: 9,
        ingredients: [
          { name: "Roasted half chicken", amount: "8 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 3 },
          { name: "Herbs & olive oil", amount: "1 tbsp", oxalate: 0 },
          { name: "Pan jus", amount: "2 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Hastings Ranch Grill", area: "Hastings Ranch", type: "Restaurant",
    lat: 34.1455, lng: -118.0798, hasLowOxalate: true,
    options: [
      { dish: "Classic Cheeseburger", modifications: "None needed on white bun — beef, cheese and standard toppings are all low", cookingMethod: "Grilled beef patty with cheese, lettuce, tomato, pickles on toasted white bun", total: 9,
        ingredients: [
          { name: "Beef patty", amount: "4 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 slice", oxalate: 0 },
          { name: "White bun", amount: "1 bun", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "1 slice", oxalate: 2 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
          { name: "Ketchup & mustard", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Grilled Chicken Sandwich", modifications: "None needed — standard grilled chicken on white bun is very low", cookingMethod: "Grilled chicken breast on toasted white bun with lettuce, tomato, mayo", total: 8,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "White bun", amount: "1 bun", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },

  {
    name: "Whole Foods Market (Hastings Ranch)", area: "Hastings Ranch", type: "Cafe",
    lat: 34.1510, lng: -118.0721, hasLowOxalate: true,
    options: [
      { dish: "Rotisserie Chicken", modifications: "One of the best grab-and-go low-oxalate proteins anywhere. Eat breast meat only; skin is fine. Skip any bean or spinach sides", cookingMethod: "Whole roasted chicken, antibiotic-free, hot from the rotisserie", total: 2,
        ingredients: [
          { name: "Rotisserie chicken breast", amount: "6 oz", oxalate: 0 },
          { name: "Rotisserie seasoning (herbs, garlic, salt)", amount: "to taste", oxalate: 0 },
          { name: "Chicken skin", amount: "1 oz", oxalate: 0 },
          { name: "Natural juices", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Hot Bar: Roasted Salmon", modifications: "The hot bar almost always has salmon — excellent zero-oxalate protein. Ask staff what the current sauce is and avoid any miso or sesame-heavy options", cookingMethod: "Oven-roasted salmon fillet from the hot bar, typically with lemon herb or teriyaki", total: 4,
        ingredients: [
          { name: "Roasted salmon fillet", amount: "5 oz", oxalate: 0 },
          { name: "Lemon herb glaze", amount: "1 tbsp", oxalate: 1 },
          { name: "Steamed broccoli (hot bar side)", amount: "1/2 cup", oxalate: 2 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
      { dish: "Hot Bar: Roasted Chicken Thighs", modifications: "None needed — grilled or roasted chicken thighs from the hot bar are consistently low. Avoid any sides with sweet potato or beans", cookingMethod: "Roasted or herb-grilled chicken thighs from the Whole Foods hot bar", total: 3,
        ingredients: [
          { name: "Roasted chicken thigh", amount: "5 oz", oxalate: 0 },
          { name: "Herb seasoning", amount: "to taste", oxalate: 0 },
          { name: "Roasted cauliflower (hot bar side)", amount: "1/2 cup", oxalate: 2 },
          { name: "Olive oil drizzle", amount: "1 tsp", oxalate: 0 },
        ]},
      { dish: "Salad Bar: Build-Your-Own Low-Oxalate Salad", modifications: "Stick to romaine, cucumber, tomato, carrots, hard-boiled egg, grilled chicken, feta, olive oil + lemon dressing. SKIP: spinach, chickpeas, sunflower seeds, beets, edamame, dried cranberries", cookingMethod: "Self-serve salad bar — build your own with low-oxalate toppings", total: 12,
        ingredients: [
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
          { name: "Cherry tomatoes", amount: "1/4 cup", oxalate: 2 },
          { name: "Shredded carrots", amount: "2 tbsp", oxalate: 1 },
          { name: "Hard-boiled egg", amount: "1 large", oxalate: 0 },
          { name: "Grilled chicken strips", amount: "2 oz", oxalate: 0 },
          { name: "Feta cheese", amount: "1 oz", oxalate: 0 },
          { name: "Olive oil & lemon dressing", amount: "2 tbsp", oxalate: 1 },
        ]},
      { dish: "Deli: Turkey & Provolone Sandwich", modifications: "Request on white or sourdough bread. Ask them to hold any spinach and add romaine instead. Mustard, mayo and provolone are all zero", cookingMethod: "Freshly made deli sandwich with sliced turkey, provolone and toppings on your bread choice", total: 9,
        ingredients: [
          { name: "Sliced turkey breast", amount: "4 oz", oxalate: 0 },
          { name: "Provolone cheese", amount: "1 slice", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "White or sourdough bread", amount: "2 slices", oxalate: 3 },
          { name: "Mustard & mayo", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Hot Bar: Roasted Cauliflower & Zucchini", modifications: "Great low-oxalate vegetable side for any protein plate. Olive oil and herbs keep oxalate near-zero", cookingMethod: "Oven-roasted cauliflower and zucchini from the hot bar with olive oil and herbs", total: 6,
        ingredients: [
          { name: "Roasted cauliflower", amount: "3/4 cup", oxalate: 3 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 2 },
          { name: "Olive oil & garlic seasoning", amount: "1 tbsp", oxalate: 0 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
        ]},
    ]
  },

  // ── SAN MARINO ──
  {
    name: "Julienne Restaurant", area: "San Marino", type: "Restaurant",
    lat: 34.1214, lng: -118.1072, hasLowOxalate: true,
    options: [
      { dish: "Roasted Turkey Sandwich", modifications: "None needed on sourdough — turkey, provolone and fresh veggies are all low", cookingMethod: "Oven-roasted turkey breast on fresh bread with lettuce, tomato, Dijon", total: 8,
        ingredients: [
          { name: "Roasted turkey breast", amount: "4 oz", oxalate: 0 },
          { name: "Provolone cheese", amount: "1 slice", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Sourdough bread", amount: "2 slices", oxalate: 3 },
          { name: "Dijon mustard & mayo", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Grilled Salmon Plate", modifications: "None needed — a signature dish and naturally very low-oxalate", cookingMethod: "Fresh grilled salmon with lemon caper butter and mixed greens", total: 10,
        ingredients: [
          { name: "Grilled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Lemon caper butter", amount: "2 tbsp", oxalate: 2 },
          { name: "Mixed greens", amount: "1 cup", oxalate: 3 },
          { name: "Cucumber slices", amount: "1/4 cup", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Lemon vinaigrette", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Schnell's Bakery & Cafe", area: "San Marino", type: "Cafe",
    lat: 34.1198, lng: -118.1095, hasLowOxalate: true,
    options: [
      { dish: "Ham & Swiss Croissant", modifications: "None needed — ham, Swiss and butter croissant are all near-zero oxalate", cookingMethod: "Sliced ham and Swiss cheese on a toasted butter croissant", total: 4,
        ingredients: [
          { name: "Sliced ham", amount: "2 oz", oxalate: 0 },
          { name: "Swiss cheese", amount: "1 slice", oxalate: 0 },
          { name: "Butter croissant", amount: "1 medium", oxalate: 3 },
          { name: "Dijon mustard", amount: "1 tsp", oxalate: 0 },
        ]},
      { dish: "Egg & Bacon Breakfast Plate", modifications: "None needed — classic low-oxalate breakfast", cookingMethod: "Fried eggs and crispy bacon with white toast", total: 4,
        ingredients: [
          { name: "Fried eggs", amount: "2 large", oxalate: 0 },
          { name: "Bacon strips", amount: "2 strips", oxalate: 0 },
          { name: "White toast", amount: "1 slice", oxalate: 2 },
          { name: "Butter", amount: "1 tsp", oxalate: 0 },
        ]},
    ]
  },

  // ── NORMANDIE HEIGHTS ──
  {
    name: "The Raymond 1886", area: "Normandie Heights", type: "Restaurant",
    lat: 34.1380, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon", modifications: "None needed — an excellent fine-dining low-oxalate choice", cookingMethod: "Pan-seared salmon with seasonal vegetables and citrus beurre blanc", total: 9,
        ingredients: [
          { name: "Pan-seared salmon", amount: "6 oz", oxalate: 0 },
          { name: "Citrus beurre blanc", amount: "2 tbsp", oxalate: 1 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 3 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Microgreens", amount: "garnish", oxalate: 1 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Herb Roasted Chicken", modifications: "Request no fingerling potatoes — swap for cauliflower or zucchini to stay under 10mg", cookingMethod: "Herb-roasted chicken with natural jus and seasonal vegetables", total: 8,
        ingredients: [
          { name: "Herb-roasted chicken breast", amount: "6 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 3 },
          { name: "Natural chicken jus", amount: "2 tbsp", oxalate: 0 },
          { name: "Fresh thyme & rosemary", amount: "garnish", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Burger Continental", area: "Normandie Heights", type: "Restaurant",
    lat: 34.1365, lng: -118.1498, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken Plate", modifications: "None needed — a Pasadena classic with great low-oxalate options", cookingMethod: "Grilled chicken breast with rice pilaf and garden salad", total: 10,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "White rice pilaf", amount: "1/2 cup", oxalate: 2 },
          { name: "Garden salad (romaine, tomato, cucumber)", amount: "1 cup", oxalate: 5 },
          { name: "House dressing", amount: "1 tbsp", oxalate: 1 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
      { dish: "Beef Shish Kabob", modifications: "None needed — marinated beef with grilled vegetables on white rice is ideal", cookingMethod: "Marinated beef skewers with grilled onion and pepper, served with rice pilaf", total: 11,
        ingredients: [
          { name: "Marinated beef cubes", amount: "5 oz", oxalate: 0 },
          { name: "Grilled onion", amount: "2 tbsp", oxalate: 2 },
          { name: "Grilled bell pepper", amount: "2 tbsp", oxalate: 1 },
          { name: "White rice pilaf", amount: "1/2 cup", oxalate: 2 },
          { name: "Romaine salad", amount: "1 cup", oxalate: 3 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
    ]
  },
// 26 new restaurants to inject before the closing ]; of RESTAURANTS array

  // ── New Batch ─────────────────────────────────────────────────────────────
  {
    name: "Top Restaurant", area: "Pasadena", type: "Restaurant",
    address: "1842 E Colorado Blvd, Pasadena, CA 91107",
    lat: 34.1464, lng: -118.1075, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken Rice Bowl", modifications: "Ask for white rice, skip pickled veg",
        cookingMethod: "Grilled chicken thigh over steamed white rice with cucumber", total: 8,
        ingredients: [
          { name: "Grilled chicken thigh", amount: "5 oz", oxalate: 0 },
          { name: "Steamed white rice", amount: "1 cup", oxalate: 4 },
          { name: "Cucumber slices", amount: "½ cup", oxalate: 1 },
          { name: "Garlic butter sauce", amount: "1 tbsp", oxalate: 0 },
          { name: "Scallion garnish", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Steamed Fish with Ginger", modifications: "None needed",
        cookingMethod: "Whole steamed fish with ginger and scallion, white rice", total: 7,
        ingredients: [
          { name: "Steamed whole fish (tilapia)", amount: "6 oz", oxalate: 0 },
          { name: "Ginger slices", amount: "6 slices", oxalate: 0 },
          { name: "Soy sauce light", amount: "1 tbsp", oxalate: 2 },
          { name: "Sesame oil", amount: "1 tsp", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
        ]},
    ]
  },
  {
    name: "Star Leaf", area: "Pasadena", type: "Restaurant",
    address: "641 E Colorado Blvd, Pasadena, CA 91101",
    lat: 34.1461, lng: -118.1368, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon with Bok Choy", modifications: "None needed",
        cookingMethod: "Pan-seared salmon, steamed bok choy, white rice", total: 9,
        ingredients: [
          { name: "Pan-seared salmon", amount: "6 oz", oxalate: 0 },
          { name: "Steamed bok choy", amount: "1 cup", oxalate: 2 },
          { name: "White jasmine rice", amount: "1 cup", oxalate: 4 },
          { name: "Ginger soy glaze", amount: "1 tbsp", oxalate: 2 },
          { name: "Sesame oil", amount: "½ tsp", oxalate: 0 },
        ]},
      { dish: "Chicken Lettuce Cups", modifications: "No hoisin — request soy & ginger sauce",
        cookingMethod: "Minced chicken stir-fry in iceberg lettuce cups", total: 5,
        ingredients: [
          { name: "Minced chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Iceberg lettuce cups", amount: "4 leaves", oxalate: 2 },
          { name: "Water chestnuts", amount: "¼ cup", oxalate: 0 },
          { name: "Ginger", amount: "1 tsp", oxalate: 0 },
          { name: "Soy sauce", amount: "1 tbsp", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Parkway Grill", area: "Pasadena", type: "Restaurant",
    address: "510 S Arroyo Pkwy, Pasadena, CA 91105",
    lat: 34.1373, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Oak-Grilled Filet Mignon", modifications: "Request mashed cauliflower instead of potato",
        cookingMethod: "Oak-grilled beef tenderloin, roasted cauliflower mash", total: 4,
        ingredients: [
          { name: "Filet mignon", amount: "7 oz", oxalate: 0 },
          { name: "Cauliflower mash", amount: "¾ cup", oxalate: 2 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 2 },
          { name: "Red wine reduction", amount: "2 tbsp", oxalate: 0 },
        ]},
      { dish: "Grilled Free-Range Chicken", modifications: "None needed",
        cookingMethod: "Oak-grilled chicken breast with seasonal vegetables", total: 6,
        ingredients: [
          { name: "Grilled chicken breast", amount: "7 oz", oxalate: 0 },
          { name: "Roasted zucchini", amount: "¾ cup", oxalate: 3 },
          { name: "Roasted mushrooms", amount: "½ cup", oxalate: 1 },
          { name: "Herb butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Lemon jus", amount: "2 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Bone Kettle", area: "Pasadena", type: "Restaurant",
    address: "67 N Raymond Ave, Pasadena, CA 91103",
    lat: 34.1483, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Bone Broth Bowl with Egg", modifications: "Request white rice noodles, no bok choy",
        cookingMethod: "Rich bone broth, rice noodles, soft-boiled egg, scallion", total: 8,
        ingredients: [
          { name: "Bone broth (pork/chicken)", amount: "2 cups", oxalate: 0 },
          { name: "Rice noodles", amount: "1 cup cooked", oxalate: 4 },
          { name: "Soft-boiled egg", amount: "1 large", oxalate: 0 },
          { name: "Scallions", amount: "2 tbsp", oxalate: 1 },
          { name: "Ginger slices", amount: "3 slices", oxalate: 0 },
          { name: "Fish sauce", amount: "1 tsp", oxalate: 0 },
          { name: "Zucchini ribbons", amount: "½ cup", oxalate: 2 },
        ]},
      { dish: "Braised Oxtail", modifications: "None needed",
        cookingMethod: "Slow-braised oxtail with white rice and daikon", total: 5,
        ingredients: [
          { name: "Braised oxtail", amount: "6 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Daikon radish", amount: "½ cup", oxalate: 0 },
          { name: "Braising liquid", amount: "¼ cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Mercado", area: "Pasadena", type: "Restaurant",
    address: "140 S Lake Ave #101, Pasadena, CA 91101",
    lat: 34.1451, lng: -118.1318, hasLowOxalate: true,
    options: [
      { dish: "Carne Asada Plate", modifications: "Request white rice and grilled veg instead of beans",
        cookingMethod: "Grilled marinated skirt steak, white rice, grilled zucchini", total: 9,
        ingredients: [
          { name: "Carne asada (skirt steak)", amount: "6 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Grilled zucchini", amount: "½ cup", oxalate: 2 },
          { name: "Grilled onion & pepper", amount: "¼ cup", oxalate: 2 },
          { name: "Pico de gallo", amount: "2 tbsp", oxalate: 1 },
        ]},
      { dish: "Chicken Taco (corn tortilla)", modifications: "Skip salsa verde — request pico only",
        cookingMethod: "Grilled chicken, corn tortilla, pico, avocado", total: 11,
        ingredients: [
          { name: "Grilled chicken thigh", amount: "3 oz", oxalate: 0 },
          { name: "Corn tortillas", amount: "2 medium", oxalate: 4 },
          { name: "Avocado", amount: "¼ medium", oxalate: 2 },
          { name: "Pico de gallo", amount: "2 tbsp", oxalate: 1 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Cabbage slaw", amount: "2 tbsp", oxalate: 1 },
          { name: "Lime juice", amount: "squeeze", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Osa Rooftop", area: "Pasadena", type: "Restaurant",
    address: "540 E Colorado Blvd, Pasadena, CA 91101",
    lat: 34.1462, lng: -118.1381, hasLowOxalate: true,
    options: [
      { dish: "Grilled Swordfish", modifications: "None needed — seasonal California preparation",
        cookingMethod: "Grilled swordfish with seasonal roasted vegetables", total: 7,
        ingredients: [
          { name: "Grilled swordfish", amount: "7 oz", oxalate: 0 },
          { name: "Roasted zucchini", amount: "½ cup", oxalate: 2 },
          { name: "Roasted yellow squash", amount: "½ cup", oxalate: 2 },
          { name: "Lemon herb butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Asparagus", amount: "3 spears", oxalate: 2 },
        ]},
      { dish: "Osa Wagyu Burger", modifications: "Request lettuce wrap instead of bun",
        cookingMethod: "Wagyu beef patty in iceberg lettuce, tomato, house sauce", total: 5,
        ingredients: [
          { name: "Wagyu beef patty", amount: "6 oz", oxalate: 0 },
          { name: "Iceberg lettuce wrap", amount: "2 leaves", oxalate: 1 },
          { name: "Tomato slices", amount: "2 slices", oxalate: 2 },
          { name: "Cheese", amount: "1 oz", oxalate: 0 },
          { name: "House aioli", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Eden Garden Bar & Grill", area: "Pasadena", type: "Restaurant",
    address: "175 E Holly St, Pasadena, CA 91101",
    lat: 34.1498, lng: -118.1465, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon Plate", modifications: "None needed",
        cookingMethod: "Grilled salmon fillet with asparagus and white rice", total: 8,
        ingredients: [
          { name: "Grilled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Grilled asparagus", amount: "5 spears", oxalate: 3 },
          { name: "White rice", amount: "¾ cup", oxalate: 3 },
          { name: "Lemon butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Garlic", amount: "1 clove", oxalate: 0 },
        ]},
      { dish: "Chicken Caesar Salad", modifications: "Request romaine only — no croutons",
        cookingMethod: "Grilled chicken over romaine, Caesar dressing, Parmesan", total: 7,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Caesar dressing", amount: "2 tbsp", oxalate: 0 },
          { name: "Parmesan", amount: "1 tbsp", oxalate: 0 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Ginger Corner Market", area: "Pasadena", type: "Cafe",
    address: "217 S Michigan Ave, Pasadena, CA 91106",
    lat: 34.1434, lng: -118.1445, hasLowOxalate: true,
    options: [
      { dish: "Egg & Cheese Sandwich", modifications: "Request white bread, no spinach",
        cookingMethod: "Fried egg with cheese on white bread", total: 3,
        ingredients: [
          { name: "Fried eggs", amount: "2 large", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
          { name: "Butter", amount: "½ tbsp", oxalate: 0 },
          { name: "Tomato slice", amount: "1 slice", oxalate: 1 },
        ]},
      { dish: "Rotisserie Chicken Wrap", modifications: "Request white flour tortilla, no kale",
        cookingMethod: "Shredded rotisserie chicken with romaine in white tortilla", total: 7,
        ingredients: [
          { name: "Rotisserie chicken", amount: "4 oz", oxalate: 0 },
          { name: "White flour tortilla", amount: "1 large", oxalate: 3 },
          { name: "Romaine lettuce", amount: "½ cup", oxalate: 2 },
          { name: "Tomato", amount: "2 tbsp", oxalate: 1 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Caribbean Gourmet", area: "San Gabriel", type: "Restaurant",
    address: "264 S Mission Dr, San Gabriel, CA 91776",
    lat: 34.1067, lng: -118.1025, hasLowOxalate: true,
    options: [
      { dish: "Jerk Chicken with White Rice", modifications: "None needed — classic Caribbean low-oxalate plate",
        cookingMethod: "Jerk-marinated chicken thigh, white rice, fried plantain", total: 10,
        ingredients: [
          { name: "Jerk chicken thigh", amount: "6 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Fried ripe plantain", amount: "3 slices", oxalate: 4 },
          { name: "Jerk seasoning (dry)", amount: "1 tsp", oxalate: 1 },
          { name: "Lime juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Grilled Fish with Cabbage Slaw", modifications: "None needed",
        cookingMethod: "Grilled snapper with cabbage slaw and white rice", total: 11,
        ingredients: [
          { name: "Grilled red snapper", amount: "6 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Cabbage slaw", amount: "½ cup", oxalate: 4 },
          { name: "Lime vinaigrette", amount: "1 tbsp", oxalate: 1 },
          { name: "Cucumber", amount: "¼ cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Manduyo", area: "San Gabriel", type: "Restaurant",
    address: "264 S Mission Dr M, San Gabriel, CA 91776",
    lat: 34.1069, lng: -118.1024, hasLowOxalate: true,
    options: [
      { dish: "Galbi Korean Rice Box", modifications: "No kimchi — request plain white rice",
        cookingMethod: "Korean short rib over white rice, egg, cucumber", total: 9,
        ingredients: [
          { name: "Galbi (Korean short rib)", amount: "4 oz", oxalate: 0 },
          { name: "Steamed white rice", amount: "1 cup", oxalate: 4 },
          { name: "Fried egg", amount: "1 large", oxalate: 0 },
          { name: "Cucumber ribbons", amount: "¼ cup", oxalate: 1 },
          { name: "Sesame oil", amount: "½ tsp", oxalate: 0 },
          { name: "Scallion", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Soy-Glazed Chicken Dosirak Box", modifications: "Request no pickled radish",
        cookingMethod: "Soy-glazed chicken thigh rice box with egg and veggies", total: 8,
        ingredients: [
          { name: "Soy-glazed chicken thigh", amount: "4 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Fried egg", amount: "1 large", oxalate: 0 },
          { name: "Soy glaze", amount: "1 tbsp", oxalate: 2 },
          { name: "Cucumber", amount: "¼ cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Dancing Spoons", area: "San Gabriel", type: "Restaurant",
    address: "413 S Mission Dr, San Gabriel, CA 91776",
    lat: 34.1054, lng: -118.1019, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken Plate", modifications: "None needed",
        cookingMethod: "Grilled chicken with white rice and mixed vegetables", total: 8,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Roasted zucchini", amount: "½ cup", oxalate: 2 },
          { name: "Roasted red bell pepper", amount: "¼ cup", oxalate: 1 },
          { name: "Olive oil drizzle", amount: "1 tsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Young Dong Tofu House", area: "San Gabriel", type: "Restaurant",
    address: "927 E Las Tunas Dr, San Gabriel, CA 91776",
    lat: 34.1072, lng: -118.0891, hasLowOxalate: false,
    options: [
      { dish: "Beef Short Rib Soup (Galbi Tang)", modifications: "Request no tofu, extra broth and rice",
        cookingMethod: "Clear beef short rib broth with white rice — avoid tofu and doenjang", total: 8,
        ingredients: [
          { name: "Beef short rib", amount: "4 oz", oxalate: 0 },
          { name: "Clear beef broth", amount: "1.5 cups", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Scallion", amount: "1 tbsp", oxalate: 1 },
          { name: "Daikon radish", amount: "¼ cup", oxalate: 0 },
          { name: "Egg", amount: "1 large", oxalate: 0 },
          { name: "Sesame oil", amount: "½ tsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Mamma's Brick Oven Pizza & Pasta", area: "South Pasadena", type: "Restaurant",
    address: "1007 S Fair Oaks Ave, South Pasadena, CA 91030",
    lat: 34.1147, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken with White Pasta", modifications: "Request white pasta, olive oil & garlic sauce, no tomato",
        cookingMethod: "Grilled chicken breast over white pasta, garlic oil", total: 9,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "White pasta (linguine)", amount: "1 cup cooked", oxalate: 5 },
          { name: "Garlic", amount: "2 cloves", oxalate: 0 },
          { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
          { name: "Parmesan", amount: "1 tbsp", oxalate: 0 },
          { name: "Fresh basil", amount: "4 leaves", oxalate: 1 },
        ]},
      { dish: "Margherita Pizza (white sauce)", modifications: "Request white garlic sauce, mozzarella, no tomato sauce",
        cookingMethod: "Brick-oven pizza with garlic white sauce, mozzarella, basil", total: 12,
        ingredients: [
          { name: "White pizza dough (2 slices)", amount: "2 slices", oxalate: 6 },
          { name: "Mozzarella cheese", amount: "2 oz", oxalate: 0 },
          { name: "Garlic white sauce", amount: "2 tbsp", oxalate: 0 },
          { name: "Fresh basil", amount: "4 leaves", oxalate: 1 },
          { name: "Olive oil drizzle", amount: "1 tsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Shakers", area: "South Pasadena", type: "Restaurant",
    address: "601 Fair Oaks Ave, South Pasadena, CA 91030",
    lat: 34.1198, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Grilled Burger (lettuce wrap)", modifications: "Request lettuce wrap, no bun",
        cookingMethod: "Grilled beef patty in iceberg lettuce, tomato, cheese", total: 4,
        ingredients: [
          { name: "Beef patty", amount: "6 oz", oxalate: 0 },
          { name: "Iceberg lettuce wrap", amount: "2 leaves", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Scrambled Eggs & Bacon", modifications: "None needed",
        cookingMethod: "Scrambled eggs, crispy bacon, white toast", total: 3,
        ingredients: [
          { name: "Scrambled eggs", amount: "3 large", oxalate: 0 },
          { name: "Bacon", amount: "3 strips", oxalate: 0 },
          { name: "White toast", amount: "1 slice", oxalate: 1 },
          { name: "Butter", amount: "½ tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "The Raymond 1886", area: "Pasadena", type: "Restaurant",
    address: "1250 S Fair Oaks Ave, Pasadena, CA 91105",
    lat: 34.1272, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Dry-Aged Prime Beef", modifications: "Request seasonal vegetables in place of any grain sides",
        cookingMethod: "Dry-aged beef, roasted seasonal vegetables, herb jus", total: 5,
        ingredients: [
          { name: "Dry-aged beef (6 oz)", amount: "6 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "½ cup", oxalate: 1 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 2 },
          { name: "Herb jus", amount: "2 tbsp", oxalate: 0 },
          { name: "Butter-poached mushrooms", amount: "¼ cup", oxalate: 1 },
        ]},
      { dish: "Pan-Roasted Chicken", modifications: "None needed",
        cookingMethod: "Pan-roasted chicken breast, pan sauce, roasted zucchini", total: 6,
        ingredients: [
          { name: "Pan-roasted chicken breast", amount: "7 oz", oxalate: 0 },
          { name: "Pan sauce (chicken jus)", amount: "2 tbsp", oxalate: 0 },
          { name: "Roasted zucchini", amount: "¾ cup", oxalate: 3 },
          { name: "Roasted mushrooms", amount: "¼ cup", oxalate: 1 },
          { name: "Fresh thyme", amount: "pinch", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Marina Restaurant", area: "Pasadena", type: "Restaurant",
    address: "841 Cordova St, Pasadena, CA 91101",
    lat: 34.1451, lng: -118.1498, hasLowOxalate: true,
    options: [
      { dish: "Grilled Whole Fish", modifications: "None needed",
        cookingMethod: "Whole grilled fish with lemon, olive oil, herbs", total: 4,
        ingredients: [
          { name: "Whole grilled sea bass", amount: "7 oz", oxalate: 0 },
          { name: "Lemon juice", amount: "2 tbsp", oxalate: 1 },
          { name: "Olive oil", amount: "1 tbsp", oxalate: 0 },
          { name: "Fresh herbs (parsley, thyme)", amount: "1 tbsp", oxalate: 1 },
          { name: "Garlic", amount: "2 cloves", oxalate: 0 },
        ]},
      { dish: "Shrimp Plate", modifications: "Request white rice instead of pilaf",
        cookingMethod: "Sautéed shrimp with garlic butter, white rice, vegetable", total: 9,
        ingredients: [
          { name: "Sautéed shrimp", amount: "6 oz", oxalate: 0 },
          { name: "Garlic butter sauce", amount: "1 tbsp", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Roasted zucchini", amount: "½ cup", oxalate: 2 },
          { name: "Lemon", amount: "wedge", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Urban Plates", area: "Pasadena", type: "Restaurant",
    address: "269 S Lake Ave, Pasadena, CA 91101",
    lat: 34.1451, lng: -118.1314, hasLowOxalate: true,
    options: [
      { dish: "Rotisserie Chicken Plate", modifications: "Request cauliflower instead of any potato side",
        cookingMethod: "Rotisserie chicken, roasted cauliflower, cucumber salad", total: 7,
        ingredients: [
          { name: "Rotisserie chicken (white meat)", amount: "5 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "¾ cup", oxalate: 2 },
          { name: "Cucumber salad", amount: "½ cup", oxalate: 1 },
          { name: "House dressing", amount: "1 tbsp", oxalate: 1 },
          { name: "Lemon", amount: "wedge", oxalate: 1 },
        ]},
      { dish: "Grilled Salmon Bowl", modifications: "Request romaine base, skip any grain with high oxalate",
        cookingMethod: "Grilled salmon over romaine, avocado, cucumber, lemon", total: 9,
        ingredients: [
          { name: "Grilled salmon", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Avocado", amount: "¼ medium", oxalate: 2 },
          { name: "Cucumber", amount: "¼ cup", oxalate: 1 },
          { name: "Lemon vinaigrette", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Lee's Sandwiches", area: "Pasadena", type: "Cafe",
    address: "766 E Colorado Blvd #100, Pasadena, CA 91101",
    lat: 34.1462, lng: -118.1332, hasLowOxalate: true,
    options: [
      { dish: "Bánh Mì with Grilled Chicken", modifications: "Request no pickled daikon — add cucumber and jalapeño only",
        cookingMethod: "Vietnamese sandwich on French baguette with grilled chicken", total: 10,
        ingredients: [
          { name: "Grilled chicken breast", amount: "3 oz", oxalate: 0 },
          { name: "French baguette roll", amount: "1 roll", oxalate: 5 },
          { name: "Cucumber slices", amount: "¼ cup", oxalate: 1 },
          { name: "Jalapeño", amount: "3 slices", oxalate: 1 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Egg & Cheese Bánh Mì", modifications: "No pickled veg, extra cucumber",
        cookingMethod: "Fried egg and cheese on toasted baguette roll", total: 8,
        ingredients: [
          { name: "Fried eggs", amount: "2 large", oxalate: 0 },
          { name: "Swiss cheese", amount: "1 oz", oxalate: 0 },
          { name: "French baguette roll", amount: "1 roll", oxalate: 5 },
          { name: "Cucumber", amount: "¼ cup", oxalate: 1 },
          { name: "Butter", amount: "½ tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Deda Restaurant", area: "Pasadena", type: "Restaurant",
    address: "55 S Lake Ave, Pasadena, CA 91101",
    lat: 34.1451, lng: -118.1319, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken Skewers", modifications: "None needed",
        cookingMethod: "Marinated grilled chicken skewers, white rice, tzatziki", total: 8,
        ingredients: [
          { name: "Grilled chicken skewers", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "¾ cup", oxalate: 3 },
          { name: "Tzatziki (yogurt-cucumber)", amount: "3 tbsp", oxalate: 1 },
          { name: "Grilled onion", amount: "2 tbsp", oxalate: 2 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Grilled Salmon with Herb Butter", modifications: "None needed",
        cookingMethod: "Pan-roasted salmon fillet, herb butter, seasonal veg", total: 6,
        ingredients: [
          { name: "Pan-roasted salmon", amount: "6 oz", oxalate: 0 },
          { name: "Herb butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 2 },
          { name: "Roasted mushrooms", amount: "¼ cup", oxalate: 1 },
          { name: "Lemon", amount: "wedge", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Annapurna Grill", area: "Pasadena", type: "Restaurant",
    address: "929 E Colorado Blvd, Pasadena, CA 91106",
    lat: 34.1463, lng: -118.1201, hasLowOxalate: true,
    options: [
      { dish: "Chicken Tikka (no sauce)", modifications: "Request plain tikka no masala sauce — sauce is high oxalate",
        cookingMethod: "Tandoor-grilled marinated chicken tikka with white basmati rice", total: 7,
        ingredients: [
          { name: "Chicken tikka pieces", amount: "5 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Tandoori marinade (yogurt-based)", amount: "1 tbsp", oxalate: 0 },
          { name: "Cucumber raita", amount: "3 tbsp", oxalate: 1 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
      { dish: "Lamb Seekh Kebab", modifications: "Request white basmati rice, skip naan",
        cookingMethod: "Ground lamb skewer, tandoor-grilled, served with white rice", total: 6,
        ingredients: [
          { name: "Lamb seekh kebab", amount: "5 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Onion rings (raw)", amount: "¼ cup", oxalate: 1 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "New Delhi Palace", area: "Pasadena", type: "Restaurant",
    address: "950 E Colorado Blvd #205, Pasadena, CA 91106",
    lat: 34.1463, lng: -118.1195, hasLowOxalate: true,
    options: [
      { dish: "Chicken Tandoori Plate", modifications: "Request no dal or spinach — stick to chicken + rice",
        cookingMethod: "Tandoor-roasted chicken, white basmati rice, cucumber raita", total: 8,
        ingredients: [
          { name: "Tandoori chicken pieces", amount: "6 oz", oxalate: 0 },
          { name: "White basmati rice", amount: "1 cup", oxalate: 4 },
          { name: "Cucumber raita", amount: "3 tbsp", oxalate: 1 },
          { name: "Onion slices", amount: "2 tbsp", oxalate: 1 },
          { name: "Lemon", amount: "wedge", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Amara Cafe & Restaurant", area: "Pasadena", type: "Cafe",
    address: "55 S Raymond Ave, Pasadena, CA 91105",
    lat: 34.1483, lng: -118.1518, hasLowOxalate: true,
    options: [
      { dish: "Scrambled Eggs with Avocado Toast", modifications: "Request white bread",
        cookingMethod: "Scrambled eggs, white toast, smashed avocado", total: 9,
        ingredients: [
          { name: "Scrambled eggs", amount: "3 large", oxalate: 0 },
          { name: "White bread toast", amount: "2 slices", oxalate: 2 },
          { name: "Avocado", amount: "½ medium", oxalate: 3 },
          { name: "Lemon juice", amount: "1 tsp", oxalate: 1 },
          { name: "Butter", amount: "½ tbsp", oxalate: 0 },
        ]},
      { dish: "Grilled Chicken Salad", modifications: "Request romaine, no spinach",
        cookingMethod: "Grilled chicken over romaine with lemon vinaigrette", total: 8,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Cucumber", amount: "¼ cup", oxalate: 1 },
          { name: "Lemon vinaigrette", amount: "2 tbsp", oxalate: 1 },
          { name: "Parmesan shavings", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Bay Poke", area: "Pasadena", type: "Restaurant",
    address: "2345 E Colorado Blvd #195, Pasadena, CA 91107",
    lat: 34.1464, lng: -118.0989, hasLowOxalate: true,
    options: [
      { dish: "Custom Poke Bowl (white rice base)", modifications: "White rice, tuna or salmon, cucumber, avocado — skip edamame and seaweed",
        cookingMethod: "Raw ahi tuna over white rice with cucumber and avocado", total: 11,
        ingredients: [
          { name: "Ahi tuna (raw)", amount: "4 oz", oxalate: 0 },
          { name: "White rice base", amount: "1 cup", oxalate: 4 },
          { name: "Avocado", amount: "¼ medium", oxalate: 2 },
          { name: "Cucumber", amount: "¼ cup", oxalate: 1 },
          { name: "Ponzu sauce", amount: "1 tbsp", oxalate: 2 },
          { name: "Scallion", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Magnolia House", area: "Pasadena", type: "Restaurant",
    address: "492 S Lake Ave, Pasadena, CA 91101",
    lat: 34.1401, lng: -118.1318, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon with Vegetables", modifications: "None needed",
        cookingMethod: "Herb-grilled salmon, seasonal roasted vegetables", total: 7,
        ingredients: [
          { name: "Herb-grilled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Roasted zucchini", amount: "½ cup", oxalate: 2 },
          { name: "Roasted mushrooms", amount: "¼ cup", oxalate: 1 },
          { name: "Lemon butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Asparagus", amount: "4 spears", oxalate: 2 },
        ]},
      { dish: "Roasted Chicken Plate", modifications: "None needed",
        cookingMethod: "Free-range roasted chicken, pan jus, cauliflower mash", total: 5,
        ingredients: [
          { name: "Roasted chicken breast", amount: "7 oz", oxalate: 0 },
          { name: "Cauliflower mash", amount: "¾ cup", oxalate: 2 },
          { name: "Pan jus", amount: "2 tbsp", oxalate: 0 },
          { name: "Roasted garlic", amount: "3 cloves", oxalate: 0 },
          { name: "Fresh thyme", amount: "pinch", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Heidar Baba", area: "Pasadena", type: "Restaurant",
    address: "1511 E Colorado Blvd, Pasadena, CA 91106",
    lat: 34.1463, lng: -118.1118, hasLowOxalate: true,
    options: [
      { dish: "Beef Koobideh Plate", modifications: "None needed — Persian kebabs are naturally low oxalate",
        cookingMethod: "Ground beef koobideh skewer, basmati rice, grilled tomato", total: 8,
        ingredients: [
          { name: "Beef koobideh skewer", amount: "5 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
          { name: "Butter pat on rice", amount: "½ tbsp", oxalate: 0 },
          { name: "Sumac (light dusting)", amount: "pinch", oxalate: 0 },
        ]},
      { dish: "Chicken Breast Kebab", modifications: "None needed",
        cookingMethod: "Saffron-marinated chicken breast kebab over white rice", total: 7,
        ingredients: [
          { name: "Chicken breast kebab", amount: "5 oz", oxalate: 0 },
          { name: "Saffron basmati rice", amount: "1 cup", oxalate: 4 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Lamb Sultani Plate", modifications: "None needed",
        cookingMethod: "Combo of lamb barg and koobideh with white rice", total: 9,
        ingredients: [
          { name: "Lamb barg (tenderloin)", amount: "3 oz", oxalate: 0 },
          { name: "Lamb koobideh", amount: "3 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
          { name: "Butter", amount: "½ tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Abu Kabab", area: "Pasadena", type: "Restaurant",
    address: "720 N Lake Ave UNIT 9, Pasadena, CA 91104",
    lat: 34.1612, lng: -118.1318, hasLowOxalate: true,
    options: [
      { dish: "Mixed Kebab Plate", modifications: "None needed — all meats are low oxalate",
        cookingMethod: "Mixed chicken and beef kebab with white rice and salad", total: 10,
        ingredients: [
          { name: "Chicken kebab", amount: "3 oz", oxalate: 0 },
          { name: "Beef kebab", amount: "3 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Romaine salad", amount: "½ cup", oxalate: 3 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Chicken Shawarma Plate", modifications: "Request white rice, skip fries",
        cookingMethod: "Marinated rotisserie chicken over white rice with garlic sauce", total: 10,
        ingredients: [
          { name: "Chicken shawarma", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Garlic toum sauce", amount: "1 tbsp", oxalate: 0 },
          { name: "Cucumber-tomato salad", amount: "¼ cup", oxalate: 3 },
          { name: "Pickled turnip (small)", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },
];

const ALL_DISHES = RESTAURANTS.flatMap(r =>
  r.options.map(o => ({ ...o, restaurantName: r.name, restaurantArea: r.area }))
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// ─── LEAFLET MAP COMPONENT ───────────────────────────────────────────────────

function LeafletMap({ restaurants, selectedRestaurant, onSelectRestaurant, filter }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [leafletReady, setLeafletReady] = useState(false);

  // Load Leaflet CSS + JS from CDN once
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

  // Initialize map once Leaflet is ready
  useEffect(() => {
    if (!leafletReady || !mapContainerRef.current || mapRef.current) return;
    const L = window.L;

    mapRef.current = L.map(mapContainerRef.current, {
      center: [34.145, -118.155],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current);
  }, [leafletReady]);

  // Add/update markers whenever restaurants or filter changes
  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;
    const L = window.L;
    const map = mapRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};

    const filtered = restaurants.filter(r => {
      if (filter === "low") return r.hasLowOxalate;
      if (filter === "high") return !r.hasLowOxalate;
      return true;
    });

    filtered.forEach(r => {
      const color = r.hasLowOxalate ? "#16a34a" : "#dc2626";
      const border = r.hasLowOxalate ? "#14532d" : "#7f1d1d";
      const hasMenu = r.options.length > 0;
      const isSelected = selectedRestaurant && selectedRestaurant.name === r.name;
      const size = isSelected ? 18 : 13;
      const dot = hasMenu ? `<div style="position:absolute;top:-3px;right:-3px;width:7px;height:7px;background:#20B55D;border-radius:50%;border:1.5px solid white;"></div>` : "";

      const icon = L.divIcon({
        className: "",
        html: `<div style="position:relative;width:${size*2}px;height:${size*2}px;">
          <div style="
            width:${size*2}px;height:${size*2}px;
            background:${isSelected ? color : "white"};
            border:${isSelected ? 3 : 2.5}px solid ${color};
            border-radius:50%;
            box-shadow:0 2px 6px rgba(0,0,0,0.3);
            display:flex;align-items:center;justify-content:center;
            transition:all 0.15s;
          ">
            <div style="width:${isSelected ? 8 : 6}px;height:${isSelected ? 8 : 6}px;background:${isSelected ? "white" : color};border-radius:50%;"></div>
          </div>
          ${dot}
        </div>`,
        iconSize: [size * 2, size * 2],
        iconAnchor: [size, size],
      });

      const marker = L.marker([r.lat, r.lng], { icon });
      marker.on("click", () => onSelectRestaurant(r));

      // Tooltip with restaurant name
      marker.bindTooltip(`<b>${r.name}</b><br><span style="color:${color};font-size:11px">${r.hasLowOxalate ? "✓ Low Oxalate" : "⚠ High Oxalate"}</span>${hasMenu ? `<br><span style="color:#20B55D;font-size:11px">📋 ${r.options.length} dishes mapped</span>` : ""}`, {
        direction: "top",
        offset: [0, -(size + 4)],
        className: "oxalate-tooltip"
      });

      marker.addTo(map);
      markersRef.current[r.name] = marker;
    });
  }, [leafletReady, restaurants, filter, selectedRestaurant, onSelectRestaurant]);

  // Pan to selected restaurant
  useEffect(() => {
    if (!leafletReady || !mapRef.current || !selectedRestaurant) return;
    mapRef.current.panTo([selectedRestaurant.lat, selectedRestaurant.lng], { animate: true, duration: 0.4 });
  }, [leafletReady, selectedRestaurant]);

  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid #bfdbfe" }}>
      <style>{`
        .oxalate-tooltip {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 6px 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 13px;
          line-height: 1.5;
        }
        .oxalate-tooltip::before { display: none; }
        .leaflet-control-attribution { font-size: 9px !important; }
      `}</style>
      {!leafletReady && (
        <div style={{ height: 420, background: "#DAF2E3", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "#6E7187" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 13 }}>Loading map...</div>
          </div>
        </div>
      )}
      <div ref={mapContainerRef} style={{ height: 420, display: leafletReady ? "block" : "none" }} />
      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 24, left: 12, zIndex: 1000,
        background: "rgba(255,255,255,0.95)", border: "1px solid #e5e7eb",
        borderRadius: 8, padding: "8px 11px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        {[["#16a34a", "Low Oxalate"], ["#dc2626", "High Oxalate"], ["#20B55D", "📋 Menu mapped"]].map(([color, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: "#6E7187", whiteSpace: "nowrap" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function oxColor(mg) {
  if (mg <= 5) return "#22c55e";
  if (mg <= 15) return "#84cc16";
  if (mg <= 30) return "#f59e0b";
  return "#ef4444";
}
function oxLabel(mg) {
  if (mg <= 5) return "Very Low";
  if (mg <= 15) return "Low";
  if (mg <= 30) return "Moderate";
  return "High";
}

// ─── DISH MODAL ───────────────────────────────────────────────────────────────

function DishModal({ dish, onClose, onAdd }) {
  const col = oxColor(dish.total);
  const label = oxLabel(dish.total);
  const maxOx = Math.max(...dish.ingredients.map(i => i.oxalate), 1);
  const [added, setAdded] = useState(false);

  // ── drag to dismiss ──
  const dragY = useRef(0);
  const startY = useRef(0);
  const sheetRef = useRef(null);

  const onTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    dragY.current = 0;
  };
  const onTouchMove = (e) => {
    const dy = e.touches[0].clientY - startY.current;
    if (dy < 0) return;
    dragY.current = dy;
    if (sheetRef.current) sheetRef.current.style.transform = `translateY(${dy}px)`;
  };
  const onTouchEnd = () => {
    if (dragY.current > 100) { onClose(); return; }
    if (sheetRef.current) sheetRef.current.style.transform = "translateY(0)";
  };

  const handleAdd = () => {
    onAdd(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)"
      }}
    >
      <div
        ref={sheetRef}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          width: "100%", maxWidth: 520,
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          maxHeight: "88vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
          transition: "transform 0.2s ease",
        }}
      >
        {/* Drag handle — touch here to swipe down */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ padding: "14px 0 6px", display: "flex", flexDirection: "column", alignItems: "center", cursor: "grab", flexShrink: 0 }}
        >
          <div style={{ width: 40, height: 4, background: "#B0B3C4", borderRadius: 2 }} />
          <div style={{ fontSize: 9, color: "#B0B3C4", marginTop: 4, letterSpacing: "0.06em" }}>SWIPE DOWN TO CLOSE</div>
        </div>

        <div style={{ overflowY: "auto", padding: "8px 22px 36px" }}>
          <div style={{ fontSize: 11, color: "#6E7187", marginBottom: 8 }}>
            {dish.restaurantName} · {dish.restaurantArea}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", lineHeight: 1.3, flex: 1 }}>{dish.dish}</div>
            <div style={{ textAlign: "center", background: col + "18", border: `2px solid ${col}44`, borderRadius: 10, padding: "8px 14px", flexShrink: 0 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: col, lineHeight: 1 }}>{dish.total}</div>
              <div style={{ fontSize: 9, color: col, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>mg oxalate</div>
              <div style={{ fontSize: 10, color: col }}>{label}</div>
            </div>
          </div>
          {dish.modifications && dish.modifications !== "None needed" && (
            <div style={{ background: "#DAF2E3", border: "1px solid #bfdbfe", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: "#145F30" }}>
              <span style={{ fontWeight: 700 }}>Tip: </span>{dish.modifications}
            </div>
          )}
          <div style={{ fontSize: 11, color: "#6E7187", marginBottom: 14 }}>🍳 {dish.cookingMethod}</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#6E7187", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Ingredients</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {dish.ingredients.map((ing, i) => {
              const pct = ing.oxalate === 0 ? 0 : Math.max((ing.oxalate / maxOx) * 100, 6);
              const c = oxColor(ing.oxalate);
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{ing.name}</span>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#6E7187" }}>{ing.amount}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: ing.oxalate === 0 ? "#6E7187" : c, minWidth: 36, textAlign: "right" }}>{ing.oxalate} mg</span>
                    </div>
                  </div>
                  <div style={{ height: 3, background: "#DAF2E3", borderRadius: 2 }}>
                    {ing.oxalate > 0 && <div style={{ height: "100%", width: pct + "%", background: c, borderRadius: 2, opacity: 0.7 }} />}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid #f3f4f6", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6E7187" }}>Total Oxalate</div>
              <div style={{ fontSize: 11, color: "#6E7187" }}>Daily target: 50–100mg</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: col }}>{dish.total} mg</div>
              <div style={{ fontSize: 10, color: col }}>{label}</div>
            </div>
          </div>

          {/* Delivery links */}
          {(() => {
            const q = encodeURIComponent(dish.restaurantName);
            const loc = encodeURIComponent("Pasadena, CA");
            const platforms = [
              {
                name: "Uber Eats",
                url: `https://www.ubereats.com/search?q=${q}&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMlBhc2FkZW5hJTIwQ0ElMjIlN0Q=`,
                bg: "#000000",
                logo: (
                  <svg width="52" height="16" viewBox="0 0 52 16" fill="none">
                    <text x="0" y="12" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" fill="#fff">Uber</text>
                    <text x="28" y="12" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#06c167">Eats</text>
                  </svg>
                )
              },
              {
                name: "DoorDash",
                url: `https://www.doordash.com/search/store/${q}/?query=${q}`,
                bg: "#ff3008",
                logo: (
                  <svg width="72" height="16" viewBox="0 0 72 16" fill="none">
                    <text x="0" y="12" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" fill="#fff">DoorDash</text>
                  </svg>
                )
              },
              {
                name: "Grubhub",
                url: `https://www.grubhub.com/search?queryText=${q}&orderMethod=delivery&locationMode=DELIVERY&facetSet=umamiV2&pageSize=20&hideHateos=true&fetchCount=20&cityState=Pasadena%2C+CA`,
                bg: "#f63440",
                logo: (
                  <svg width="62" height="16" viewBox="0 0 62 16" fill="none">
                    <text x="0" y="12" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" fill="#fff">Grubhub</text>
                  </svg>
                )
              },
            ];
            return (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#6E7187", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 9 }}>
                  Order for delivery
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {platforms.map(p => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        flex: 1, background: p.bg, borderRadius: 8, padding: "9px 6px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        textDecoration: "none", transition: "opacity 0.15s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      title={`Search ${dish.restaurantName} on ${p.name}`}
                    >
                      {p.logo}
                    </a>
                  ))}
                </div>

                {/* ── ADD TO LOG BUTTON ── */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                  <button
                    onClick={handleAdd}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: added ? "#22c55e" : "#20B55D",
                      color: "#fff", border: "none", borderRadius: 50,
                      padding: "11px 28px", fontSize: 14, fontWeight: 700,
                      cursor: "pointer", transition: "background 0.2s, transform 0.1s",
                      boxShadow: "0 2px 12px rgba(79,70,229,0.35)",
                      transform: added ? "scale(0.97)" : "scale(1)"
                    }}
                  >
                    {added ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="2 8 6 12 14 4"/>
                        </svg>
                        Added to Log!
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/>
                        </svg>
                        Add to Today's Log
                      </>
                    )}
                  </button>
                </div>

                <div style={{ fontSize: 10, color: "#6E7187", textAlign: "center" }}>
                  Opens search for "{dish.restaurantName}" on each platform
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

// ─── MENU PANEL ───────────────────────────────────────────────────────────────

function MenuPanel({ restaurant, onDishSelect, onClose }) {
  const hasMenu = restaurant.options.length > 0;
  return (
    <div style={{
      background: "#fff", borderRadius: 12,
      border: "1px solid #e5e7eb",
      display: "flex", flexDirection: "column",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
    }}>
      <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{restaurant.name}</div>
            <div style={{ fontSize: 11, color: "#6E7187" }}>{restaurant.area} · {restaurant.type}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{
              padding: "3px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700,
              background: restaurant.hasLowOxalate ? "#DAF2E3" : "#fef2f2",
              color: restaurant.hasLowOxalate ? "#16a34a" : "#dc2626",
              border: "1px solid " + (restaurant.hasLowOxalate ? "#86efac" : "#fca5a5")
            }}>
              {restaurant.hasLowOxalate ? "✓ Low Oxalate" : "⚠ High Oxalate"}
            </span>
            <button onClick={onClose} style={{
              background: "#DAF2E3", border: "1px solid #e5e7eb", color: "#6E7187",
              borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>×</button>
          </div>
        </div>
      </div>
      <div style={{ overflowY: "auto", padding: "10px 14px", flex: 1 }}>
        {!hasMenu ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "#6E7187" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🍽</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#6E7187" }}>No detailed menu data</div>
            <div style={{ fontSize: 11, marginTop: 4 }}>This location hasn't been mapped yet</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 10, color: "#6E7187", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              Tap a dish for full breakdown
            </div>
            {restaurant.options.map((opt, i) => {
              const col = oxColor(opt.total);
              return (
                <button key={i} onClick={() => onDishSelect({ ...opt, restaurantName: restaurant.name, restaurantArea: restaurant.area })}
                  style={{
                    width: "100%", textAlign: "left", background: "#FFFFFF",
                    border: "1px solid #e5e7eb", borderRadius: 8,
                    padding: "11px 13px", marginBottom: 7, cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#DAF2E3"; e.currentTarget.style.borderColor = "#B8D9C8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#C8CADB"; }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{opt.dish}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {opt.ingredients.slice(0, 3).map((ing, j) => (
                        <span key={j} style={{ fontSize: 10, color: "#6E7187", background: "#DAF2E3", borderRadius: 4, padding: "1px 5px" }}>
                          {ing.name.split(" ")[0]}
                        </span>
                      ))}
                      {opt.ingredients.length > 3 && <span style={{ fontSize: 10, color: "#6E7187" }}>+{opt.ingredients.length - 3} more</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: col, lineHeight: 1 }}>{opt.total}</div>
                    <div style={{ fontSize: 9, color: col, fontWeight: 700, textTransform: "uppercase" }}>{oxLabel(opt.total)}</div>
                  </div>
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

// ─── INPUT SANITIZATION ──────────────────────────────────────────────────────

// Strip HTML tags, null bytes, and normalise whitespace
function sanitizeText(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/\0/g, "")                        // null bytes
    .replace(/<[^>]*>/g, "")                   // HTML / script tags
    .replace(/javascript\s*:/gi, "")           // js: protocol
    .replace(/on\w+\s*=/gi, "")               // inline event attrs  e.g. onerror=
    .replace(/[\u200B-\u200D\uFEFF]/g, "")    // zero-width chars
    .trim();
}

function sanitizeName(str) {
  const s = sanitizeText(str).slice(0, 50);   // 50 char cap on names
  // Only allow letters, numbers, spaces, hyphens, apostrophes
  return s.replace(/[^a-zA-Z0-9 '\-\.]/g, "");
}

function sanitizeContent(str) {
  return sanitizeText(str).slice(0, 1000);    // 1 000 char cap on post body
}

function sanitizeOxalate(val) {
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 0) return null;
  return Math.min(n, 99999);                   // upper bound guard
}

// ─── CLIENT-SIDE RATE LIMITER ─────────────────────────────────────────────────
// Stores action timestamps in memory; resets on page reload (appropriate for
// a client-only app). When you add a real backend, mirror this logic server-side.

const rateLimits = {
  post:    { windowMs: 60_000, max: 3  },   // 3 posts per minute
  like:    { windowMs: 10_000, max: 10 },   // 10 likes per 10 seconds
};
const rlState = { post: [], like: [] };

function checkRateLimit(action) {
  const now = Date.now();
  const cfg  = rateLimits[action];
  // Purge timestamps outside the window
  rlState[action] = rlState[action].filter(t => now - t < cfg.windowMs);
  if (rlState[action].length >= cfg.max) return false;   // blocked
  rlState[action].push(now);
  return true;   // allowed
}

// ─── COMMUNITY PAGE ──────────────────────────────────────────────────────────
// Aesthetic: organic wellness — deep forest greens, warm cream, editorial cards
// Health app deep-links: Apple Health, Google Fit, Samsung Health

const PROFILE_DEFAULTS = {
  // § 1 — Identity
  name: "", height_ft: "", height_in: "", weight: "", sex: "",
  // § 2 — Oxalate & Eating Goals
  oxalate_goal: "moderate",   // low | moderate | strict
  oxalate_custom_mg: "",
  eating_goals: [],
  dietary_restrictions: [],
  food_allergies: [],
  intolerances: [],
  texture_sensitive: null,    // true | false | null
  // § 3 — Medical
  medical_conditions: [],
  kidney_stone_size_mm: "",
  // § 4–6 — Food Preferences
  fav_cuisines: [],
  fav_ingredients: [],
  disliked_ingredients: [],
  // § 7 — Spice
  spicy: null,                // "none" | "mild" | "medium" | "hot" | "extreme"
  // § 8 — Patterns
  eating_patterns: [],
  // § 9 — Meals
  meals_per_day: 3,
  count_snacks: true,
  // § 10 — Location
  location: "",
  // Health app
  health_connected: [],
};

function sanitizeProfileText(s) {
  if (typeof s !== "string") return "";
  return s.replace(/\0/g,"").replace(/<[^>]*>/g,"").replace(/javascript\s*:/gi,"").trim().slice(0, 120);
}

// ── Health app deep-link helpers ──────────────────────────────────────────────
function openHealthApp(app) {
  const urls = {
    apple:   "x-apple-health://",          // iOS Health app
    google:  "https://health.google.com",  // Google Health / Fit web portal
    samsung: "shealth://",                 // Samsung Health app URI scheme
  };
  const fallbacks = {
    apple:   "https://support.apple.com/guide/iphone/intro-to-health-iphbefba7973/ios",
    google:  "https://health.google.com",
    samsung: "https://health.samsung.com",
  };
  try {
    window.location.href = urls[app];
    // Fallback after 1.5s if app doesn't open
    setTimeout(() => window.open(fallbacks[app], "_blank"), 1500);
  } catch {
    window.open(fallbacks[app], "_blank");
  }
}

// ── Tag chip input ────────────────────────────────────────────────────────────
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
        border: "1.5px solid #d4d4a8", borderRadius: 10, background: "#FFFFFF",
        minHeight: 44, cursor: "text"
      }} onClick={() => document.getElementById("ti-" + placeholder)?.focus()}>
        {tags.map(tag => (
          <span key={tag} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "#20B55D", color: "#DAF2E3", fontSize: 11, fontWeight: 700,
            padding: "3px 10px 3px 10px", borderRadius: 999
          }}>
            {tag}
            <button onClick={() => remove(tag)} style={{ background: "none", border: "none", color: "#6DD4A0", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0, marginLeft: 2 }}>×</button>
          </span>
        ))}
        <input
          id={"ti-" + placeholder}
          value={input}
          onChange={e => { setInput(e.target.value); setShowSug(true); }}
          onKeyDown={e => { if ((e.key === "Enter" || e.key === ",") && input.trim()) { e.preventDefault(); add(input.trim()); } if (e.key === "Backspace" && !input && tags.length) remove(tags[tags.length-1]); }}
          onFocus={() => setShowSug(true)}
          onBlur={() => setTimeout(() => setShowSug(false), 180)}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#145F30", fontFamily: "inherit", minWidth: 100, flex: 1 }}
        />
      </div>
      {showSug && (filtered.length > 0 || input.length > 1) && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 200, background: "#fff", border: "1px solid #d4d4a8", borderRadius: 8, boxShadow: "0 6px 20px rgba(0,0,0,0.1)", marginTop: 4, overflow: "hidden" }}>
          {input.length > 1 && !filtered.includes(input.trim()) && (
            <div onMouseDown={() => add(input.trim())} style={{ padding: "9px 12px", cursor: "pointer", fontSize: 12, color: "#20B55D", fontWeight: 700, borderBottom: filtered.length ? "1px solid #f0f0e8" : "none" }}>
              + Add "{input.trim()}"
            </div>
          )}
          {filtered.map(s => (
            <div key={s} onMouseDown={() => add(s)} style={{ padding: "9px 12px", cursor: "pointer", fontSize: 13, color: "#374151" }}
              onMouseEnter={e => e.currentTarget.style.background = "#DAF2E3"}
              onMouseLeave={e => e.currentTarget.style.background = ""}
            >{s}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Multi-select pill group ───────────────────────────────────────────────────
function PillGroup({ options, value, onChange, multi = true, color = "#20B55D" }) {
  function toggle(opt) {
    if (!multi) { onChange(value === opt ? null : opt); return; }
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]);
  }
  const isActive = (opt) => multi ? (value || []).includes(opt) : value === opt;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {options.map(opt => {
        const active = isActive(typeof opt === "object" ? opt.value : opt);
        const label  = typeof opt === "object" ? opt.label : opt;
        const val    = typeof opt === "object" ? opt.value : opt;
        return (
          <button key={val} onClick={() => toggle(val)} style={{
            padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer",
            border: `1.5px solid ${active ? color : "#B8D9C8"}`,
            background: active ? color : "#FFFFFF",
            color: active ? "#fff" : "#6E7187",
            transition: "all 0.15s"
          }}>{label}</button>
        );
      })}
    </div>
  );
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function SectionCard({ number, title, icon, children, accent = "#20B55D" }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, border: "1px solid #6E7187",
      overflow: "hidden", marginBottom: 16,
      boxShadow: "0 2px 12px rgba(45,80,22,0.06)"
    }}>
      {/* Section header */}
      <div style={{
        background: `linear-gradient(135deg, ${accent}12, ${accent}06)`,
        borderBottom: `1px solid ${accent}22`,
        padding: "14px 18px",
        display: "flex", alignItems: "center", gap: 10
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: accent, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 900
        }}>{number}</div>
        <span style={{ fontSize: 14, fontWeight: 800, color: "#145F30", letterSpacing: "-0.01em" }}>
          {icon} {title}
        </span>
      </div>
      <div style={{ padding: "16px 18px" }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#6E7187", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</div>
      {children}
      {hint && <div style={{ fontSize: 10, color: "#6E7187", marginTop: 4 }}>{hint}</div>}
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
          border: "1.5px solid #d4d4a8", borderRadius: 8, outline: "none",
          background: "#FFFFFF", color: "#145F30", fontFamily: "inherit",
          boxSizing: "border-box"
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#189E4E"}
        onBlur={e => e.currentTarget.style.borderColor = "#B8D9C8"}
      />
      {unit && <span style={{ fontSize: 12, color: "#6E7187", whiteSpace: "nowrap" }}>{unit}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function ProfilePage() {
  const [profile, setProfile] = useState(PROFILE_DEFAULTS);
  const [saved, setSaved]     = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    setLoading(true);
    try {
      const r = await window.storage.get("lo-profile-v1", false);
      if (r?.value) setProfile({ ...PROFILE_DEFAULTS, ...JSON.parse(r.value) });
    } catch (_) {}
    setLoading(false);
  }

  async function saveProfile() {
    setSaveError("");
    // Basic validation
    if (profile.name && profile.name.length < 2) { setSaveError("Name must be at least 2 characters."); return; }
    if (profile.weight && (isNaN(profile.weight) || profile.weight < 50 || profile.weight > 700)) { setSaveError("Please enter a valid weight."); return; }

    try {
      await window.storage.set("lo-profile-v1", JSON.stringify(profile), false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { setSaveError("Could not save profile. Please try again."); }
  }

  function set(key, val) {
    setProfile(p => ({ ...p, [key]: val }));
    setSaved(false);
  }

  const completionFields = [
    profile.name, profile.sex, profile.height_ft, profile.weight,
    profile.oxalate_goal, profile.location,
    profile.medical_conditions.length > 0 ? "x" : null,
    profile.eating_patterns.length > 0 ? "x" : null,
  ];
  const completion = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center", color: "#6E7187" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
        <div style={{ fontSize: 14 }}>Loading your profile...</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#DAF2E3", minHeight: "100vh" }}>

      {/* ── Hero header ── */}
      <div style={{
        background: "linear-gradient(160deg, #145F30 0%, #20B55D 55%, #189E4E 100%)",
        padding: "28px 20px 80px", position: "relative", overflow: "hidden"
      }}>
        {/* Background texture circles */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", top: 20, right: 20, width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: 10, left: -30, width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />

        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20, position: "relative", zIndex: 2 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg, #6DD4A0, #20B55D)",
            border: "3px solid rgba(255,255,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, fontWeight: 900, color: "#fff",
            flexShrink: 0
          }}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : "🌿"}
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
              {profile.name || "Your Profile"}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
              {profile.location || "Set your location"} · {profile.sex || "—"}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
              Low Oxalate · {profile.oxalate_goal === "low" ? "Strict" : profile.oxalate_goal === "moderate" ? "Moderate" : "Custom"} Goal
            </div>
          </div>
        </div>

        {/* Completion bar */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Profile Completion</span>
            <span style={{ fontSize: 12, color: "#6DD4A0", fontWeight: 800 }}>{completion}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 999, height: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", width: completion + "%", background: "linear-gradient(90deg, #a8d46f, #6abf2e)", borderRadius: 999, transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      {/* ── Health App Integration ── */}
      <div style={{ margin: "-38px 16px 16px", position: "relative", zIndex: 10 }}>
        <div style={{
          background: "#fff", borderRadius: 16, padding: "16px",
          border: "1px solid #6E7187", boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#6E7187", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            🔗 Connect Health App
          </div>
          <div style={{ fontSize: 11, color: "#6E7187", marginBottom: 12, lineHeight: 1.5 }}>
            Sync your health metrics (weight, activity, vitals) from your existing health app.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              {
                id: "apple",
                label: "Apple Health",
                logo: "🍎",
                color: "#ff3b30",
                note: "iOS only"
              },
              {
                id: "google",
                label: "Google Fit",
                logo: "🟢",
                color: "#4285f4",
                note: "Android/Web"
              },
              {
                id: "samsung",
                label: "Samsung Health",
                logo: "🔵",
                color: "#1428a0",
                note: "Galaxy only"
              },
            ].map(app => {
              const connected = profile.health_connected?.includes(app.id);
              return (
                <button key={app.id}
                  onClick={() => {
                    openHealthApp(app.id);
                    if (!connected) set("health_connected", [...(profile.health_connected || []), app.id]);
                  }}
                  style={{
                    flex: 1, padding: "10px 6px", borderRadius: 10, cursor: "pointer",
                    border: `1.5px solid ${connected ? app.color + "66" : "#C8CADB"}`,
                    background: connected ? app.color + "0f" : "#FFFFFF",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    transition: "all 0.15s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = app.color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = connected ? app.color + "66" : "#C8CADB"; }}
                >
                  <span style={{ fontSize: 20 }}>{app.logo}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: connected ? app.color : "#374151", textAlign: "center", lineHeight: 1.2 }}>{app.label}</span>
                  <span style={{ fontSize: 9, color: connected ? app.color + "99" : "#6E7187" }}>{connected ? "✓ Linked" : app.note}</span>
                </button>
              );
            })}
          </div>
          <div style={{ fontSize: 10, color: "#B0B3C4", marginTop: 10, textAlign: "center" }}>
            Deep-links open the health app on your device. Data stays on your device.
          </div>
        </div>
      </div>

      {/* ── Scrollable form sections ── */}
      <div style={{ padding: "0 16px 20px" }}>

        {/* § 1 — Identity */}
        <SectionCard number="1" title="About You" icon="👤" accent="#20B55D">
          <Field label="Full Name">
            <Input value={profile.name} onChange={v => set("name", sanitizeProfileText(v))} placeholder="Your name" />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
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
            <PillGroup
              multi={false}
              value={profile.sex}
              onChange={v => set("sex", v)}
              options={["Male", "Female", "Non-binary", "Prefer not to say"]}
            />
          </Field>
        </SectionCard>

        {/* § 2 — Oxalate & Eating Goals */}
        <SectionCard number="2" title="Goals & Dietary Needs" icon="🎯" accent="#189E4E">
          <Field label="Oxalate Goal" hint="Strict = <50mg/day · Moderate = 50–100mg/day · Custom = set your own">
            <PillGroup
              multi={false}
              value={profile.oxalate_goal}
              onChange={v => set("oxalate_goal", v)}
              options={[{value:"strict",label:"Strict <50mg"},{value:"moderate",label:"Moderate 50–100mg"},{value:"custom",label:"Custom"}]}
              color="#189E4E"
            />
            {profile.oxalate_goal === "custom" && (
              <div style={{ marginTop: 8 }}>
                <Input value={profile.oxalate_custom_mg} onChange={v => set("oxalate_custom_mg", v)} placeholder="Enter target" type="number" min={10} max={500} unit="mg/day" />
              </div>
            )}
          </Field>
          <Field label="Eating Goals">
            <PillGroup value={profile.eating_goals} onChange={v => set("eating_goals", v)}
              options={["Weight loss","Weight gain","Maintain weight","Reduce inflammation","Kidney stone prevention","Gut health","Energy","Athletic performance"]}
              color="#189E4E"
            />
          </Field>
          <Field label="Dietary Restrictions">
            <PillGroup value={profile.dietary_restrictions} onChange={v => set("dietary_restrictions", v)}
              options={["Vegan","Vegetarian","Pescatarian","Keto","Paleo","Gluten-free","Dairy-free","Nut-free","Halal","Kosher","Low-FODMAP"]}
              color="#20B55D"
            />
          </Field>
          <Field label="Food Allergies">
            <TagInput
              tags={profile.food_allergies}
              onChange={v => set("food_allergies", v)}
              placeholder="Type an allergy and press Enter…"
              suggestions={["Peanuts","Tree nuts","Milk","Eggs","Fish","Shellfish","Wheat","Soy","Sesame","Mustard"]}
            />
          </Field>
          <Field label="Intolerances">
            <TagInput
              tags={profile.intolerances}
              onChange={v => set("intolerances", v)}
              placeholder="e.g. Lactose, Fructose…"
              suggestions={["Lactose","Fructose","Gluten","Sorbitol","Caffeine","Histamine","Sulfites","FODMAPs"]}
            />
          </Field>
          <Field label="Texture Sensitivity" hint="Do certain food textures affect what you can comfortably eat?">
            <PillGroup multi={false} value={profile.texture_sensitive === true ? "yes" : profile.texture_sensitive === false ? "no" : null}
              onChange={v => set("texture_sensitive", v === "yes")}
              options={[{value:"yes",label:"Yes, I have texture sensitivities"},{value:"no",label:"No, all textures are fine"}]}
              color="#189E4E"
            />
          </Field>
        </SectionCard>

        {/* § 3 — Medical */}
        <SectionCard number="3" title="Medical Conditions" icon="🏥" accent="#c2410c">
          <Field label="Conditions" hint="Select all that apply — this helps personalize your oxalate targets">
            <PillGroup value={profile.medical_conditions} onChange={v => set("medical_conditions", v)}
              options={[
                {value:"kidney_stones",label:"Kidney Stones"},
                {value:"hyperoxaluria_primary",label:"Primary Hyperoxaluria"},
                {value:"hyperoxaluria_enteric",label:"Enteric Hyperoxaluria"},
                {value:"ibs",label:"IBS"},
                {value:"crohns",label:"Crohn's Disease"},
                {value:"celiac",label:"Celiac"},
                {value:"gout",label:"Gout"},
                {value:"vulvodynia",label:"Vulvodynia"},
                {value:"autism",label:"Autism Spectrum"},
                {value:"none",label:"None of the above"},
              ]}
              color="#c2410c"
            />
          </Field>
          {profile.medical_conditions.includes("kidney_stones") && (
            <Field label="Largest Kidney Stone Size" hint="If known — helps calibrate your personal risk level">
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Input value={profile.kidney_stone_size_mm} onChange={v => set("kidney_stone_size_mm", v)} placeholder="e.g. 4" type="number" min={1} max={30} unit="mm" />
                <div style={{ fontSize: 11, color: "#6E7187", lineHeight: 1.4 }}>
                  {profile.kidney_stone_size_mm < 4 ? "Typically passable" :
                   profile.kidney_stone_size_mm < 8 ? "May need intervention" :
                   profile.kidney_stone_size_mm >= 8 ? "Usually requires treatment" : ""}
                </div>
              </div>
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[{v:"<4",l:"<4mm — passable"},{v:"4-6",l:"4–6mm"},{v:"6-8",l:"6–8mm"},{v:">8",l:">8mm — large"}].map(({v,l}) => (
                  <button key={v} onClick={() => set("kidney_stone_size_mm", v)} style={{
                    padding: "5px 11px", fontSize: 11, borderRadius: 999, cursor: "pointer",
                    border: "1px solid #fcd34d", background: "#fffbeb", color: "#92400e", fontWeight: 600
                  }}>{l}</button>
                ))}
              </div>
            </Field>
          )}
        </SectionCard>

        {/* § 4 — Favorite Cuisines */}
        <SectionCard number="4" title="Favorite Cuisines" icon="🌍" accent="#20B55D">
          <Field label="Cuisines you love">
            <PillGroup value={profile.fav_cuisines} onChange={v => set("fav_cuisines", v)}
              options={["American","Mexican","Italian","Japanese","Chinese","Korean","Thai","Vietnamese","Indian","Mediterranean","Middle Eastern","Greek","French","Spanish","Caribbean","Ethiopian","Peruvian","Filipino"]}
              color="#20B55D"
            />
          </Field>
        </SectionCard>

        {/* § 5 — Favorite Ingredients */}
        <SectionCard number="5" title="Favorite Ingredients" icon="💚" accent="#20B55D">
          <Field label="Ingredients you love" hint="Press Enter or comma to add">
            <TagInput
              tags={profile.fav_ingredients}
              onChange={v => set("fav_ingredients", v)}
              placeholder="e.g. avocado, salmon, cauliflower…"
              suggestions={["Avocado","Salmon","Cauliflower","Chicken","Eggs","Zucchini","White rice","Cucumber","Romaine","Garlic","Lemon","Olive oil","Butter","Mushrooms","Bok choy","Shrimp","Turkey"]}
            />
          </Field>
        </SectionCard>

        {/* § 6 — Disliked Ingredients */}
        <SectionCard number="6" title="Disliked Ingredients" icon="🚫" accent="#20B55D">
          <Field label="Ingredients to avoid" hint="We'll exclude these from recommendations">
            <TagInput
              tags={profile.disliked_ingredients}
              onChange={v => set("disliked_ingredients", v)}
              placeholder="e.g. beets, spinach, tofu…"
              suggestions={["Spinach","Beets","Almonds","Peanuts","Rhubarb","Swiss chard","Sweet potato","Chocolate","Black tea","Tofu","Soy milk","Okra"]}
            />
          </Field>
        </SectionCard>

        {/* § 7 — Spice */}
        <SectionCard number="7" title="Spice Tolerance" icon="🌶" accent="#dc2626">
          <Field label="How do you handle heat?">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                {v:"none",    l:"😌 None",     sub:"No spice"},
                {v:"mild",    l:"🌿 Mild",     sub:"A little"},
                {v:"medium",  l:"🌶 Medium",   sub:"Bring it"},
                {v:"hot",     l:"🔥 Hot",      sub:"Love it"},
                {v:"extreme", l:"💀 Extreme",  sub:"Challenge"},
              ].map(({ v, l, sub }) => {
                const active = profile.spicy === v;
                return (
                  <button key={v} onClick={() => set("spicy", v)} style={{
                    flex: "1 1 80px", padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                    border: `2px solid ${active ? "#dc2626" : "#C8CADB"}`,
                    background: active ? "#fef2f2" : "#FFFFFF",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    transition: "all 0.15s"
                  }}>
                    <span style={{ fontSize: 16 }}>{l.split(" ")[0]}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: active ? "#dc2626" : "#374151" }}>{l.split(" ").slice(1).join(" ")}</span>
                    <span style={{ fontSize: 9, color: "#6E7187" }}>{sub}</span>
                  </button>
                );
              })}
            </div>
          </Field>
        </SectionCard>

        {/* § 8 — Eating Patterns */}
        <SectionCard number="8" title="Eating Patterns" icon="🔄" accent="#20B55D">
          <Field label="How do you typically eat?" hint="Select all that match your lifestyle">
            <PillGroup value={profile.eating_patterns} onChange={v => set("eating_patterns", v)}
              options={[
                {value:"intermittent_fasting",label:"Intermittent Fasting"},
                {value:"time_restricted",label:"Time-Restricted Eating"},
                {value:"grazing",label:"Grazing (small frequent meals)"},
                {value:"3_meals",label:"3 Structured Meals"},
                {value:"meal_prep",label:"Meal Prep / Batch Cook"},
                {value:"eating_out",label:"Frequent Dining Out"},
                {value:"late_night",label:"Late Night Eating"},
                {value:"skips_breakfast",label:"Skips Breakfast"},
                {value:"skips_lunch",label:"Skips Lunch"},
                {value:"mindful",label:"Mindful / Intuitive Eating"},
                {value:"emotional",label:"Emotional Eating"},
                {value:"stress",label:"Stress Eating"},
              ]}
              color="#20B55D"
            />
          </Field>
        </SectionCard>

        {/* § 9 — Meals Per Day */}
        <SectionCard number="9" title="Meals Per Day" icon="🍽" accent="#20B55D">
          <Field label="How many meals / eating occasions per day?">
            {/* Slider + big number display */}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 56, fontWeight: 900, color: "#20B55D", lineHeight: 1 }}>
                {profile.meals_per_day}
              </div>
              <div style={{ fontSize: 12, color: "#6E7187" }}>
                {profile.count_snacks ? "including snacks" : "not counting snacks"}
              </div>
            </div>
            <input type="range" min={2} max={5} step={1} value={profile.meals_per_day}
              onChange={e => set("meals_per_day", parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#20B55D", marginBottom: 12 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              {[2,3,4,5].map(n => (
                <button key={n} onClick={() => set("meals_per_day", n)} style={{
                  width: 44, height: 44, borderRadius: 10, border: `2px solid ${profile.meals_per_day === n ? "#20B55D" : "#C8CADB"}`,
                  background: profile.meals_per_day === n ? "#20B55D" : "#FFFFFF",
                  color: profile.meals_per_day === n ? "#fff" : "#374151",
                  fontSize: 16, fontWeight: 800, cursor: "pointer"
                }}>{n}</button>
              ))}
            </div>
            <Field label="Count snacks as a meal?">
              <PillGroup multi={false}
                value={profile.count_snacks ? "yes" : "no"}
                onChange={v => set("count_snacks", v === "yes")}
                options={[{value:"yes",label:"✓ Yes, include snacks"},{value:"no",label:"No, meals only"}]}
                color="#20B55D"
              />
            </Field>
          </Field>
        </SectionCard>

        {/* § 10 — Location */}
        <SectionCard number="10" title="Location" icon="📍" accent="#20B55D">
          <Field label="Your area" hint="Used to personalize restaurant and event recommendations">
            <PillGroup multi={false} value={profile.location} onChange={v => set("location", v)}
              options={["Pasadena","Highland Park","South Pasadena","Eagle Rock","San Marino","Hastings Ranch","Other Pasadena area"]}
              color="#20B55D"
            />
          </Field>
        </SectionCard>

        {/* Save / Error */}
        {saveError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "#dc2626", fontWeight: 600 }}>
            {saveError}
          </div>
        )}

        <button onClick={saveProfile} style={{
          width: "100%", padding: "15px",
          background: saved ? "#20B55D" : "linear-gradient(135deg, #20B55D, #189E4E)",
          color: "#fff", border: "none", borderRadius: 14,
          fontSize: 15, fontWeight: 800, cursor: "pointer",
          boxShadow: "0 6px 20px rgba(45,80,22,0.3)",
          transition: "all 0.2s", letterSpacing: "0.01em",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8
        }}
          onMouseEnter={e => { if (!saved) e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          {saved ? "✓ Profile Saved!" : "Save Profile"}
        </button>

        <div style={{ height: 8 }} />
      </div>
    </div>
  );
}


// ─── COMMUNITY PAGE ──────────────────────────────────────────────────────────

function CommunityPage() {
  const POST_TYPES = [
    { id: "recipe",  label: "🥗 Recipe",         color: "#16a34a", bg: "#DAF2E3", border: "#86efac" },
    { id: "event",   label: "📅 Event",           color: "#20B55D", bg: "#DAF2E3", border: "#6DD4A0" },
    { id: "weekly",  label: "📊 Weekly Check-in", color: "#20B55D", bg: "#DAF2E3", border: "#6DD4A0" },
  ];

  const [posts, setPosts]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [posting, setPosting]       = useState(false);
  const [showForm, setShowForm]     = useState(false);
  const [postType, setPostType]     = useState("recipe");
  const [name, setName]             = useState("");
  const [content, setContent]       = useState("");
  const [oxTotal, setOxTotal]       = useState("");
  const [filterType, setFilterType] = useState("all");
  const [likedIds, setLikedIds]     = useState({});
  const [formError, setFormError]   = useState("");
  const [rateLimitMsg, setRateLimitMsg] = useState("");

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const result = await window.storage.get("lo-community-v1", true);
      if (result && result.value) setPosts(JSON.parse(result.value));
    } catch (_) { setPosts([]); }
    setLoading(false);
  }

  async function savePosts(list) {
    try { await window.storage.set("lo-community-v1", JSON.stringify(list), true); }
    catch (e) { console.error("Storage error", e); }
  }

  async function submitPost() {
    setFormError("");

    // ── Rate limit check ──
    if (!checkRateLimit("post")) {
      setFormError("⏱ Slow down — max 3 posts per minute. Try again shortly.");
      return;
    }

    // ── Sanitize inputs ──
    const cleanName    = sanitizeName(name);
    const cleanContent = sanitizeContent(content);
    const cleanOx      = sanitizeOxalate(oxTotal);

    // ── Validate after sanitisation ──
    if (cleanName.length < 2)   { setFormError("Name must be at least 2 characters."); return; }
    if (cleanContent.length < 10) { setFormError("Post must be at least 10 characters."); return; }
    if (postType === "weekly" && oxTotal && cleanOx === null) {
      setFormError("Weekly total must be a positive number."); return;
    }

    setPosting(true);
    const post = {
      id: Date.now(),
      type: postType,
      name: cleanName,
      content: cleanContent,
      oxTotal: postType === "weekly" ? cleanOx : null,
      ts: new Date().toISOString(),
      likes: 0,
    };
    const updated = [post, ...posts];
    setPosts(updated);
    await savePosts(updated);
    setContent(""); setOxTotal(""); setShowForm(false); setPosting(false);
  }

  async function toggleLike(postId) {
    if (likedIds[postId]) return;

    // ── Rate limit check ──
    if (!checkRateLimit("like")) {
      setRateLimitMsg("❤️ Slow down on the likes!");
      setTimeout(() => setRateLimitMsg(""), 2500);
      return;
    }

    setLikedIds(p => ({ ...p, [postId]: true }));
    const updated = posts.map(p => p.id === postId ? { ...p, likes: (p.likes || 0) + 1 } : p);
    setPosts(updated);
    await savePosts(updated);
  }

  function timeAgo(iso) {
    const s = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  }

  const filtered = filterType === "all" ? posts : posts.filter(p => p.type === filterType);

  return (
    <div style={{ padding: "0 0 20px" }}>

      {/* ── Hero banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #145F30 0%, #20B55D 60%, #189E4E 100%)",
        padding: "24px 20px 28px", color: "white", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 6 }}>LOW OXALATE LIVING</div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Welcome to the<br />Community 🌿</div>
        <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.6, maxWidth: 320 }}>
          Share recipes, plan low-oxalate picnics, and celebrate your weekly wins with people who get it.
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 18 }}>
          {[["🥗","Recipes"],["📅","Events"],["📊","Check-ins"]].map(([e, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{e}</div>
              <div style={{ fontSize: 10, opacity: 0.75, marginTop: 3, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* ── Compose button ── */}
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={{
            width: "100%", padding: "13px", borderRadius: 12, marginBottom: 14,
            background: "#20B55D", color: "white", border: "none",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 4px 14px rgba(79,70,229,0.35)", transition: "all 0.15s"
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <span style={{ fontSize: 16 }}>✏️</span> Share with the Community
          </button>
        )}

        {/* ── Composer form ── */}
        {showForm && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "18px", marginBottom: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#111827", marginBottom: 14 }}>New Post</div>

            {/* Type picker */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {POST_TYPES.map(pt => (
                <button key={pt.id} onClick={() => { setPostType(pt.id); setFormError(""); }} style={{
                  padding: "7px 13px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                  border: `2px solid ${postType === pt.id ? pt.color : "#C8CADB"}`,
                  background: postType === pt.id ? pt.bg : "#FFFFFF",
                  color: postType === pt.id ? pt.color : "#6E7187",
                  cursor: "pointer", transition: "all 0.15s"
                }}>{pt.label}</button>
              ))}
            </div>

            {/* Name — maxLength enforced in HTML and sanitized on submit */}
            <input value={name} onChange={e => { setName(e.target.value); setFormError(""); }}
              placeholder="Your name or nickname"
              maxLength={50}
              style={{ width: "100%", padding: "10px 12px", marginBottom: 10, fontSize: 13, border: "1px solid #d1d5db", borderRadius: 8, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />

            {/* Content — character counter + maxLength */}
            <div style={{ position: "relative", marginBottom: 10 }}>
              <textarea value={content} onChange={e => { setContent(e.target.value); setFormError(""); }} rows={4}
                maxLength={1000}
                placeholder={
                  postType === "recipe" ? "Share your low-oxalate recipe — ingredients, steps, tips..." :
                  postType === "event"  ? "Tell us about your event — when, where, what to bring..." :
                                         "How did your week go? Share your total mg and any wins..."
                }
                style={{ width: "100%", padding: "10px 12px 26px", fontSize: 13, border: "1px solid #d1d5db", borderRadius: 8, outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
              />
              <span style={{ position: "absolute", bottom: 8, right: 10, fontSize: 10, color: content.length > 900 ? "#ef4444" : "#B0B3C4", pointerEvents: "none" }}>
                {content.length}/1000
              </span>
            </div>

            {/* Weekly mg field */}
            {postType === "weekly" && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "10px 12px", background: "#DAF2E3", borderRadius: 8, border: "1px solid #7dd3fc" }}>
                <span style={{ fontSize: 18 }}>📊</span>
                <input type="number" value={oxTotal} onChange={e => { setOxTotal(e.target.value); setFormError(""); }}
                  placeholder="e.g. 450" min={0} max={99999}
                  style={{ width: 80, padding: "6px 8px", fontSize: 14, fontWeight: 700, border: "1px solid #7dd3fc", borderRadius: 6, outline: "none", fontFamily: "inherit", textAlign: "center" }}
                />
                <span style={{ fontSize: 12, color: "#20B55D", fontWeight: 600 }}>mg total this week</span>
              </div>
            )}

            {/* Validation / rate-limit error */}
            {formError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "9px 12px", marginBottom: 10, fontSize: 12, color: "#dc2626", fontWeight: 600 }}>
                {formError}
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowForm(false); setFormError(""); }} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#FFFFFF", color: "#6E7187", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={submitPost} disabled={posting || !name.trim() || !content.trim()} style={{
                flex: 2, padding: "10px", borderRadius: 8, border: "none",
                background: posting || !name.trim() || !content.trim() ? "#A8DEC0" : "#20B55D",
                color: "white", fontSize: 13, fontWeight: 700,
                cursor: posting ? "wait" : "pointer", transition: "background 0.15s"
              }}>{posting ? "Posting..." : "Post to Community"}</button>
            </div>
          </div>
        )}

        {/* ── Rate limit toast ── */}
        {rateLimitMsg && (
          <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", zIndex: 999, background: "#1f2937", color: "white", padding: "10px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.2)", whiteSpace: "nowrap" }}>
            {rateLimitMsg}
          </div>
        )}

        {/* ── Filter tabs ── */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 2 }}>
          {[["all", "✨ All"], ...POST_TYPES.map(pt => [pt.id, pt.label])].map(([id, label]) => (
            <button key={id} onClick={() => setFilterType(id)} style={{
              padding: "6px 13px", borderRadius: 999, fontSize: 11, fontWeight: 700,
              border: "1px solid", whiteSpace: "nowrap", cursor: "pointer", transition: "all 0.15s",
              background: filterType === id ? "#111827" : "#fff",
              borderColor: filterType === id ? "#111827" : "#C8CADB",
              color: filterType === id ? "white" : "#6E7187",
              flexShrink: 0
            }}>{label}</button>
          ))}
        </div>

        {/* ── Feed ── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#6E7187" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🌿</div>
            <div style={{ fontSize: 13 }}>Loading community...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>
              {filterType === "recipe" ? "🥗" : filterType === "event" ? "📅" : filterType === "weekly" ? "📊" : "🌱"}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
              {posts.length === 0 ? "Be the first to post!" : "Nothing here yet"}
            </div>
            <div style={{ fontSize: 12, color: "#6E7187", lineHeight: 1.6 }}>
              {posts.length === 0
                ? "Share a recipe, plan a picnic, or post your weekly oxalate total to get things started."
                : "Be the first to share one of these!"}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(post => {
              const pt = POST_TYPES.find(p => p.id === post.type) || POST_TYPES[0];
              const isLiked = likedIds[post.id];
              return (
                <div key={post.id} style={{
                  background: "#fff", borderRadius: 14,
                  border: `1px solid ${pt.border}`,
                  padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                  {/* Post header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${pt.color}, ${pt.color}88)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 15, fontWeight: 900, color: "white", flexShrink: 0
                      }}>
                        {post.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{post.name}</div>
                        <div style={{ fontSize: 10, color: "#6E7187" }}>{timeAgo(post.ts)}</div>
                      </div>
                    </div>
                    <span style={{
                      padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700,
                      background: pt.bg, color: pt.color, border: `1px solid ${pt.border}`, flexShrink: 0
                    }}>{pt.label}</span>
                  </div>

                  {/* Weekly oxalate highlight card */}
                  {post.type === "weekly" && post.oxTotal != null && (
                    <div style={{
                      borderRadius: 10, padding: "10px 14px", marginBottom: 12,
                      background: post.oxTotal < 350 ? "#DAF2E3" : post.oxTotal < 700 ? "#fffbeb" : "#fef2f2",
                      border: `1px solid ${post.oxTotal < 350 ? "#86efac" : post.oxTotal < 700 ? "#fde68a" : "#fca5a5"}`,
                      display: "flex", alignItems: "center", gap: 12
                    }}>
                      <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1, color: post.oxTotal < 350 ? "#16a34a" : post.oxTotal < 700 ? "#d97706" : "#dc2626" }}>
                        {post.oxTotal}
                        <span style={{ fontSize: 13, fontWeight: 600 }}>mg</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>Weekly Total</div>
                        <div style={{ fontSize: 11, color: "#6E7187" }}>
                          {post.oxTotal < 350 ? "🏆 Outstanding week!" : post.oxTotal < 700 ? "👍 On track" : "💪 Keep going, every day counts"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Post body */}
                  <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.65, whiteSpace: "pre-wrap", marginBottom: 14 }}>
                    {post.content}
                  </div>

                  {/* Like row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 12, borderTop: "1px solid #f3f4f6" }}>
                    <button onClick={() => toggleLike(post.id)} style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "5px 14px",
                      borderRadius: 999, border: `1px solid ${isLiked ? "#fca5a5" : "#C8CADB"}`,
                      background: isLiked ? "#fef2f2" : "#FFFFFF",
                      color: isLiked ? "#ef4444" : "#6E7187",
                      fontSize: 12, fontWeight: 700, cursor: isLiked ? "default" : "pointer", transition: "all 0.15s"
                    }}
                      onMouseEnter={e => { if (!isLiked) { e.currentTarget.style.borderColor = "#fca5a5"; e.currentTarget.style.color = "#ef4444"; }}}
                      onMouseLeave={e => { if (!isLiked) { e.currentTarget.style.borderColor = "#C8CADB"; e.currentTarget.style.color = "#6E7187"; }}}
                    >
                      {isLiked ? "❤️" : "🤍"} {post.likes || 0}
                    </button>
                    <span style={{ fontSize: 11, color: "#6E7187" }}>
                      {post.type === "recipe" ? "Tap ❤️ if you'd make this" :
                       post.type === "event"  ? "Tap ❤️ if you're interested" :
                                               "Tap ❤️ to cheer them on"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function RestaurantMap() {
  const [query, setQuery]                     = useState("");
  const [mealQuery, setMealQuery]             = useState("");
  const [filter, setFilter]                   = useState("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDish, setSelectedDish]       = useState(null);
  const [activeTab, setActiveTab]             = useState("map");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [trackedDishes, setTrackedDishes]     = useState([]);
  const [activePage, setActivePage]           = useState("map");

  const addToLog    = (dish) => setTrackedDishes(prev => [...prev, { id: Date.now(), dish: dish.dish, restaurantName: dish.restaurantName, total: dish.total, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
  const removeFromLog = (id) => setTrackedDishes(prev => prev.filter(d => d.id !== id));
  const clearLog    = () => setTrackedDishes([]);

  const filteredOnMap = RESTAURANTS.filter(r => {
    const matchQ = query === "" || r.name.toLowerCase().includes(query.toLowerCase()) || r.area.toLowerCase().includes(query.toLowerCase());
    const matchF = filter === "all" || (filter === "low" && r.hasLowOxalate) || (filter === "high" && !r.hasLowOxalate);
    return matchQ && matchF;
  });
  const suggestions  = query.length >= 1 ? RESTAURANTS.filter(r => r.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];
  const mealResults  = mealQuery.length >= 2 ? ALL_DISHES.filter(d => d.dish.toLowerCase().includes(mealQuery.toLowerCase()) || d.ingredients.some(i => i.name.toLowerCase().includes(mealQuery.toLowerCase()))) : [];

  // ── NAV items ──────────────────────────────────────────────────────────────
  const NAV = [
    { id: "map", label: "Map", icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#20B55D" : "none"} stroke={active ? "#20B55D" : "#6E7187"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" fill={active ? "#DAF2E3" : "none"}/>
        <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
      </svg>
    )},
    { id: "community", label: "Community", icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#DAF2E3" : "none"} stroke={active ? "#20B55D" : "#6E7187"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )},
    { id: "profile", label: "Profile", icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#DAF2E3" : "none"} stroke={active ? "#20B55D" : "#6E7187"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4" fill={active ? "#bbf7d0" : "none"}/>
      </svg>
    )},
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#DAF2E3", minHeight: "100vh", color: "#111827", paddingBottom: 68 }}>

      {/* ── HEADER ── */}
      {activePage === "map" && (
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "13px 18px" }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: "#111827" }}>🗺 Oxalate Map</div>
          <div style={{ fontSize: 11, color: "#6E7187", marginTop: 1 }}>{RESTAURANTS.length} locations · {ALL_DISHES.length} mapped dishes</div>
        </div>
      )}

      {/* ── MAP PAGE ── */}
      {activePage === "map" && (
        <>
          {/* Sub-tabs */}
          <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", overflowX: "auto" }}>
            {[["map","🗺 Find Restaurant"],["dish","🍽 Search Dish"],["track", `📋 Measured${trackedDishes.length ? ` (${trackedDishes.length})` : ""}`]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{
                padding: "10px 16px", fontSize: 12, fontWeight: 600, border: "none", background: "none",
                cursor: "pointer", color: activeTab === id ? "#20B55D" : "#6E7187",
                borderBottom: activeTab === id ? "2px solid #20B55D" : "2px solid transparent",
                whiteSpace: "nowrap", flexShrink: 0
              }}>{label}</button>
            ))}
          </div>

          <div style={{ padding: "14px 16px" }}>

            {/* ── Find Restaurant ── */}
            {activeTab === "map" && (
              <>
                <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e5e7eb", padding: "12px 14px", marginBottom: 12 }}>
                  <div style={{ position: "relative", marginBottom: 10 }}>
                    <input value={query}
                      onChange={e => { setQuery(e.target.value); setShowSuggestions(true); setSelectedRestaurant(null); }}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 160)}
                      placeholder="Search restaurant or neighborhood..."
                      style={{ width: "100%", padding: "8px 32px 8px 12px", fontSize: 13, border: "1px solid #d1d5db", borderRadius: 7, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    />
                    {query && <button onClick={() => { setQuery(""); setSelectedRestaurant(null); }} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6E7187", cursor: "pointer", fontSize: 18 }}>×</button>}
                    {showSuggestions && suggestions.length > 0 && (
                      <div style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 100, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 7, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", marginTop: 4 }}>
                        {suggestions.map(r => (
                          <div key={r.name} onMouseDown={() => { setQuery(r.name); setSelectedRestaurant(r); setShowSuggestions(false); }}
                            style={{ padding: "9px 12px", cursor: "pointer", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#DAF2E3"}
                            onMouseLeave={e => e.currentTarget.style.background = ""}
                          >
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                              <div style={{ fontSize: 11, color: "#6E7187" }}>{r.area} · {r.type}{r.options.length > 0 ? ` · ${r.options.length} dishes` : ""}</div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: r.hasLowOxalate ? "#DAF2E3" : "#fef2f2", color: r.hasLowOxalate ? "#16a34a" : "#dc2626" }}>{r.hasLowOxalate ? "Low" : "High"}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {[["all",`All (${RESTAURANTS.length})`],["low","✓ Low Oxalate"],["high","⚠ High Oxalate"]].map(([id, label]) => (
                      <button key={id} onClick={() => setFilter(id)} style={{
                        padding: "5px 11px", fontSize: 12, fontWeight: 600, borderRadius: 7, cursor: "pointer", border: "1px solid",
                        background: filter === id ? (id==="low"?"#DAF2E3":id==="high"?"#fef2f2":"#DAF2E3") : "#FFFFFF",
                        borderColor: filter === id ? (id==="low"?"#86efac":id==="high"?"#fca5a5":"#6DD4A0") : "#C8CADB",
                        color: filter === id ? (id==="low"?"#16a34a":id==="high"?"#dc2626":"#20B55D") : "#6E7187"
                      }}>{label}</button>
                    ))}
                  </div>
                </div>

                <LeafletMap restaurants={filteredOnMap} selectedRestaurant={selectedRestaurant} onSelectRestaurant={r => setSelectedRestaurant(prev => prev?.name === r.name ? null : r)} filter={filter} />

                {selectedRestaurant && (
                  <div style={{ marginTop: 10 }}>
                    <MenuPanel restaurant={selectedRestaurant} onDishSelect={setSelectedDish} onClose={() => setSelectedRestaurant(null)} />
                  </div>
                )}

                {/* Best picks strip */}
                {(() => {
                  const picks = RESTAURANTS.filter(r => r.options.length > 0)
                    .map(r => { const b = r.options.reduce((a, c) => a.total <= c.total ? a : c); return { ...b, restaurantName: r.name }; })
                    .sort((a, b) => a.total - b.total).slice(0, 4);
                  return (
                    <div style={{ marginTop: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <div style={{ width: 3, height: 18, background: "#22c55e", borderRadius: 2 }} />
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#111827" }}>Lowest Oxalate Picks</div>
                        <div style={{ fontSize: 10, color: "#6E7187" }}>tap for details</div>
                      </div>
                      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none" }}>
                        {picks.map((p, i) => {
                          const col = oxColor(p.total);
                          return (
                            <div key={i} onClick={() => setSelectedDish(p)}
                              style={{ minWidth: 148, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px", cursor: "pointer", flexShrink: 0, transition: "border-color 0.15s" }}
                              onMouseEnter={e => e.currentTarget.style.borderColor = col}
                              onMouseLeave={e => e.currentTarget.style.borderColor = "#C8CADB"}
                            >
                              <div style={{ fontSize: 18, marginBottom: 4 }}>{"🥇🥈🥉🏅"[i]}</div>
                              <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1.3, marginBottom: 3 }}>{p.dish}</div>
                              <div style={{ fontSize: 10, color: "#6E7187", marginBottom: 6 }}>{p.restaurantName}</div>
                              <div style={{ fontSize: 21, fontWeight: 800, color: col }}>{p.total}<span style={{ fontSize: 11, fontWeight: 600 }}> mg</span></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </>
            )}

            {/* ── Search Dish ── */}
            {activeTab === "dish" && (
              <div>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <input value={mealQuery} onChange={e => setMealQuery(e.target.value)}
                    placeholder="Search dishes or ingredients…"
                    style={{ width: "100%", padding: "10px 36px 10px 14px", fontSize: 13, border: "1px solid #d1d5db", borderRadius: 8, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                  {mealQuery && <button onClick={() => setMealQuery("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6E7187", cursor: "pointer", fontSize: 18 }}>×</button>}
                </div>
                {mealQuery.length < 2 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "#6E7187" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                    <div style={{ fontSize: 13 }}>Search {ALL_DISHES.length} dishes from {RESTAURANTS.filter(r => r.options.length > 0).length} restaurants</div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>Also searches by ingredient name</div>
                  </div>
                ) : mealResults.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "32px 0", color: "#6E7187" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>😔</div>
                    <div style={{ fontSize: 13 }}>No results for "{mealQuery}"</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {mealResults.map((dish, i) => {
                      const col = oxColor(dish.total);
                      return (
                        <div key={i} onClick={() => setSelectedDish(dish)}
                          style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = "#6DD4A0"; e.currentTarget.style.background = "#DAF2E3"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = "#C8CADB"; e.currentTarget.style.background = "#fff"; }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{dish.dish}</div>
                            <div style={{ fontSize: 11, color: "#6E7187" }}>{dish.restaurantName} · {dish.restaurantArea}</div>
                          </div>
                          <div style={{ textAlign: "center", flexShrink: 0 }}>
                            <div style={{ fontSize: 22, fontWeight: 800, color: col, lineHeight: 1 }}>{dish.total}</div>
                            <div style={{ fontSize: 9, color: col, fontWeight: 700, textTransform: "uppercase" }}>mg</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── Oxalates Measured ── */}
            {activeTab === "track" && (() => {
              const total = trackedDishes.reduce((s, d) => s + d.total, 0);
              const pct = Math.min((total / 100) * 100, 100);
              const sc = total < 50 ? "#22c55e" : total < 100 ? "#f59e0b" : "#ef4444";
              const st = total < 50 ? "Excellent" : total < 100 ? "On Track" : "Over Target";
              return (
                <div>
                  <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "18px", marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#6E7187", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Today's Total</div>
                        <div style={{ fontSize: 44, fontWeight: 900, color: sc, lineHeight: 1 }}>{total}<span style={{ fontSize: 15, fontWeight: 600, color: "#6E7187" }}> mg</span></div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 10, color: "#6E7187", marginBottom: 4 }}>Status</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: sc }}>{st}</div>
                        <div style={{ fontSize: 10, color: "#6E7187", marginTop: 2 }}>Target: 50–100mg/day</div>
                      </div>
                    </div>
                    <div style={{ background: "#DAF2E3", borderRadius: 999, height: 8, overflow: "hidden", marginBottom: 6 }}>
                      <div style={{ height: "100%", width: pct + "%", background: `linear-gradient(90deg, #20B55D, ${sc})`, borderRadius: 999, transition: "width 0.4s ease" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 9, color: "#6E7187" }}>0mg</span>
                      <span style={{ fontSize: 9, color: "#f59e0b", fontWeight: 700 }}>50mg</span>
                      <span style={{ fontSize: 9, color: "#ef4444", fontWeight: 700 }}>100mg target</span>
                    </div>
                    {trackedDishes.length > 0 && (
                      <button onClick={clearLog} style={{ marginTop: 12, width: "100%", padding: "8px", background: "none", border: "1px solid #fca5a5", borderRadius: 7, color: "#ef4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Reset Day</button>
                    )}
                  </div>
                  {trackedDishes.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "32px 0", color: "#6E7187" }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#6E7187" }}>Nothing logged yet</div>
                      <div style={{ fontSize: 11, marginTop: 4 }}>Tap "Add to Log" on any dish</div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {trackedDishes.map((entry, i) => {
                        const c = oxColor(entry.total);
                        const rt = trackedDishes.slice(0, i + 1).reduce((s, d) => s + d.total, 0);
                        return (
                          <div key={entry.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, borderLeft: `3px solid ${c}` }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.dish}</div>
                              <div style={{ fontSize: 11, color: "#6E7187", marginTop: 1 }}>{entry.restaurantName} · {entry.time}</div>
                              <div style={{ fontSize: 10, color: "#B0B3C4", marginTop: 1 }}>Running: {rt}mg</div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <div style={{ fontSize: 20, fontWeight: 800, color: c, lineHeight: 1 }}>{entry.total}</div>
                              <div style={{ fontSize: 9, color: c, fontWeight: 700, textTransform: "uppercase" }}>mg</div>
                            </div>
                            <button onClick={() => removeFromLog(entry.id)} style={{ background: "none", border: "none", color: "#B0B3C4", cursor: "pointer", padding: 4, flexShrink: 0, fontSize: 18, lineHeight: 1 }}
                              onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                              onMouseLeave={e => e.currentTarget.style.color = "#B0B3C4"}
                            >×</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </>
      )}

      {/* ── COMMUNITY PAGE ── */}
      {activePage === "community" && <CommunityPage />}

      {/* ── PROFILE PAGE ── */}
      {activePage === "profile" && <ProfilePage />}

      {/* ── BOTTOM NAV ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 500,
        background: "#fff", borderTop: "1px solid #e5e7eb",
        display: "flex", height: 64, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)"
      }}>
        {NAV.map(({ id, label, icon }) => {
          const active = activePage === id;
          return (
            <button key={id} onClick={() => setActivePage(id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 4, border: "none", background: "none",
              cursor: "pointer", position: "relative", transition: "opacity 0.15s"
            }}>
              {active && <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 3, background: "#20B55D", borderRadius: "0 0 4px 4px" }} />}
              {icon(active)}
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "#20B55D" : "#6E7187" }}>{label}</span>
            </button>
          );
        })}
      </div>

      {selectedDish && <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} onAdd={addToLog} />}
    </div>
  );
}
