import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) {}
    getData() {
        this.powerService.spplyPower(10);
        console.log('Getting data from disk');
        return "data"
    }
}
