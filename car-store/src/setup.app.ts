import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

export const SetupApp  = (app:any) => {
    app.use(cookieSession({
        keys: ['asdfasa'],
      }))
    
      app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // security to filter out unwanted fields from the request
      }));
    }

