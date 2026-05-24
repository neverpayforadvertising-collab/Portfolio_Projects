import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly service: ExperimentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateExperimentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
