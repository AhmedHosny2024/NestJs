import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt =  promisify(_scrypt);

@Injectable()
export class Authservice {
    constructor(private usersService: UsersService) { }

    async signup(email:string, password:string) {
        // See if email is in use
        const users=await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }
        
        // Hash user's password
        // Generate Salt 
        const salt = randomBytes(8).toString("hex"); // 16 char each byte 2 char
        // Hash salt and pass together
        const hash = (await scrypt(password,salt,32)) as Buffer ; // typescript have problem with promisify so i need to spacifiy the return type which is Buffer
        // Join hash result and salt together
        const result= salt + '.' + hash.toString("hex");

        // create a new user and save it
        const user = await this.usersService.create(email,result);
        // return the user
        return user
    }
    async signin(email:string, password:string) {
        const [user]=await this.usersService.find(email);
        if (!user) {
            throw new BadRequestException('email not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password,salt,32)) as Buffer ; // typescript have problem with promisify so i need to spacifiy the return type which is Buffer
        if(storedHash !== hash.toString("hex")){
            throw new BadRequestException('password is not correct');
        }
        return user;
    }
}