import { Injectable,HttpException, HttpStatus,NotFoundException } from '@nestjs/common';
import { User } from './User.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository,ILike, FindManyOptions} from 'typeorm';
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
// search(key:string){
//   const keyword = key ? { $or: [{ name: key }
//     , { email: key }] } : {};
//   return this.UserRepository.find(keyword);
// }
async search(key: string) {
  const keyword = key
    ? [
        { name: ILike(`%${key}%`) },
        { email: ILike(`%${key}%`) }
      ]
    : {};

  return await this.UserRepository.find({ where: keyword });
}
Faker(){
  
  // const fakeName = faker.name.findName();
  // const fakeEmail = faker.internet.email();
  // const fakePassword = faker.internet.password();

  // return {
  //   name: fakeName,
  //   email: fakeEmail,
  //   password: fakePassword
  // };
}

}


