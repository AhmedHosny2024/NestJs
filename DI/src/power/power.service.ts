import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    spplyPower(watts: number) {
        console.log(`Supplying ${watts} watts of power`);
    }
}
