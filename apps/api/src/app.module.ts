import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { DietPlansModule } from './diet-plans/diet-plans.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PatientsModule,
    DietPlansModule,
    RecipesModule,
  ],
})
export class AppModule {}
