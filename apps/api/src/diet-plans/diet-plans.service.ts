import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClinicalEngineService } from '../clinical-engine/clinical-engine.service';
import { PatientIntakeData } from '@diacare/shared-types';

@Injectable()
export class DietPlansService {
  constructor(
    private prisma: PrismaService,
    private clinicalEngine: ClinicalEngineService
  ) {}

  async generatePlanForPatient(patientId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!patient) {
      throw new NotFoundException('Patient record not found');
    }

    const intake: PatientIntakeData = {
      age: patient.age,
      gender: patient.gender as any,
      heightCm: Number(patient.heightCm),
      weightKg: Number(patient.weightKg),
      activityLevel: patient.activityLevel as any,
      diabetesType: patient.diabetesType as any,
      hba1c: Number(patient.hba1c),
      fastingBloodSugar: patient.fastingBloodSugar ? Number(patient.fastingBloodSugar) : undefined,
      postPrandialSugar: patient.postPrandialSugar ? Number(patient.postPrandialSugar) : undefined,
      bloodPressureSys: patient.bloodPressureSys || undefined,
      bloodPressureDia: patient.bloodPressureDia || undefined,
      eGfr: patient.eGfr ? Number(patient.eGfr) : undefined,
      medications: patient.medications,
      allergies: patient.allergies,
      dietaryArchetype: patient.dietaryArchetype as any,
    };

    const prescription = this.clinicalEngine.generatePrescription(intake);

    const recipes = await this.prisma.recipe.findMany();

    // Create 7-day plan in database
    const dietPlan = await this.prisma.dietPlan.create({
      data: {
        patientId: patient.id,
        title: `Personalized ${patient.dietaryArchetype} Diabetic Plan`,
        description: `Targeting ${prescription.calories} kcal/day with max glycemic load of ${prescription.maxGlycemicLoadPerMeal} per meal.`,
        totalCalories: prescription.calories,
        totalCarbs: prescription.carbsGrams,
        totalProtein: prescription.proteinGrams,
        totalFat: prescription.fatGrams,
        totalFiber: prescription.fiberGrams,
        avgGlycemicLoad: 5.4,
        status: 'ACTIVE'
      }
    });

    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (let day = 1; day <= 7; day++) {
      const dayPlan = await this.prisma.dayPlan.create({
        data: {
          dietPlanId: dietPlan.id,
          dayOfWeek: day,
          dayTitle: dayNames[day - 1]
        }
      });

      // Populate meals for this day
      const breakfastRecipe = recipes.find(r => r.category === 'BREAKFAST') || recipes[0];
      const lunchRecipe = recipes.find(r => r.category === 'LUNCH') || recipes[1];
      const dinnerRecipe = recipes.find(r => r.category === 'DINNER') || recipes[2];
      const snackRecipe = recipes.find(r => r.category === 'SNACK') || recipes[3];
      const bedtimeRecipe = recipes.find(r => r.category === 'BEDTIME_SNACK') || recipes[4];

      const mealEntries = [
        { type: 'BREAKFAST', r: breakfastRecipe, time: '08:00 AM' },
        { type: 'MORNING_SNACK', r: snackRecipe, time: '11:00 AM' },
        { type: 'LUNCH', r: lunchRecipe, time: '01:30 PM' },
        { type: 'AFTERNOON_SNACK', r: snackRecipe, time: '05:00 PM' },
        { type: 'DINNER', r: dinnerRecipe, time: '08:00 PM' },
        { type: 'BEDTIME_SNACK', r: bedtimeRecipe, time: '10:00 PM' }
      ];

      for (const entry of mealEntries) {
        if (entry.r) {
          await this.prisma.meal.create({
            data: {
              dayPlanId: dayPlan.id,
              mealType: entry.type,
              name: entry.r.name,
              description: `Glycemic Load: ${entry.r.glycemicLoad} | Glycemic Index: ${entry.r.glycemicIndex}`,
              calories: entry.r.calories,
              carbs: entry.r.carbs,
              protein: entry.r.protein,
              fat: entry.r.fat,
              fiber: entry.r.fiber,
              glycemicIndex: entry.r.glycemicIndex,
              glycemicLoad: entry.r.glycemicLoad,
              timing: entry.time,
              instructions: entry.r.steps as any,
              ingredients: entry.r.ingredients as any,
              imageUrl: entry.r.imageUrl
            }
          });
        }
      }
    }

    return this.prisma.dietPlan.findUnique({
      where: { id: dietPlan.id },
      include: {
        days: {
          include: {
            meals: true
          }
        }
      }
    });
  }

  async getPlanById(id: string) {
    return this.prisma.dietPlan.findUnique({
      where: { id },
      include: {
        days: {
          include: {
            meals: true
          }
        },
        patient: true
      }
    });
  }

  async calculateCustomPrescription(intake: PatientIntakeData) {
    return this.clinicalEngine.generatePrescription(intake);
  }
}
