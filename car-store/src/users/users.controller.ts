import { Body, Controller, Delete, Get, Param, 
        Patch, Post, Query , NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto)  // This is the same as UseInterceptors(new SerializeInterceptor(UserDto)) applied to the entire controller
export class UsersController {
    constructor(private usersService: UsersService) {
    }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        this.usersService.create(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id:string) {
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }
        console
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string) {
        return this.usersService.find(email);
    }
    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto) {
        console.log(body);
        return this.usersService.update(parseInt(id), body);
    }
    @Delete('/:id')
    removeUser(@Param('id') id:string) {
        return this.usersService.remove(parseInt(id));
    }

}
