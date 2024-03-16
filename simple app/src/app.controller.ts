import { Controller, Get } from '@nestjs/common';

@Controller("/app")
export class AppController {
    @Get('/asdf')
    getRootRoute() {
        return 'Hi hello !';   
    }
    @Get('/bye')
    getByeThere() {
        return 'Bye there !';
    }
}

