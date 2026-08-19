export type DiabetesType = 'TYPE_1' | 'TYPE_2' | 'PRE_DIABETES' | 'GESTATIONAL';

export type DietaryArchetype = 
  | 'MEDITERRANEAN' 
  | 'KETO_LOW_CARB' 
  | 'SOUTH_ASIAN' 
  | 'DASH_CARDIO' 
  | 'PLANT_BASED';

export type ActivityLevel = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'VERY_ACTIVE' | 'EXTRA_ACTIVE';

export type UserRole = 'PATIENT' | 'DIETITIAN' | 'DOCTOR' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface PatientIntakeData {
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  diabetesType: DiabetesType;
  hba1c: number;
  fastingBloodSugar?: number;
  postPrandialSugar?: number;
  bloodPressureSys?: number;
  bloodPressureDia?: number;
  eGfr?: number;
  medications: string[];
  allergies: string[];
  dietaryArchetype: DietaryArchetype;
  targetWeightKg?: number;
}

export interface NutritionPrescription {
  calories: number;
  bmr: number;
  tdee: number;
  carbsGrams: number;
  carbsPercentage: number;
  proteinGrams: number;
  proteinPercentage: number;
  fatGrams: number;
  fatPercentage: number;
  fiberGrams: number;
  maxGlycemicLoadPerMeal: number;
  maxDailyGlycemicLoad: number;
  carbDistribution: {
    breakfast: number;
    morningSnack: number;
    lunch: number;
    afternoonSnack: number;
    dinner: number;
    bedtimeSnack: number;
  };
  clinicalAlerts: {
    type: 'INFO' | 'WARNING' | 'CRITICAL';
    title: string;
    description: string;
  }[];
}

export interface MealItem {
  id: string;
  mealType: 'BREAKFAST' | 'MORNING_SNACK' | 'LUNCH' | 'AFTERNOON_SNACK' | 'DINNER' | 'BEDTIME_SNACK';
  name: string;
  description: string;
  calories: number;
  carbs: number;
  netCarbs: number;
  protein: number;
  fat: number;
  fiber: number;
  glycemicIndex: number;
  glycemicLoad: number;
  timing: string;
  instructions: string[];
  ingredients: string[];
  imageUrl?: string;
  tags: string[];
  clinicalBenefit: string;
}

export interface DayPlanData {
  dayNumber: number;
  dayName: string;
  totalCalories: number;
  totalCarbs: number;
  totalProtein: number;
  totalFat: number;
  totalFiber: number;
  avgGlycemicLoad: number;
  meals: MealItem[];
}

export interface SevenDayDietPlan {
  id: string;
  patientId: string;
  title: string;
  archetype: DietaryArchetype;
  prescription: NutritionPrescription;
  days: DayPlanData[];
  createdAt: string;
}

export interface RecipeData {
  id: string;
  name: string;
  category: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'BEDTIME_SNACK';
  cuisine: string;
  prepTimeMins: number;
  calories: number;
  carbs: number;
  netCarbs: number;
  protein: number;
  fat: number;
  fiber: number;
  glycemicIndex: number;
  glycemicLoad: number;
  diabetesTags: string[];
  ingredients: string[];
  steps: string[];
  imageUrl: string;
  clinicalBenefit: string;
}
