export const FOOD_DATABASE = {
  'Chicken Breast 100g': { protein: 31, carbs: 0, fats: 3.6 },
  'Whole Eggs 1 egg': { protein: 6, carbs: 0.6, fats: 5 },
  'White Rice 100g cooked': { protein: 2.7, carbs: 28, fats: 0.3 },
  'Oats 50g dry': { protein: 8.5, carbs: 30, fats: 5 },
  'Banana 1 medium': { protein: 1.3, carbs: 27, fats: 0.3 },
  'Whey Protein 1 scoop': { protein: 25, carbs: 3, fats: 2 },
  'Peanut Butter 2 tbsp': { protein: 8, carbs: 6, fats: 16 },
  'Milk 250ml': { protein: 8, carbs: 12, fats: 8 },
  'Greek Yogurt 150g': { protein: 15, carbs: 6, fats: 0.7 },
  'Sweet Potato 100g': { protein: 1.6, carbs: 20, fats: 0.1 },
  'Dal 100g cooked': { protein: 9, carbs: 20, fats: 0.4 },
  'Paneer 100g': { protein: 18, carbs: 1.2, fats: 20 },
  'Roti 1 piece': { protein: 3, carbs: 15, fats: 0.4 },
  'Almonds 30g': { protein: 6, carbs: 6, fats: 14 },
}

export const MACRO_TARGETS = {
  protein: 125,
  carbs: 240,
  fats: 70,
}

export function calcCalories({ protein, carbs, fats }) {
  return protein * 4 + carbs * 4 + fats * 9
}
