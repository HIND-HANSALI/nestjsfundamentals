import { Injectable,HttpException, HttpStatus,NotFoundException } from '@nestjs/common';
import { User } from './User.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserParams,UpdateUserParams} from './types';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
    constructor(@InjectRepository( User) private  UserRepository:Repository< User>){}

    getUsers(){
        return this.UserRepository.find();
    }
    async createUsers(createUserParams:CreateUserParams){
      const password = createUserParams.password;
      if (!password) {
        throw new Error('Password is missing');
      }
        try {
          const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        
            const user = this.UserRepository.create({ ...createUserParams, password: hashedPassword });
            await this.UserRepository.save(user);
        
            return user;
          } catch (err) {
            console.error(err);
            throw new HttpException('Some Error', HttpStatus.BAD_REQUEST, { cause: new Error(err.message) });
          }
        
    }

    async findOne(name: string){
        return this.UserRepository.findOne({ where: { name } });
      }





     
    async findById(id: number){

    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    
    const user = await this.UserRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    
    return user;
  }
// async findById(id: number){
//     return this.UserRepository.findOne({ where: { id } });
//   }


}
