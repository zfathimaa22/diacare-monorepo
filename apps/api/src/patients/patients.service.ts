import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClinicalEngineService } from '../clinical-engine/clinical-engine.service';
import { PatientIntakeData } from '@diacare/shared-types';

@Injectable()
export class PatientsService {
  constructor(
    private prisma: PrismaService,
    private clinicalEngine: ClinicalEngineService
  ) {}

  async createPatientProfile(userId: string, data: PatientIntakeData) {
    const prescription = this.clinicalEngine.generatePrescription(data);

    return this.prisma.patient.create({
      data: {
        userId,
        age: data.age,
        gender: data.gender,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        activityLevel: data.activityLevel,
        diabetesType: data.diabetesType,
        hba1c: data.hba1c,
        fastingBloodSugar: data.fastingBloodSugar,
        postPrandialSugar: data.postPrandialSugar,
        bloodPressureSys: data.bloodPressureSys,
        bloodPressureDia: data.bloodPressureDia,
        eGfr: data.eGfr,
        medications: data.medications,
        allergies: data.allergies,
        dietaryArchetype: data.dietaryArchetype,
        targetCalories: prescription.calories,
        targetCarbsGrams: prescription.carbsGrams,
        targetProteinGrams: prescription.proteinGrams,
        targetFatGrams: prescription.fatGrams,
        targetFiberGrams: prescription.fiberGrams,
      }
    });
  }

  async getPatientByUserId(userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId },
      include: {
        dietPlans: {
          include: {
            days: {
              include: {
                meals: true
              }
            }
          }
        },
        biomarkerLogs: {
          orderBy: { loggedAt: 'desc' },
          take: 20
        }
      }
    });

    if (!patient) {
      throw new NotFoundException('Patient record not found');
    }

    return patient;
  }

  async logBiomarker(patientId: string, glucoseReading: number, readingType: string, notes?: string) {
    return this.prisma.biomarkerLog.create({
      data: {
        patientId,
        glucoseReading,
        readingType,
        notes
      }
    });
  }
}
