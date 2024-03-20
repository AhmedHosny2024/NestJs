import { Injectable,NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>){

    }
    create(email:string, password:string){
        const user = this.repo.create({email, password})
        return this.repo.save(user)
        /**
         * return this.repo.save({email, password})
         * if we use this line of code, we will not be able to use the afterInsert, afterUpdate, afterRemove hooks
         * because we are not creating an instance of the user entity
         * we are just passing the email and password to the save method
         * the save method will not trigger the afterInsert, afterUpdate, afterRemove hooks
         * if we use delete method, the afterRemove hook will not be triggered as well
         * so we use remove method instead of delete method to trigger the afterRemove hook
         */
    }

    findOne(id: number){
        if (!id) {
            return null;
        }
        return this.repo.findOne({ where: { id } });
    }
    find(email:string){
        return this.repo.find({ where: { email } });
    }
    async update(id:number, attrs:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
        /**
         * if we use the update method, the afterUpdate hook will not be triggered
         */
    }
    async remove(id:number){
        const user =await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
        /**
         * if we use the delete method, the afterRemove hook will not be triggered
         */
    }

}
