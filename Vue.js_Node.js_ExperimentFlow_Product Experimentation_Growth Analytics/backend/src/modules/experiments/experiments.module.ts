import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsController } from './experiments.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ExperimentsController],
  providers: [ExperimentsService, PrismaService],
  exports: [ExperimentsService],
})
export class ExperimentsModule {}
