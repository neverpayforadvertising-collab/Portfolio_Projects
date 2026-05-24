import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';

@Injectable()
export class ExperimentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExperimentDto) {
    const exp = await this.prisma.experiment.create({ data: dto });
    return exp;
  }

  async findAll() {
    return this.prisma.experiment.findMany({ include: { variants: true } });
  }

  async findOne(id: string) {
    return this.prisma.experiment.findUnique({ where: { id }, include: { variants: true } });
  }
}
