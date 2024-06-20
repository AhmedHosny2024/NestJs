import { MiddlewareConsumer, Module,ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
// import { User } from './users/user.entity';
// import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { config } from 'process';
const ormconfig = require('../ormconfig');
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(ormconfig),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'sqlite',
    //     database: config.get<string>('DB_NAME'),
    //     entities: [User, Report],
    //     // synchronize: true, // only for development mode to create tables automatically
    //     synchronize:false
    //   }),
    // }),
  //   TypeOrmModule.forRoot({
  //     type:'sqlite',
  //     database: ,
  //     entities: [User, Report],
  //     synchronize: true,
  // }), 
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true, // security to filter out unwanted fields from the request
    })
  }],
})

export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configService.get<string>('COOKIE_KEY')],
    }))
    .forRoutes('*');
  }
}
