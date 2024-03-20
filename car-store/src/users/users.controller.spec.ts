import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Authservice } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let  fakeUsersService : Partial<UsersService>;
  let  fakeAuthService : Partial<Authservice>;

  beforeEach(async () => {
    fakeUsersService ={
      findOne:(id:number)=>{
        return Promise.resolve({id,email:'a',password:'1'} as User)
      },
      find:(email:string)=>{
        return Promise.resolve([{id:1,email}] as User[])
      }
    }
    fakeAuthService ={
      signup:()=>{
        return Promise.resolve({id:1,email:'a'} as User)
      },
      signin:(email:string,password:string)=>{
        return Promise.resolve({id:1,email} as User)
      },
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {provide: UsersService, useValue: fakeUsersService},
        {provide: Authservice, useValue: fakeAuthService},
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('finds a user by id', async ()=>{
    const user = await controller.findUser('1');
    expect(user.id).toEqual(1);
  });
  it('finds a user by email', async ()=>{
    const users = await controller.findAllUsers('a');
    expect(users.length).toEqual(1);
  });
  it ("find all users", async ()=>{
    const users = await controller.findAllUsers('a');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('a');
  });
  it("find user throws error if user not found", async ()=>{
    fakeUsersService.findOne = (id:number)=>{
      return Promise.resolve(null);
    }
    try {
      await controller.findUser('1');
    } catch (error) {
      expect(error.message).toEqual('user not found');
    }
  });

  it('signin updates session object and returns user', async ()=>{
    const session = {userId: -10};
    const user = await controller.signin({email:'a',password:'1'},session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

});
