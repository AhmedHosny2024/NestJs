import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from '../power/power.module';

@Module({
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService], // make this class available to other modules
})
export class CpuModule {}
