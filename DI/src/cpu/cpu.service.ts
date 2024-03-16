import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
    constructor(private powerService: PowerService) {}
    compute(a: number, b: number) {
        console.log('Computing...');
        this.powerService.spplyPower(100);
        return a + b;
    }
}
