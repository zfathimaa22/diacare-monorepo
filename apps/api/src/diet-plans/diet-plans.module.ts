import { Module } from '@nestjs/common';
import { DietPlansService } from './diet-plans.service';
import { DietPlansController } from './diet-plans.controller';
import { ClinicalEngineService } from '../clinical-engine/clinical-engine.service';

@Module({
  controllers: [DietPlansController],
  providers: [DietPlansService, ClinicalEngineService],
  exports: [DietPlansService]
})
export class DietPlansModule {}
