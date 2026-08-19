import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string, cuisine?: string, maxGi?: number) {
    const where: any = {};
    if (category) where.category = category;
    if (cuisine) where.cuisine = cuisine;
    if (maxGi) where.glycemicIndex = { lte: Number(maxGi) };

    return this.prisma.recipe.findMany({
      where,
      orderBy: { glycemicLoad: 'asc' }
    });
  }

  async findById(id: string) {
    return this.prisma.recipe.findUnique({
      where: { id }
    });
  }

  async findByTag(tag: string) {
    return this.prisma.recipe.findMany({
      where: {
        diabetesTags: {
          has: tag
        }
      }
    });
  }
}
