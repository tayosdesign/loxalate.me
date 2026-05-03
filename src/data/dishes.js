// ─────────────────────────────────────────────────────────────────────────────
// dishes.js  —  LOxalate data dictionary
// All restaurant + dish data lives here.
// To add a new restaurant: copy any existing block and fill in the fields.
// To add a dish to a restaurant: add a new object to that restaurant's `options` array.
// ─────────────────────────────────────────────────────────────────────────────

export const RESTAURANTS = [
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
    name: "Pie 'n Burger", area: "Pasadena", type: "Restaurant",
    lat: 34.1421, lng: -118.1318, hasLowOxalate: true,
    options: [
      { dish: "Two Eggs & Bacon", modifications: "None needed — one of the best low-oxalate breakfasts anywhere", cookingMethod: "Fried or scrambled eggs, crispy bacon, served with toast", total: 4,
        ingredients: [
          { name: "Eggs", amount: "2 large", oxalate: 0 },
          { name: "Bacon strips", amount: "3 strips", oxalate: 0 },
          { name: "White toast", amount: "1 slice", oxalate: 2 },
          { name: "Butter", amount: "1 tsp", oxalate: 0 },
        ]},
      { dish: "Ham & Cheese Omelet", modifications: "None needed", cookingMethod: "Pan-cooked egg omelet with sliced ham and melted cheese", total: 2,
        ingredients: [
          { name: "Eggs", amount: "3 large", oxalate: 0 },
          { name: "Sliced ham", amount: "2 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "White toast (side)", amount: "1 slice", oxalate: 2 },
        ]},
      { dish: "Bacon or Sausage Omelet", modifications: "None needed", cookingMethod: "Pan-cooked egg omelet with bacon or sausage", total: 2,
        ingredients: [
          { name: "Eggs", amount: "3 large", oxalate: 0 },
          { name: "Bacon or sausage", amount: "2 oz", oxalate: 0 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
          { name: "White toast (side)", amount: "1 slice", oxalate: 2 },
        ]},
      { dish: "Hamburger", modifications: "Classic low-oxalate choice", cookingMethod: "Beef patty on toasted bun with Thousand Island, pickles, lettuce, tomato, cheese", total: 10,
        ingredients: [
          { name: "Beef patty", amount: "4 oz", oxalate: 0 },
          { name: "Toasted white bun", amount: "1 bun", oxalate: 2 },
          { name: "Cheddar cheese", amount: "1 slice", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "1 slice", oxalate: 2 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
          { name: "Thousand Island dressing", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Grilled Chicken Sandwich", modifications: "None needed", cookingMethod: "Grilled chicken breast on toasted bun with lettuce, tomato", total: 9,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Toasted white bun", amount: "1 bun", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
        ]},
      { dish: "Turkey Sandwich", modifications: "None needed — request on white bread", cookingMethod: "Sliced roast turkey on toasted bread", total: 8,
        ingredients: [
          { name: "Sliced roast turkey", amount: "4 oz", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
          { name: "Swiss cheese", amount: "1 slice", oxalate: 0 },
        ]},
      { dish: "B.L.T.", modifications: "None needed", cookingMethod: "Crispy bacon, romaine lettuce, tomato on toasted white bread with mayo", total: 7,
        ingredients: [
          { name: "Bacon strips", amount: "3-4 strips", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1-2 leaves", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Grilled Tuna Sandwich", modifications: "None needed", cookingMethod: "Grilled or tuna salad on toasted white bread", total: 7,
        ingredients: [
          { name: "Tuna", amount: "4 oz", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
        ]},
      { dish: "Ham or Pork Chops Breakfast", modifications: "None needed", cookingMethod: "Pan-seared ham or pork chops, served with eggs and hashbrowns", total: 7,
        ingredients: [
          { name: "Ham or pork chops", amount: "4 oz", oxalate: 0 },
          { name: "Eggs (2)", amount: "2 large", oxalate: 0 },
          { name: "Hashbrowns", amount: "1/2 cup", oxalate: 5 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Breakfast Burrito", modifications: "Request no added salsa or swap for mild", cookingMethod: "Scrambled eggs, choice of meat, cheese, and hashbrowns in flour tortilla", total: 10,
        ingredients: [
          { name: "Scrambled eggs (3)", amount: "3 large", oxalate: 0 },
          { name: "Meat of choice (bacon/sausage/ham)", amount: "2 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
          { name: "Hashbrowns", amount: "1/2 cup", oxalate: 5 },
          { name: "Flour tortilla", amount: "1 large", oxalate: 3 },
        ]},
      { dish: "Quiche", modifications: "Ham, eggs and cheese are all zero oxalate", cookingMethod: "Baked egg custard with ham, cheddar cheese, and green onions in pie crust", total: 9,
        ingredients: [
          { name: "Eggs", amount: "per slice: ~1.5 eggs", oxalate: 0 },
          { name: "Ham (cubed)", amount: "1.5 oz per slice", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 oz per slice", oxalate: 0 },
          { name: "Green onions (sliced)", amount: "1 tbsp", oxalate: 2 },
          { name: "Pie crust (unbaked)", amount: "1 slice portion", oxalate: 3 },
        ]},
    ]
  },
  {
    name: "Granville", area: "Pasadena", type: "Restaurant",
    lat: 34.1411, lng: -118.1321, hasLowOxalate: true,
    options: [
      { dish: "Scottish Salmon", modifications: "One of the best options — broccoli and salmon are both near-zero", cookingMethod: "Broiled in white wine, served with lentil vinaigrette and broccoli", total: 11,
        ingredients: [
          { name: "Broiled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Steamed broccoli", amount: "1/2 cup", oxalate: 2 },
          { name: "Lentil vinaigrette", amount: "2 tbsp", oxalate: 7 },
          { name: "White wine sauce", amount: "2 tbsp", oxalate: 1 },
        ]},
      { dish: "USDA Prime French Dip Au Jus", modifications: "None needed", cookingMethod: "Roasted prime rib thinly sliced on toasted French roll with au jus", total: 10,
        ingredients: [
          { name: "Roasted prime rib", amount: "5 oz", oxalate: 0 },
          { name: "French roll", amount: "1 roll", oxalate: 4 },
          { name: "Au jus", amount: "1/4 cup", oxalate: 0 },
          { name: "Horseradish aioli", amount: "1 tbsp", oxalate: 0 },
          { name: "Romaine (optional)", amount: "1 leaf", oxalate: 2 },
        ]},
      { dish: "Caesar Salad", modifications: "Add chicken or salmon for protein", cookingMethod: "Crisp romaine, shaved Parmesan, housemade croutons and eggless Caesar dressing", total: 10,
        ingredients: [
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Shaved Parmesan", amount: "1 oz", oxalate: 0 },
          { name: "Housemade croutons", amount: "2 tbsp", oxalate: 3 },
          { name: "Caesar dressing (eggless)", amount: "2 tbsp", oxalate: 1 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Garlic Tomato Bisque", modifications: "Good low-oxalate soup — pair with the Caesar", cookingMethod: "House-made bisque with white wine, cream, garlic and fresh basil", total: 9,
        ingredients: [
          { name: "Tomato bisque", amount: "1 cup", oxalate: 6 },
          { name: "White wine & cream", amount: "1/4 cup", oxalate: 1 },
          { name: "Garlic", amount: "2 cloves", oxalate: 0 },
          { name: "Fresh basil", amount: "garnish", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Houston's", area: "Pasadena", type: "Restaurant",
    lat: 34.1365, lng: -118.1578, hasLowOxalate: true,
    options: [
      { dish: "USDA Prime Wood Grilled Rib-Eye", modifications: "Best steak option — beef and French fries are both very low", cookingMethod: "Hardwood-grilled USDA prime rib-eye, seasoned simply, served with French fries", total: 8,
        ingredients: [
          { name: "USDA prime rib-eye steak", amount: "10 oz", oxalate: 0 },
          { name: "Hand-cut French fries", amount: "1 cup", oxalate: 5 },
          { name: "Compound butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
      { dish: "USDA Prime French Dip Au Jus", modifications: "A Houston's classic", cookingMethod: "Roasted prime rib thinly sliced and piled high on a toasted French roll", total: 9,
        ingredients: [
          { name: "Roasted prime rib", amount: "5 oz", oxalate: 0 },
          { name: "French roll", amount: "1 roll", oxalate: 4 },
          { name: "Au jus", amount: "1/4 cup", oxalate: 0 },
          { name: "Coleslaw (side)", amount: "1/4 cup", oxalate: 3 },
        ]},
      { dish: "Cheeseburger", modifications: "None needed", cookingMethod: "Fresh-ground chuck, cheddar, tomato, lettuce and onion on a toasted bun", total: 10,
        ingredients: [
          { name: "Ground chuck patty", amount: "4 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 slice", oxalate: 0 },
          { name: "Toasted bun", amount: "1 bun", oxalate: 3 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "1 slice", oxalate: 2 },
          { name: "Onion", amount: "1 slice", oxalate: 1 },
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
      { dish: "Lemon Chicken Soup", modifications: "None needed", cookingMethod: "Slow-simmered chicken broth with lemon", total: 10,
        ingredients: [
          { name: "Shredded chicken breast", amount: "3 oz", oxalate: 0 },
          { name: "Chicken broth", amount: "2 cups", oxalate: 0 },
          { name: "Vermicelli noodles", amount: "1/4 cup", oxalate: 3 },
          { name: "Lemon juice", amount: "2 tbsp", oxalate: 2 },
          { name: "Fresh parsley", amount: "1 tbsp", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Shiro Restaurant", area: "South Pasadena", type: "Restaurant",
    lat: 34.1135, lng: -118.1578, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon with Vegetables", modifications: "None needed", cookingMethod: "Pan-seared salmon with seasonal vegetables and lemon butter", total: 8,
        ingredients: [
          { name: "Pan-seared salmon", amount: "6 oz", oxalate: 0 },
          { name: "Steamed zucchini", amount: "1/2 cup", oxalate: 3 },
          { name: "Steamed carrots", amount: "1/4 cup", oxalate: 2 },
          { name: "Lemon butter sauce", amount: "2 tbsp", oxalate: 1 },
          { name: "Fresh herbs", amount: "garnish", oxalate: 1 },
        ]},
      { dish: "Roasted Chicken Breast", modifications: "Request steamed vegetables instead of roasted potatoes", cookingMethod: "Herb-roasted chicken breast with seasonal sides", total: 6,
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
      { dish: "Grilled Cheese Sandwich", modifications: "None needed", cookingMethod: "Buttered white bread grilled with melted American cheese", total: 4,
        ingredients: [
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "American cheese", amount: "2 slices", oxalate: 0 },
          { name: "Butter", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "BLT Sandwich", modifications: "None needed", cookingMethod: "Crispy bacon, romaine, tomato on toasted white bread with mayo", total: 6,
        ingredients: [
          { name: "Bacon strips", amount: "3 strips", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Mayonnaise", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Julienne Restaurant", area: "San Marino", type: "Restaurant",
    lat: 34.1214, lng: -118.1072, hasLowOxalate: true,
    options: [
      { dish: "Roasted Turkey Sandwich", modifications: "None needed", cookingMethod: "Oven-roasted turkey breast on fresh bread with lettuce, tomato, Dijon", total: 8,
        ingredients: [
          { name: "Roasted turkey breast", amount: "4 oz", oxalate: 0 },
          { name: "Provolone cheese", amount: "1 slice", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "Sourdough bread", amount: "2 slices", oxalate: 3 },
          { name: "Dijon mustard & mayo", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Grilled Salmon Plate", modifications: "None needed — a signature dish", cookingMethod: "Fresh grilled salmon with lemon caper butter and mixed greens", total: 10,
        ingredients: [
          { name: "Grilled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Lemon caper butter", amount: "2 tbsp", oxalate: 2 },
          { name: "Mixed greens", amount: "1 cup", oxalate: 3 },
          { name: "Cucumber slices", amount: "1/4 cup", oxalate: 1 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Schnell's Bakery & Cafe", area: "San Marino", type: "Cafe",
    lat: 34.1198, lng: -118.1095, hasLowOxalate: true,
    options: [
      { dish: "Ham & Swiss Croissant", modifications: "None needed", cookingMethod: "Sliced ham and Swiss cheese on a toasted butter croissant", total: 4,
        ingredients: [
          { name: "Sliced ham", amount: "2 oz", oxalate: 0 },
          { name: "Swiss cheese", amount: "1 slice", oxalate: 0 },
          { name: "Butter croissant", amount: "1 medium", oxalate: 3 },
          { name: "Dijon mustard", amount: "1 tsp", oxalate: 0 },
        ]},
      { dish: "Egg & Bacon Breakfast Plate", modifications: "None needed", cookingMethod: "Fried eggs and crispy bacon with white toast", total: 4,
        ingredients: [
          { name: "Fried eggs", amount: "2 large", oxalate: 0 },
          { name: "Bacon strips", amount: "2 strips", oxalate: 0 },
          { name: "White toast", amount: "1 slice", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "The Raymond 1886", area: "Pasadena", type: "Restaurant",
    lat: 34.1380, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon", modifications: "None needed — an excellent fine-dining low-oxalate choice", cookingMethod: "Pan-seared salmon with seasonal vegetables and citrus beurre blanc", total: 9,
        ingredients: [
          { name: "Pan-seared salmon", amount: "6 oz", oxalate: 0 },
          { name: "Citrus beurre blanc", amount: "2 tbsp", oxalate: 1 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 3 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Herb Roasted Chicken", modifications: "Request no fingerling potatoes — swap for cauliflower or zucchini", cookingMethod: "Herb-roasted chicken with natural jus and seasonal vegetables", total: 8,
        ingredients: [
          { name: "Herb-roasted chicken breast", amount: "6 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 3 },
          { name: "Natural chicken jus", amount: "2 tbsp", oxalate: 0 },
        ]},
      { dish: "Dry-Aged Prime Beef", modifications: "Request seasonal vegetables in place of any grain sides", cookingMethod: "Dry-aged beef, roasted seasonal vegetables, herb jus", total: 5,
        ingredients: [
          { name: "Dry-aged beef (6 oz)", amount: "6 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 1 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 2 },
          { name: "Herb jus", amount: "2 tbsp", oxalate: 0 },
        ]},
      { dish: "Pan-Roasted Chicken", modifications: "None needed", cookingMethod: "Pan-roasted chicken breast, pan sauce, roasted zucchini", total: 6,
        ingredients: [
          { name: "Pan-roasted chicken breast", amount: "7 oz", oxalate: 0 },
          { name: "Pan sauce (chicken jus)", amount: "2 tbsp", oxalate: 0 },
          { name: "Roasted zucchini", amount: "3/4 cup", oxalate: 3 },
          { name: "Roasted mushrooms", amount: "1/4 cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Lume Restaurant", area: "Hastings Ranch", type: "Restaurant",
    lat: 34.1476, lng: -118.0831, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon Fillet", modifications: "None needed", cookingMethod: "Grilled salmon with lemon herb butter and seasonal vegetables", total: 7,
        ingredients: [
          { name: "Grilled salmon fillet", amount: "6 oz", oxalate: 0 },
          { name: "Steamed asparagus", amount: "6 spears", oxalate: 4 },
          { name: "Lemon herb butter", amount: "1 tbsp", oxalate: 1 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Roasted Half Chicken", modifications: "Ask for cauliflower or zucchini instead of potatoes as side", cookingMethod: "Herb-roasted half chicken with roasted vegetables", total: 9,
        ingredients: [
          { name: "Roasted half chicken", amount: "8 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "1/2 cup", oxalate: 2 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 3 },
          { name: "Pan jus", amount: "2 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Hastings Ranch Grill", area: "Hastings Ranch", type: "Restaurant",
    lat: 34.1455, lng: -118.0798, hasLowOxalate: true,
    options: [
      { dish: "Classic Cheeseburger", modifications: "None needed", cookingMethod: "Grilled beef patty with cheese, lettuce, tomato, pickles on toasted white bun", total: 9,
        ingredients: [
          { name: "Beef patty", amount: "4 oz", oxalate: 0 },
          { name: "Cheddar cheese", amount: "1 slice", oxalate: 0 },
          { name: "White bun", amount: "1 bun", oxalate: 2 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "1 slice", oxalate: 2 },
          { name: "Pickles", amount: "2 slices", oxalate: 1 },
        ]},
      { dish: "Grilled Chicken Sandwich", modifications: "None needed", cookingMethod: "Grilled chicken breast on toasted white bun with lettuce, tomato, mayo", total: 8,
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
      { dish: "Rotisserie Chicken", modifications: "Skip any bean or spinach sides", cookingMethod: "Whole roasted chicken, antibiotic-free, hot from the rotisserie", total: 2,
        ingredients: [
          { name: "Rotisserie chicken breast", amount: "6 oz", oxalate: 0 },
          { name: "Rotisserie seasoning", amount: "to taste", oxalate: 0 },
        ]},
      { dish: "Hot Bar: Roasted Salmon", modifications: "Avoid any miso or sesame-heavy sauces", cookingMethod: "Oven-roasted salmon fillet from the hot bar", total: 4,
        ingredients: [
          { name: "Roasted salmon fillet", amount: "5 oz", oxalate: 0 },
          { name: "Lemon herb glaze", amount: "1 tbsp", oxalate: 1 },
          { name: "Steamed broccoli (hot bar side)", amount: "1/2 cup", oxalate: 2 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
      { dish: "Hot Bar: Roasted Chicken Thighs", modifications: "Avoid any sides with sweet potato or beans", cookingMethod: "Roasted or herb-grilled chicken thighs from the hot bar", total: 3,
        ingredients: [
          { name: "Roasted chicken thigh", amount: "5 oz", oxalate: 0 },
          { name: "Herb seasoning", amount: "to taste", oxalate: 0 },
          { name: "Roasted cauliflower (hot bar side)", amount: "1/2 cup", oxalate: 2 },
        ]},
      { dish: "Deli: Turkey & Provolone Sandwich", modifications: "Request on white or sourdough bread. Hold any spinach — add romaine instead", cookingMethod: "Freshly made deli sandwich with sliced turkey and provolone", total: 9,
        ingredients: [
          { name: "Sliced turkey breast", amount: "4 oz", oxalate: 0 },
          { name: "Provolone cheese", amount: "1 slice", oxalate: 0 },
          { name: "Romaine lettuce", amount: "1 leaf", oxalate: 2 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
          { name: "White or sourdough bread", amount: "2 slices", oxalate: 3 },
        ]},
      { dish: "Hot Bar: Roasted Cauliflower & Zucchini", modifications: "Great low-oxalate vegetable side for any protein plate", cookingMethod: "Oven-roasted cauliflower and zucchini from the hot bar", total: 6,
        ingredients: [
          { name: "Roasted cauliflower", amount: "3/4 cup", oxalate: 3 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 2 },
          { name: "Olive oil & garlic seasoning", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Lovebirds Cafe", area: "Oak Knoll", type: "Cafe",
    lat: 34.1265, lng: -118.1280, hasLowOxalate: true,
    options: [
      { dish: "Avocado & Egg Toast", modifications: "Request on sourdough", cookingMethod: "Toasted bread with smashed avocado, fried egg, sea salt", total: 7,
        ingredients: [
          { name: "Fried egg", amount: "1 large", oxalate: 0 },
          { name: "Avocado", amount: "1/4 avocado", oxalate: 2 },
          { name: "White sourdough", amount: "1 thick slice", oxalate: 3 },
          { name: "Lemon juice", amount: "squeeze", oxalate: 1 },
        ]},
      { dish: "Grilled Chicken Plate", modifications: "None needed", cookingMethod: "Grilled chicken with white rice and simple salad", total: 11,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "1/2 cup", oxalate: 2 },
          { name: "Romaine salad", amount: "1 cup", oxalate: 3 },
          { name: "Tomato", amount: "2 slices", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Star Leaf", area: "Pasadena", type: "Restaurant",
    lat: 34.1461, lng: -118.1368, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon with Bok Choy", modifications: "None needed", cookingMethod: "Pan-seared salmon, steamed bok choy, white rice", total: 9,
        ingredients: [
          { name: "Pan-seared salmon", amount: "6 oz", oxalate: 0 },
          { name: "Steamed bok choy", amount: "1 cup", oxalate: 2 },
          { name: "White jasmine rice", amount: "1 cup", oxalate: 4 },
          { name: "Ginger soy glaze", amount: "1 tbsp", oxalate: 2 },
        ]},
      { dish: "Chicken Lettuce Cups", modifications: "No hoisin — request soy & ginger sauce", cookingMethod: "Minced chicken stir-fry in iceberg lettuce cups", total: 5,
        ingredients: [
          { name: "Minced chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Iceberg lettuce cups", amount: "4 leaves", oxalate: 2 },
          { name: "Water chestnuts", amount: "1/4 cup", oxalate: 0 },
          { name: "Soy sauce", amount: "1 tbsp", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Bone Kettle", area: "Pasadena", type: "Restaurant",
    lat: 34.1483, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Bone Broth Bowl with Egg", modifications: "Request white rice noodles, no bok choy", cookingMethod: "Rich bone broth, rice noodles, soft-boiled egg, scallion", total: 8,
        ingredients: [
          { name: "Bone broth (pork/chicken)", amount: "2 cups", oxalate: 0 },
          { name: "Rice noodles", amount: "1 cup cooked", oxalate: 4 },
          { name: "Soft-boiled egg", amount: "1 large", oxalate: 0 },
          { name: "Scallions", amount: "2 tbsp", oxalate: 1 },
          { name: "Zucchini ribbons", amount: "1/2 cup", oxalate: 2 },
        ]},
      { dish: "Braised Oxtail", modifications: "None needed", cookingMethod: "Slow-braised oxtail with white rice and daikon", total: 5,
        ingredients: [
          { name: "Braised oxtail", amount: "6 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Daikon radish", amount: "1/2 cup", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Manduyo", area: "San Gabriel", type: "Restaurant",
    lat: 34.1069, lng: -118.1024, hasLowOxalate: true,
    options: [
      { dish: "Galbi Korean Rice Box", modifications: "No kimchi — request plain white rice", cookingMethod: "Korean short rib over white rice, egg, cucumber", total: 9,
        ingredients: [
          { name: "Galbi (Korean short rib)", amount: "4 oz", oxalate: 0 },
          { name: "Steamed white rice", amount: "1 cup", oxalate: 4 },
          { name: "Fried egg", amount: "1 large", oxalate: 0 },
          { name: "Cucumber ribbons", amount: "1/4 cup", oxalate: 1 },
          { name: "Scallion", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Soy-Glazed Chicken Dosirak Box", modifications: "Request no pickled radish", cookingMethod: "Soy-glazed chicken thigh rice box with egg and veggies", total: 8,
        ingredients: [
          { name: "Soy-glazed chicken thigh", amount: "4 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Fried egg", amount: "1 large", oxalate: 0 },
          { name: "Soy glaze", amount: "1 tbsp", oxalate: 2 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Eden Garden Bar & Grill", area: "Pasadena", type: "Restaurant",
    lat: 34.1498, lng: -118.1465, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon Plate", modifications: "None needed", cookingMethod: "Grilled salmon fillet with asparagus and white rice", total: 8,
        ingredients: [
          { name: "Grilled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Grilled asparagus", amount: "5 spears", oxalate: 3 },
          { name: "White rice", amount: "3/4 cup", oxalate: 3 },
          { name: "Lemon butter", amount: "1 tbsp", oxalate: 0 },
        ]},
      { dish: "Chicken Caesar Salad", modifications: "Request romaine only — no croutons", cookingMethod: "Grilled chicken over romaine, Caesar dressing, Parmesan", total: 7,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Caesar dressing", amount: "2 tbsp", oxalate: 0 },
          { name: "Parmesan", amount: "1 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Annapurna Grill", area: "Pasadena", type: "Restaurant",
    lat: 34.1463, lng: -118.1201, hasLowOxalate: true,
    options: [
      { dish: "Chicken Tikka (no sauce)", modifications: "Request plain tikka no masala sauce — sauce is high oxalate", cookingMethod: "Tandoor-grilled marinated chicken tikka with white basmati rice", total: 7,
        ingredients: [
          { name: "Chicken tikka pieces", amount: "5 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Cucumber raita", amount: "3 tbsp", oxalate: 1 },
          { name: "Lemon wedge", amount: "1 wedge", oxalate: 1 },
        ]},
      { dish: "Lamb Seekh Kebab", modifications: "Request white basmati rice, skip naan", cookingMethod: "Ground lamb skewer, tandoor-grilled, served with white rice", total: 6,
        ingredients: [
          { name: "Lamb seekh kebab", amount: "5 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Onion rings (raw)", amount: "1/4 cup", oxalate: 1 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Heidar Baba", area: "Pasadena", type: "Restaurant",
    lat: 34.1463, lng: -118.1118, hasLowOxalate: true,
    options: [
      { dish: "Beef Koobideh Plate", modifications: "None needed", cookingMethod: "Ground beef koobideh skewer, basmati rice, grilled tomato", total: 8,
        ingredients: [
          { name: "Beef koobideh skewer", amount: "5 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
        ]},
      { dish: "Chicken Breast Kebab", modifications: "None needed", cookingMethod: "Saffron-marinated chicken breast kebab over white rice", total: 7,
        ingredients: [
          { name: "Chicken breast kebab", amount: "5 oz", oxalate: 0 },
          { name: "Saffron basmati rice", amount: "1 cup", oxalate: 4 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
        ]},
      { dish: "Lamb Sultani Plate", modifications: "None needed", cookingMethod: "Combo of lamb barg and koobideh with white rice", total: 9,
        ingredients: [
          { name: "Lamb barg (tenderloin)", amount: "3 oz", oxalate: 0 },
          { name: "Lamb koobideh", amount: "3 oz", oxalate: 0 },
          { name: "Basmati white rice", amount: "1 cup", oxalate: 4 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
        ]},
    ]
  },
  {
    name: "Abu Kabab", area: "Pasadena", type: "Restaurant",
    lat: 34.1612, lng: -118.1318, hasLowOxalate: true,
    options: [
      { dish: "Mixed Kebab Plate", modifications: "None needed", cookingMethod: "Mixed chicken and beef kebab with white rice and salad", total: 10,
        ingredients: [
          { name: "Chicken kebab", amount: "3 oz", oxalate: 0 },
          { name: "Beef kebab", amount: "3 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Romaine salad", amount: "1/2 cup", oxalate: 3 },
          { name: "Grilled tomato", amount: "1 small", oxalate: 3 },
        ]},
      { dish: "Chicken Shawarma Plate", modifications: "Request white rice, skip fries", cookingMethod: "Marinated rotisserie chicken over white rice with garlic sauce", total: 10,
        ingredients: [
          { name: "Chicken shawarma", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Garlic toum sauce", amount: "1 tbsp", oxalate: 0 },
          { name: "Cucumber-tomato salad", amount: "1/4 cup", oxalate: 3 },
        ]},
    ]
  },
  {
    name: "Deda Restaurant", area: "Pasadena", type: "Restaurant",
    lat: 34.1451, lng: -118.1319, hasLowOxalate: true,
    options: [
      { dish: "Grilled Chicken Skewers", modifications: "None needed", cookingMethod: "Marinated grilled chicken skewers, white rice, tzatziki", total: 8,
        ingredients: [
          { name: "Grilled chicken skewers", amount: "5 oz", oxalate: 0 },
          { name: "White rice", amount: "3/4 cup", oxalate: 3 },
          { name: "Tzatziki (yogurt-cucumber)", amount: "3 tbsp", oxalate: 1 },
          { name: "Grilled onion", amount: "2 tbsp", oxalate: 2 },
          { name: "Lemon juice", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Grilled Salmon with Herb Butter", modifications: "None needed", cookingMethod: "Pan-roasted salmon fillet, herb butter, seasonal veg", total: 6,
        ingredients: [
          { name: "Pan-roasted salmon", amount: "6 oz", oxalate: 0 },
          { name: "Herb butter", amount: "1 tbsp", oxalate: 0 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 2 },
          { name: "Roasted mushrooms", amount: "1/4 cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Magnolia House", area: "Pasadena", type: "Restaurant",
    lat: 34.1401, lng: -118.1318, hasLowOxalate: true,
    options: [
      { dish: "Grilled Salmon with Vegetables", modifications: "None needed", cookingMethod: "Herb-grilled salmon, seasonal roasted vegetables", total: 7,
        ingredients: [
          { name: "Herb-grilled salmon", amount: "6 oz", oxalate: 0 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 2 },
          { name: "Roasted mushrooms", amount: "1/4 cup", oxalate: 1 },
          { name: "Asparagus", amount: "4 spears", oxalate: 2 },
        ]},
      { dish: "Roasted Chicken Plate", modifications: "None needed", cookingMethod: "Free-range roasted chicken, pan jus, cauliflower mash", total: 5,
        ingredients: [
          { name: "Roasted chicken breast", amount: "7 oz", oxalate: 0 },
          { name: "Cauliflower mash", amount: "3/4 cup", oxalate: 2 },
          { name: "Pan jus", amount: "2 tbsp", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Urban Plates", area: "Pasadena", type: "Restaurant",
    lat: 34.1451, lng: -118.1314, hasLowOxalate: true,
    options: [
      { dish: "Rotisserie Chicken Plate", modifications: "Request cauliflower instead of any potato side", cookingMethod: "Rotisserie chicken, roasted cauliflower, cucumber salad", total: 7,
        ingredients: [
          { name: "Rotisserie chicken (white meat)", amount: "5 oz", oxalate: 0 },
          { name: "Roasted cauliflower", amount: "3/4 cup", oxalate: 2 },
          { name: "Cucumber salad", amount: "1/2 cup", oxalate: 1 },
        ]},
      { dish: "Grilled Salmon Bowl", modifications: "Request romaine base, skip any high-oxalate grain", cookingMethod: "Grilled salmon over romaine, avocado, cucumber, lemon", total: 9,
        ingredients: [
          { name: "Grilled salmon", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Avocado", amount: "1/4 medium", oxalate: 2 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Caribbean Gourmet", area: "San Gabriel", type: "Restaurant",
    lat: 34.1067, lng: -118.1025, hasLowOxalate: true,
    options: [
      { dish: "Jerk Chicken with White Rice", modifications: "None needed", cookingMethod: "Jerk-marinated chicken thigh, white rice, fried plantain", total: 10,
        ingredients: [
          { name: "Jerk chicken thigh", amount: "6 oz", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Fried ripe plantain", amount: "3 slices", oxalate: 4 },
          { name: "Lime juice", amount: "1 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Young Dong Tofu House", area: "San Gabriel", type: "Restaurant",
    lat: 34.1072, lng: -118.0891, hasLowOxalate: false,
    options: [
      { dish: "Beef Short Rib Soup (Galbi Tang)", modifications: "Request no tofu, extra broth and rice", cookingMethod: "Clear beef short rib broth with white rice", total: 8,
        ingredients: [
          { name: "Beef short rib", amount: "4 oz", oxalate: 0 },
          { name: "Clear beef broth", amount: "1.5 cups", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Scallion", amount: "1 tbsp", oxalate: 1 },
          { name: "Daikon radish", amount: "1/4 cup", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Ginger Corner Market", area: "Pasadena", type: "Cafe",
    lat: 34.1434, lng: -118.1445, hasLowOxalate: true,
    options: [
      { dish: "Egg & Cheese Sandwich", modifications: "Request white bread, no spinach", cookingMethod: "Fried egg with cheese on white bread", total: 3,
        ingredients: [
          { name: "Fried eggs", amount: "2 large", oxalate: 0 },
          { name: "White bread", amount: "2 slices", oxalate: 2 },
          { name: "Cheddar cheese", amount: "1 oz", oxalate: 0 },
        ]},
      { dish: "Rotisserie Chicken Wrap", modifications: "Request white flour tortilla, no kale", cookingMethod: "Shredded rotisserie chicken with romaine in white tortilla", total: 7,
        ingredients: [
          { name: "Rotisserie chicken", amount: "4 oz", oxalate: 0 },
          { name: "White flour tortilla", amount: "1 large", oxalate: 3 },
          { name: "Romaine lettuce", amount: "1/2 cup", oxalate: 2 },
          { name: "Tomato", amount: "2 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Osa Rooftop", area: "Pasadena", type: "Restaurant",
    lat: 34.1462, lng: -118.1381, hasLowOxalate: true,
    options: [
      { dish: "Grilled Swordfish", modifications: "None needed", cookingMethod: "Grilled swordfish with seasonal roasted vegetables", total: 7,
        ingredients: [
          { name: "Grilled swordfish", amount: "7 oz", oxalate: 0 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 2 },
          { name: "Roasted yellow squash", amount: "1/2 cup", oxalate: 2 },
          { name: "Asparagus", amount: "3 spears", oxalate: 2 },
        ]},
      { dish: "Osa Wagyu Burger", modifications: "Request lettuce wrap instead of bun", cookingMethod: "Wagyu beef patty in iceberg lettuce, tomato, house sauce", total: 5,
        ingredients: [
          { name: "Wagyu beef patty", amount: "6 oz", oxalate: 0 },
          { name: "Iceberg lettuce wrap", amount: "2 leaves", oxalate: 1 },
          { name: "Tomato slices", amount: "2 slices", oxalate: 2 },
          { name: "Cheese", amount: "1 oz", oxalate: 0 },
        ]},
    ]
  },
  {
    name: "Parkway Grill", area: "Pasadena", type: "Restaurant",
    lat: 34.1373, lng: -118.1512, hasLowOxalate: true,
    options: [
      { dish: "Oak-Grilled Filet Mignon", modifications: "Request mashed cauliflower instead of potato", cookingMethod: "Oak-grilled beef tenderloin, roasted cauliflower mash", total: 4,
        ingredients: [
          { name: "Filet mignon", amount: "7 oz", oxalate: 0 },
          { name: "Cauliflower mash", amount: "3/4 cup", oxalate: 2 },
          { name: "Roasted asparagus", amount: "4 spears", oxalate: 2 },
        ]},
      { dish: "Grilled Free-Range Chicken", modifications: "None needed", cookingMethod: "Oak-grilled chicken breast with seasonal vegetables", total: 6,
        ingredients: [
          { name: "Grilled chicken breast", amount: "7 oz", oxalate: 0 },
          { name: "Roasted zucchini", amount: "3/4 cup", oxalate: 3 },
          { name: "Roasted mushrooms", amount: "1/2 cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Marina Restaurant", area: "Pasadena", type: "Restaurant",
    lat: 34.1451, lng: -118.1498, hasLowOxalate: true,
    options: [
      { dish: "Grilled Whole Fish", modifications: "None needed", cookingMethod: "Whole grilled fish with lemon, olive oil, herbs", total: 4,
        ingredients: [
          { name: "Whole grilled sea bass", amount: "7 oz", oxalate: 0 },
          { name: "Lemon juice", amount: "2 tbsp", oxalate: 1 },
          { name: "Fresh herbs (parsley, thyme)", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Shrimp Plate", modifications: "Request white rice instead of pilaf", cookingMethod: "Sautéed shrimp with garlic butter, white rice, vegetable", total: 9,
        ingredients: [
          { name: "Sautéed shrimp", amount: "6 oz", oxalate: 0 },
          { name: "Garlic butter sauce", amount: "1 tbsp", oxalate: 0 },
          { name: "White rice", amount: "1 cup", oxalate: 4 },
          { name: "Roasted zucchini", amount: "1/2 cup", oxalate: 2 },
        ]},
    ]
  },
  {
    name: "Lee's Sandwiches", area: "Pasadena", type: "Cafe",
    lat: 34.1462, lng: -118.1332, hasLowOxalate: true,
    options: [
      { dish: "Bánh Mì with Grilled Chicken", modifications: "Request no pickled daikon — add cucumber and jalapeño only", cookingMethod: "Vietnamese sandwich on French baguette with grilled chicken", total: 10,
        ingredients: [
          { name: "Grilled chicken breast", amount: "3 oz", oxalate: 0 },
          { name: "French baguette roll", amount: "1 roll", oxalate: 5 },
          { name: "Cucumber slices", amount: "1/4 cup", oxalate: 1 },
          { name: "Cilantro", amount: "1 tbsp", oxalate: 1 },
        ]},
      { dish: "Egg & Cheese Bánh Mì", modifications: "No pickled veg, extra cucumber", cookingMethod: "Fried egg and cheese on toasted baguette roll", total: 8,
        ingredients: [
          { name: "Fried eggs", amount: "2 large", oxalate: 0 },
          { name: "Swiss cheese", amount: "1 oz", oxalate: 0 },
          { name: "French baguette roll", amount: "1 roll", oxalate: 5 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "New Delhi Palace", area: "Pasadena", type: "Restaurant",
    lat: 34.1463, lng: -118.1195, hasLowOxalate: true,
    options: [
      { dish: "Chicken Tandoori Plate", modifications: "Request no dal or spinach — stick to chicken + rice", cookingMethod: "Tandoor-roasted chicken, white basmati rice, cucumber raita", total: 8,
        ingredients: [
          { name: "Tandoori chicken pieces", amount: "6 oz", oxalate: 0 },
          { name: "White basmati rice", amount: "1 cup", oxalate: 4 },
          { name: "Cucumber raita", amount: "3 tbsp", oxalate: 1 },
          { name: "Onion slices", amount: "2 tbsp", oxalate: 1 },
        ]},
    ]
  },
  {
    name: "Amara Cafe & Restaurant", area: "Pasadena", type: "Cafe",
    lat: 34.1483, lng: -118.1518, hasLowOxalate: true,
    options: [
      { dish: "Scrambled Eggs with Avocado Toast", modifications: "Request white bread", cookingMethod: "Scrambled eggs, white toast, smashed avocado", total: 9,
        ingredients: [
          { name: "Scrambled eggs", amount: "3 large", oxalate: 0 },
          { name: "White bread toast", amount: "2 slices", oxalate: 2 },
          { name: "Avocado", amount: "1/2 medium", oxalate: 3 },
        ]},
      { dish: "Grilled Chicken Salad", modifications: "Request romaine, no spinach", cookingMethod: "Grilled chicken over romaine with lemon vinaigrette", total: 8,
        ingredients: [
          { name: "Grilled chicken breast", amount: "5 oz", oxalate: 0 },
          { name: "Romaine lettuce", amount: "2 cups", oxalate: 5 },
          { name: "Cucumber", amount: "1/4 cup", oxalate: 1 },
          { name: "Lemon vinaigrette", amount: "2 tbsp", oxalate: 1 },
        ]},
    ]
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper — flat list of every dish across all restaurants (used by SearchDishPanel)
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_DISHES = RESTAURANTS.flatMap(r =>
  r.options.map(opt => ({
    dish:         opt.dish,
    restaurant:   r.name,
    area:         r.area,
    type:         r.type,
    mg:           opt.total,
    modifications: opt.modifications,
    cookingMethod: opt.cookingMethod,
    ingredients:  opt.ingredients,
    lat:          r.lat,
    lng:          r.lng,
  }))
);
