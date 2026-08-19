import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DietPlansService } from './diet-plans.service';
import { PatientIntakeData } from '@diacare/shared-types';

@Controller('diet-plans')
export class DietPlansController {
  constructor(private readonly dietPlansService: DietPlansService) {}

  @Post('calculate')
  async calculatePrescription(@Body() intake: PatientIntakeData) {
    return this.dietPlansService.calculateCustomPrescription(intake);
  }

  @Post('generate/:patientId')
  async generateForPatient(@Param('patientId') patientId: string) {
    return this.dietPlansService.generatePlanForPatient(patientId);
  }

  @Get(':id')
  async getPlanById(@Param('id') id: string) {
    return this.dietPlansService.getPlanById(id);
  }
}
