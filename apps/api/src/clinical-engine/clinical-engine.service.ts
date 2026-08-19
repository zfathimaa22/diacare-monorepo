import { Injectable } from '@nestjs/common';
import { 
  PatientIntakeData, 
  NutritionPrescription, 
  DietaryArchetype, 
  DiabetesType,
  DayPlanData,
  MealItem,
  SevenDayDietPlan
} from '@diacare/shared-types';

@Injectable()
export class ClinicalEngineService {
  /**
   * Calculate BMR using Mifflin-St Jeor Equation
   */
  calculateBmr(weightKg: number, heightCm: number, age: number, gender: string): number {
    if (gender === 'MALE') {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
    } else {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
    }
  }

  /**
   * Calculate Total Daily Energy Expenditure (TDEE)
   */
  calculateTdee(bmr: number, activityLevel: string): number {
    const multipliers: Record<string, number> = {
      SEDENTARY: 1.2,
      LIGHT: 1.375,
      MODERATE: 1.55,
      VERY_ACTIVE: 1.725,
      EXTRA_ACTIVE: 1.9,
    };
    const factor = multipliers[activityLevel] || 1.2;
    return Math.round(bmr * factor);
  }

  /**
   * Generate comprehensive clinical diabetic nutrition prescription
   */
  generatePrescription(intake: PatientIntakeData): NutritionPrescription {
    const bmr = this.calculateBmr(intake.weightKg, intake.heightCm, intake.age, intake.gender);
    const tdee = this.calculateTdee(bmr, intake.activityLevel);

    const bmi = intake.weightKg / Math.pow(intake.heightCm / 100, 2);

    // Target Calorie calculation with gentle deficit for overweight Type 2 patients
    let targetCalories = tdee;
    if (intake.diabetesType === 'TYPE_2' && bmi > 25) {
      targetCalories = Math.max(1400, Math.round(tdee - 400));
    } else if (intake.targetWeightKg && intake.targetWeightKg < intake.weightKg) {
      targetCalories = Math.max(1300, Math.round(tdee - 350));
    }

    // Macro ratios customized by archetype
    let carbRatio = 0.40;
    let proteinRatio = 0.25;
    let fatRatio = 0.35;

    if (intake.dietaryArchetype === 'KETO_LOW_CARB') {
      carbRatio = 0.15;
      proteinRatio = 0.30;
      fatRatio = 0.55;
    } else if (intake.dietaryArchetype === 'MEDITERRANEAN') {
      carbRatio = 0.40;
      proteinRatio = 0.25;
      fatRatio = 0.35;
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

    // Protein renal adjustment if eGFR is below 60 mL/min
    let proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
    if (intake.eGfr && intake.eGfr < 60) {
      // Renal preservation target: 0.8g per kg body weight
      proteinGrams = Math.round(intake.weightKg * 0.8);
      proteinRatio = (proteinGrams * 4) / targetCalories;
    }

    const carbsGrams = Math.round((targetCalories * carbRatio) / 4);
    const fatGrams = Math.round((targetCalories * fatRatio) / 9);
    const fiberGrams = Math.max(35, Math.round((targetCalories / 1000) * 16));

    // Meal by meal carbohydrate distribution
    const carbDist = {
      breakfast: Math.round(carbsGrams * 0.22),
      morningSnack: Math.round(carbsGrams * 0.08),
      lunch: Math.round(carbsGrams * 0.32),
      afternoonSnack: Math.round(carbsGrams * 0.10),
      dinner: Math.round(carbsGrams * 0.20),
      bedtimeSnack: Math.round(carbsGrams * 0.08),
    };

    // Clinical Alerts
    const alerts: NutritionPrescription['clinicalAlerts'] = [];

    // Hypoglycemia alert for insulin and sulfonylurea users
    const hasHypoMeds = intake.medications.some(m => 
      m.toLowerCase().includes('insulin') || 
      m.toLowerCase().includes('glimepiride') || 
      m.toLowerCase().includes('glipizide') ||
      m.toLowerCase().includes('glyburide')
    );

    if (hasHypoMeds) {
      alerts.push({
        type: 'WARNING',
        title: 'Hypoglycemia Safety Active',
        description: 'Consistent bedtime snack containing complex carbs and protein included to prevent nocturnal blood sugar dips.'
      });
    }

    // Renal alert
    if (intake.eGfr && intake.eGfr < 60) {
      alerts.push({
        type: 'CRITICAL',
        title: 'Renal Guard Protection',
        description: `Protein capped at 0.8g/kg due to eGFR of ${intake.eGfr} mL/min to reduce glomerular filtration pressure.`
      });
    }

    // Dawn phenomenon reminder
    alerts.push({
      type: 'INFO',
      title: 'Dawn Phenomenon Buffer',
      description: 'Breakfast carbohydrate content calibrated with healthy fats and soluble fiber to prevent early morning cortisol glucose spikes.'
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
}
