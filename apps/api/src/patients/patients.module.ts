import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { ClinicalEngineService } from '../clinical-engine/clinical-engine.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, ClinicalEngineService],
  exports: [PatientsService]
})
export class PatientsModule {}
