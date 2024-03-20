import { Test } from "@nestjs/testing";
import { Authservice } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt =  promisify(_scrypt);
describe("Authservice", () => {
    let service: Authservice;
    let fakeUsersService: Partial<UsersService>;
    beforeEach(async() => {
        const users: User[] =[]
        // craete a fake copy of users service
        fakeUsersService = {
            find: (email:string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random()*99999), email, password } as User;
                users.push(user);
                return Promise.resolve(user);
            },
        };
        const module = await Test.createTestingModule({
            providers: [Authservice,{
                provide: UsersService,
                useValue: fakeUsersService,
            }],
        }).compile();
        service = module.get(Authservice);
    });

    it("can create an instance of auth service", async () => {
        
        expect(service).toBeDefined();
    });

    it("creates a new user with a salted and hashed password", async () => {
        const user = await service.signup("ali@ali.com", "password");
        expect(user.password).not.toEqual("password");
        const [salt, hash] = user.password.split(".");
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it ("throws an error if user signs up with email that is in use", async () => {
        await service.signup("a", "password");
        await expect(service.signup("a", "password")).rejects.toThrow();
    });

    it("throws error if signin is called with an unused email", async () => {
        await expect(service.signin("ali@gmail.com", "password")).rejects.toThrow();
    }
    );

    it("throws if an invalid password is provided", async () => {
        await service.signup("a", "password");
        await expect(service.signin("a", "password1")).rejects.toThrow();
    });

    it("returns a user if correct password is provided", async () => {
        await service.signup("a", "password");
        const user = await service.signin("a", "password");
        expect(user).toBeDefined();
    });


});