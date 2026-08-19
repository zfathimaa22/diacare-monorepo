import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('cuisine') cuisine?: string,
    @Query('maxGi') maxGi?: number,
  ) {
    return this.recipesService.findAll(category, cuisine, maxGi);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipesService.findById(id);
  }
}
