import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication  (e2e)', () => {
    
    let app: INestApplication;
    beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handels a signup request', () => {
    const email = 'ali1@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: email,
        password: 'ali1',
      })
      .expect(201)
      .then((res)=>{
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'ali@gmail.com'
    const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({email, password: 'ali'})
        .expect(201)
    const cookie = res.get('Set-Cookie'); 
    await request(app.getHttpServer())
        .get('/auth/whoami')
        .set('Cookie', cookie)
        .expect(200)
        .then((res)=>{
            expect(res.body.email).toEqual(email);
        });
    });
});
