import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from '../power/power.module';

// now we can use the PowerService in the DiskService as a dependency by importing the PowerModule
// and adding it to the imports array
// the PowerService is now available to the DiskService
@Module({
  imports: [PowerModule],
  providers: [DiskService],
  exports: [DiskService]
})
export class DiskModule {}
