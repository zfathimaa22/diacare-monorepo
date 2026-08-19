import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientIntakeData } from '@diacare/shared-types';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post(':userId')
  async createProfile(
    @Param('userId') userId: string,
    @Body() data: PatientIntakeData
  ) {
    return this.patientsService.createPatientProfile(userId, data);
  }

  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.patientsService.getPatientByUserId(userId);
  }

  @Post(':patientId/biomarkers')
  async logBiomarker(
    @Param('patientId') patientId: string,
    @Body() body: { glucoseReading: number; readingType: string; notes?: string }
  ) {
    return this.patientsService.logBiomarker(
      patientId,
      body.glucoseReading,
      body.readingType,
      body.notes
    );
  }
}
