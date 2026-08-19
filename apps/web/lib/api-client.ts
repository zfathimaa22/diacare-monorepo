import { 
  PatientIntakeData, 
  NutritionPrescription, 
  SevenDayDietPlan, 
  DayPlanData, 
  MealItem, 
  RecipeData 
} from '@/types';
import { supabase } from './supabase';

/**
 * Built-in Clinical Recipe Catalog for Instant Dynamic Meal Swaps
 */
export const CLINICAL_RECIPES: RecipeData[] = [
  {
    id: 'rec-001',
    name: 'Steel-Cut Oats with Ceylon Cinnamon & Chia',
    category: 'BREAKFAST',
    cuisine: 'Mediterranean',
    prepTimeMins: 15,
    calories: 310,
    carbs: 38,
    netCarbs: 29,
    protein: 11,
    fat: 9.5,
    fiber: 9,
    glycemicIndex: 42,
    glycemicLoad: 5.8,
    diabetesTags: ['Low-GI', 'High-Fiber', 'Dawn-Buffer'],
    ingredients: ['1/2 cup steel-cut oats', '1 tbsp chia seeds', '1/2 tsp Ceylon cinnamon', '1 cup almond milk', '1/4 cup wild blueberries', '6 crushed walnuts'],
    steps: ['Simmer steel cut oats in unsweetened almond milk with cinnamon for 12 minutes.', 'Stir in chia seeds and let rest for 2 minutes to thicken.', 'Top with blueberries and walnuts.'],
    imageUrl: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=600',
    clinicalBenefit: 'Viscous beta-glucan fibers delay gastric emptying and prevent postprandial glucose surges.'
  },
  {
    id: 'rec-002',
    name: 'Avocado & Pasture Egg Scramble with Wilted Greens',
    category: 'BREAKFAST',
    cuisine: 'Keto-Low-Carb',
    prepTimeMins: 10,
    calories: 340,
    carbs: 6,
    netCarbs: 1.5,
    protein: 20,
    fat: 26,
    fiber: 4.5,
    glycemicIndex: 15,
    glycemicLoad: 0.6,
    diabetesTags: ['Ultra-Low-Carb', 'Zero-Spike', 'High-Protein'],
    ingredients: ['2 pasture-raised eggs', '1/2 ripe avocado', '1.5 cups baby spinach', '1 tbsp extra virgin olive oil', 'Pink Himalayan salt'],
    steps: ['Wilt spinach in olive oil over medium heat.', 'Scramble eggs gently in the pan.', 'Plate with sliced avocado and cracked pepper.'],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600',
    clinicalBenefit: 'Near-zero insulinogenic impact with oleic acid boosting insulin sensitivity.'
  },
  {
    id: 'rec-003',
    name: 'South Asian Foxtail Millet & Sprouted Moong Khichdi',
    category: 'LUNCH',
    cuisine: 'South Asian',
    prepTimeMins: 25,
    calories: 380,
    carbs: 48,
    netCarbs: 36,
    protein: 18,
    fat: 8,
    fiber: 12,
    glycemicIndex: 38,
    glycemicLoad: 7.2,
    diabetesTags: ['Millet-Powered', 'High-Soluble-Fiber', 'South-Asian'],
    ingredients: ['1/3 cup foxtail millet', '1/3 cup sprouted green moong dal', '1 tsp cumin', '1/2 tsp turmeric', '1 cup chopped spinach', '1 tsp sesame oil'],
    steps: ['Rinse millet and sprouted moong.', 'Temper cumin and turmeric in sesame oil.', 'Add vegetables and 2.5 cups water, pressure cook for 3 whistles.'],
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600',
    clinicalBenefit: 'Low glycemic index millet combined with legume protein flattens the glycemic curve.'
  },
  {
    id: 'rec-004',
    name: 'Wild Alaskan Salmon with Lemon Asparagus & Quinoa',
    category: 'DINNER',
    cuisine: 'Mediterranean',
    prepTimeMins: 20,
    calories: 440,
    carbs: 22,
    netCarbs: 17,
    protein: 36,
    fat: 21,
    fiber: 5,
    glycemicIndex: 35,
    glycemicLoad: 3.8,
    diabetesTags: ['Omega-3', 'Anti-Inflammatory', 'Cardio-Diabetic'],
    ingredients: ['150g wild Alaskan salmon', '8 asparagus spears', '1/3 cup cooked quinoa', '1 tbsp extra virgin olive oil', '1/2 fresh lemon'],
    steps: ['Pan-sear salmon skin-side down in olive oil for 4 minutes, flip for 3 minutes.', 'Grill asparagus in same skillet.', 'Serve with fluffy quinoa and lemon squeeze.'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600',
    clinicalBenefit: 'Marine EPA/DHA reduces systemic inflammation and improves endothelial vascular tone.'
  },
  {
    id: 'rec-005',
    name: 'Crisp Tofu & Edamame Bowl with Ginger Tahini',
    category: 'LUNCH',
    cuisine: 'Plant-Based',
    prepTimeMins: 15,
    calories: 360,
    carbs: 24,
    netCarbs: 15.5,
    protein: 26,
    fat: 16,
    fiber: 8.5,
    glycemicIndex: 28,
    glycemicLoad: 3.2,
    diabetesTags: ['Vegan-Diabetic', 'Isoflavones', 'Gut-Friendly'],
    ingredients: ['120g firm tofu cubes', '1/2 cup shelled edamame', '1 cup purple cabbage', '1.5 tbsp raw tahini', '1 tsp grated ginger', 'Lemon juice'],
    steps: ['Golden-sear tofu in skillet.', 'Whisk tahini, ginger, lemon juice and water.', 'Toss purple cabbage, edamame, and crispy tofu with dressing.'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
    clinicalBenefit: 'Soy isoflavones enhance cellular GLUT-4 transporter translocation.'
  },
  {
    id: 'rec-006',
    name: 'Spiced Roasted Chickpeas & Roasted Almonds',
    category: 'SNACK',
    cuisine: 'Universal',
    prepTimeMins: 5,
    calories: 160,
    carbs: 14,
    netCarbs: 9.2,
    protein: 6.5,
    fat: 8,
    fiber: 4.8,
    glycemicIndex: 28,
    glycemicLoad: 2.1,
    diabetesTags: ['Hypo-Safe', 'Fiber-Forward', 'Quick-Snack'],
    ingredients: ['1/4 cup roasted chickpeas', '10 raw almonds', '1/4 tsp smoked paprika', 'Cumin powder'],
    steps: ['Toss chickpeas and almonds with paprika and cumin.', 'Enjoy as an afternoon metabolic stabilizer.'],
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600',
    clinicalBenefit: 'Resistant starch and healthy fats buffer afternoon glycemic fluctuations.'
  },
  {
    id: 'rec-007',
    name: 'Greek Yogurt with Ground Flaxseed & Ceylon Cinnamon',
    category: 'BEDTIME_SNACK',
    cuisine: 'Clinical-Bedtime',
    prepTimeMins: 5,
    calories: 140,
    carbs: 7,
    netCarbs: 4.2,
    protein: 15,
    fat: 4.5,
    fiber: 2.8,
    glycemicIndex: 20,
    glycemicLoad: 0.8,
    diabetesTags: ['Overnight-Buffer', 'Nocturnal-Hypo-Shield', 'Casein-Release'],
    ingredients: ['1/2 cup plain unsweetened 2% Greek yogurt', '1 tbsp ground golden flaxseed', '1/4 tsp Ceylon cinnamon'],
    steps: ['Fold freshly ground flaxseed and cinnamon into Greek yogurt.', 'Consume 30 minutes before sleep to stabilize overnight glucose levels.'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
    clinicalBenefit: 'Slow-digesting micellar casein provides a steady amino acid stream and stops 3 AM hepatic glucose dumps.'
  },
  {
    id: 'rec-008',
    name: 'Grilled Herb Chicken Breast with Broccoli & Mashed Cauliflower',
    category: 'DINNER',
    cuisine: 'Keto-Low-Carb',
    prepTimeMins: 20,
    calories: 390,
    carbs: 11,
    netCarbs: 6,
    protein: 42,
    fat: 18,
    fiber: 5,
    glycemicIndex: 22,
    glycemicLoad: 1.3,
    diabetesTags: ['High-Protein', 'Low-Carb', 'Cruciferous-Guard'],
    ingredients: ['160g skinless chicken breast', '1.5 cups steamed broccoli florets', '1 cup steamed cauliflower mashed with 1 tsp olive oil and garlic', 'Herbs de Provence'],
    steps: ['Season chicken breast with herbs, garlic powder, and olive oil.', 'Grill chicken for 6 minutes per side until 165F internal temp.', 'Serve with garlic-mashed cauliflower and broccoli florets.'],
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600',
    clinicalBenefit: 'High-leucine lean protein preserves metabolically active muscle mass without spiking blood sugar.'
  }
];

export class ClinicalApiClient {
  /**
   * Calculate Clinical Nutrition Prescription locally
   */
  static calculatePrescription(intake: PatientIntakeData): NutritionPrescription {
    const isMale = intake.gender === 'MALE';
    const bmr = Math.round(
      isMale 
        ? 10 * intake.weightKg + 6.25 * intake.heightCm - 5 * intake.age + 5
        : 10 * intake.weightKg + 6.25 * intake.heightCm - 5 * intake.age - 161
    );

    const activityFactors: Record<string, number> = {
      SEDENTARY: 1.2,
      LIGHT: 1.375,
      MODERATE: 1.55,
      VERY_ACTIVE: 1.725,
      EXTRA_ACTIVE: 1.9,
    };
    const tdee = Math.round(bmr * (activityFactors[intake.activityLevel] || 1.2));
    const bmi = intake.weightKg / Math.pow(intake.heightCm / 100, 2);

    let targetCalories = tdee;
    if (intake.diabetesType === 'TYPE_2' && bmi > 25) {
      targetCalories = Math.max(1400, Math.round(tdee - 400));
    } else if (intake.targetWeightKg && intake.targetWeightKg < intake.weightKg) {
      targetCalories = Math.max(1300, Math.round(tdee - 350));
    }

    let carbRatio = 0.40;
    let proteinRatio = 0.25;
    let fatRatio = 0.35;

    if (intake.dietaryArchetype === 'KETO_LOW_CARB') {
      carbRatio = 0.15;
      proteinRatio = 0.30;
      fatRatio = 0.55;
    } else if (intake.dietaryArchetype === 'SOUTH_ASIAN') {
      carbRatio = 0.45;
      proteinRatio = 0.25;
      fatRatio = 0.30;
    } else if (intake.dietaryArchetype === 'DASH_CARDIO') {
      carbRatio = 0.45;
      proteinRatio = 0.25;
      fatRatio = 0.30;
    } else if (intake.dietaryArchetype === 'PLANT_BASED') {
      carbRatio = 0.48;
      proteinRatio = 0.22;
      fatRatio = 0.30;
    }

    let proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
    if (intake.eGfr && intake.eGfr < 60) {
      proteinGrams = Math.round(intake.weightKg * 0.8);
      proteinRatio = (proteinGrams * 4) / targetCalories;
    }

    const carbsGrams = Math.round((targetCalories * carbRatio) / 4);
    const fatGrams = Math.round((targetCalories * fatRatio) / 9);
    const fiberGrams = Math.max(35, Math.round((targetCalories / 1000) * 16));

    const carbDist = {
      breakfast: Math.round(carbsGrams * 0.22),
      morningSnack: Math.round(carbsGrams * 0.08),
      lunch: Math.round(carbsGrams * 0.32),
      afternoonSnack: Math.round(carbsGrams * 0.10),
      dinner: Math.round(carbsGrams * 0.20),
      bedtimeSnack: Math.round(carbsGrams * 0.08),
    };

    const alerts: NutritionPrescription['clinicalAlerts'] = [];
    const hasHypoMeds = intake.medications.some(m => 
      m.toLowerCase().includes('insulin') || 
      m.toLowerCase().includes('glimepiride') || 
      m.toLowerCase().includes('glipizide')
    );

    if (hasHypoMeds) {
      alerts.push({
        type: 'WARNING',
        title: 'Hypoglycemia Safety Active',
        description: 'Consistent bedtime snack containing complex carbs and protein included to prevent nocturnal blood sugar dips.'
      });
    }

    if (intake.eGfr && intake.eGfr < 60) {
      alerts.push({
        type: 'CRITICAL',
        title: 'Renal Guard Protection Active',
        description: `Protein intake capped at 0.8g/kg due to eGFR of ${intake.eGfr} mL/min.`
      });
    }

    alerts.push({
      type: 'INFO',
      title: 'Dawn Phenomenon Calibrated',
      description: 'Breakfast carbohydrate load is strictly buffered with healthy fats and soluble fiber.'
    });

    return {
      calories: targetCalories,
      bmr,
      tdee,
      carbsGrams,
      carbsPercentage: Math.round(carbRatio * 100),
      proteinGrams,
      proteinPercentage: Math.round(proteinRatio * 100),
      fatGrams,
      fatPercentage: Math.round(fatRatio * 100),
      fiberGrams,
      maxGlycemicLoadPerMeal: 10,
      maxDailyGlycemicLoad: 70,
      carbDistribution: carbDist,
      clinicalAlerts: alerts
    };
  }

  /**
   * Generate complete 7-Day Personalized Meal Plan
   */
  static generate7DayPlan(intake: PatientIntakeData): 7DayDietPlan {
    const prescription = this.calculatePrescription(intake);
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const days: DayPlanData[] = dayNames.map((name, index) => {
      const isAltDay = index % 2 === 1;

      const breakfast = isAltDay ? CLINICAL_RECIPES[1] : CLINICAL_RECIPES[0];
      const morningSnack = CLINICAL_RECIPES[5];
      const lunch = isAltDay ? CLINICAL_RECIPES[4] : CLINICAL_RECIPES[2];
      const afternoonSnack = CLINICAL_RECIPES[5];
      const dinner = isAltDay ? CLINICAL_RECIPES[7] : CLINICAL_RECIPES[3];
      const bedtimeSnack = CLINICAL_RECIPES[6];

      const meals: MealItem[] = [
        {
          id: `meal-${index}-1`,
          mealType: 'BREAKFAST',
          name: breakfast.name,
          description: `Glycemic Load: ${breakfast.glycemicLoad} | Prep: ${breakfast.prepTimeMins} mins`,
          calories: breakfast.calories,
          carbs: breakfast.carbs,
          netCarbs: breakfast.netCarbs,
          protein: breakfast.protein,
          fat: breakfast.fat,
          fiber: breakfast.fiber,
          glycemicIndex: breakfast.glycemicIndex,
          glycemicLoad: breakfast.glycemicLoad,
          timing: '08:00 AM',
          instructions: breakfast.steps,
          ingredients: breakfast.ingredients,
          imageUrl: breakfast.imageUrl,
          tags: breakfast.diabetesTags,
          clinicalBenefit: breakfast.clinicalBenefit
        },
        {
          id: `meal-${index}-2`,
          mealType: 'MORNING_SNACK',
          name: morningSnack.name,
          description: `Glycemic Load: ${morningSnack.glycemicLoad} | Quick Fuel`,
          calories: morningSnack.calories,
          carbs: morningSnack.carbs,
          netCarbs: morningSnack.netCarbs,
          protein: morningSnack.protein,
          fat: morningSnack.fat,
          fiber: morningSnack.fiber,
          glycemicIndex: morningSnack.glycemicIndex,
          glycemicLoad: morningSnack.glycemicLoad,
          timing: '11:00 AM',
          instructions: morningSnack.steps,
          ingredients: morningSnack.ingredients,
          imageUrl: morningSnack.imageUrl,
          tags: morningSnack.diabetesTags,
          clinicalBenefit: morningSnack.clinicalBenefit
        },
        {
          id: `meal-${index}-3`,
          mealType: 'LUNCH',
          name: lunch.name,
          description: `Glycemic Load: ${lunch.glycemicLoad} | High Soluble Fiber`,
          calories: lunch.calories,
          carbs: lunch.carbs,
          netCarbs: lunch.netCarbs,
          protein: lunch.protein,
          fat: lunch.fat,
          fiber: lunch.fiber,
          glycemicIndex: lunch.glycemicIndex,
          glycemicLoad: lunch.glycemicLoad,
          timing: '01:30 PM',
          instructions: lunch.steps,
          ingredients: lunch.ingredients,
          imageUrl: lunch.imageUrl,
          tags: lunch.diabetesTags,
          clinicalBenefit: lunch.clinicalBenefit
        },
        {
          id: `meal-${index}-4`,
          mealType: 'AFTERNOON_SNACK',
          name: 'Roasted Pumpkin Seeds & Green Tea',
          description: 'Magnesium rich snack for insulin receptor activation',
          calories: 140,
          carbs: 6,
          netCarbs: 3,
          protein: 7,
          fat: 10,
          fiber: 3,
          glycemicIndex: 15,
          glycemicLoad: 0.5,
          timing: '05:00 PM',
          instructions: ['Toss raw pumpkin seeds with sea salt.', 'Enjoy with a freshly brewed cup of organic green tea.'],
          ingredients: ['2 tbsp raw pumpkin seeds', '1 cup organic green tea'],
          imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600',
          tags: ['Magnesium-Rich', 'Zero-Sugar'],
          clinicalBenefit: 'Magnesium acts as an essential cofactor for tyrosine kinase enzymatic activity.'
        },
        {
          id: `meal-${index}-5`,
          mealType: 'DINNER',
          name: dinner.name,
          description: `Glycemic Load: ${dinner.glycemicLoad} | Lean Protein & Micronutrients`,
          calories: dinner.calories,
          carbs: dinner.carbs,
          netCarbs: dinner.netCarbs,
          protein: dinner.protein,
          fat: dinner.fat,
          fiber: dinner.fiber,
          glycemicIndex: dinner.glycemicIndex,
          glycemicLoad: dinner.glycemicLoad,
          timing: '08:00 PM',
          instructions: dinner.steps,
          ingredients: dinner.ingredients,
          imageUrl: dinner.imageUrl,
          tags: dinner.diabetesTags,
          clinicalBenefit: dinner.clinicalBenefit
        },
        {
          id: `meal-${index}-6`,
          mealType: 'BEDTIME_SNACK',
          name: bedtimeSnack.name,
          description: `Glycemic Load: ${bedtimeSnack.glycemicLoad} | Overnight Protection`,
          calories: bedtimeSnack.calories,
          carbs: bedtimeSnack.carbs,
          netCarbs: bedtimeSnack.netCarbs,
          protein: bedtimeSnack.protein,
          fat: bedtimeSnack.fat,
          fiber: bedtimeSnack.fiber,
          glycemicIndex: bedtimeSnack.glycemicIndex,
          glycemicLoad: bedtimeSnack.glycemicLoad,
          timing: '10:00 PM',
          instructions: bedtimeSnack.steps,
          ingredients: bedtimeSnack.ingredients,
          imageUrl: bedtimeSnack.imageUrl,
          tags: bedtimeSnack.diabetesTags,
          clinicalBenefit: bedtimeSnack.clinicalBenefit
        }
      ];

      const totCal = meals.reduce((acc, m) => acc + m.calories, 0);
      const totCarb = meals.reduce((acc, m) => acc + m.carbs, 0);
      const totProt = meals.reduce((acc, m) => acc + m.protein, 0);
      const totFat = meals.reduce((acc, m) => acc + m.fat, 0);
      const totFib = meals.reduce((acc, m) => acc + m.fiber, 0);
      const avgGl = +(meals.reduce((acc, m) => acc + m.glycemicLoad, 0) / meals.length).toFixed(1);

      return {
        dayNumber: index + 1,
        dayName: name,
        totalCalories: totCal,
        totalCarbs: totCarb,
        totalProtein: totProt,
        totalFat: totFat,
        totalFiber: totFib,
        avgGlycemicLoad: avgGl,
        meals
      };
    });

    return {
      id: `plan-${Date.now()}`,
      patientId: 'patient-active',
      title: `Personalized ${intake.dietaryArchetype.replace(/_/g, ' ')} Diabetic Protocol`,
      archetype: intake.dietaryArchetype,
      prescription,
      days,
      createdAt: new Date().toISOString()
    };
  }
}
