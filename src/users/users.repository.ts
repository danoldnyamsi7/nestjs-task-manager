import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";



@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private $repository: Repository<User>) { }

    async getUser(id: string): Promise<User> {
        try {
            const user = await this.$repository.findOneBy({ id });
            return user;
        } catch (error) {
            return null;
        }

    }

    async getAllUsers(): Promise<User[]> {
        const users = this.$repository.find({});
        return users;
    }

    async getUserByAny(name?: string, email?:string ): Promise<User> {
        
        try {
            const user = await this.$repository.findOneBy({name, email});
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            return error;
        }

    }

    async createUser(createUserDto: CreateUserDto, name?: string): Promise<User> {
        const { password, email } = createUserDto;
        try {
            let user = this.$repository.create({ name, email, password });
            let userExist = await this.$repository.findOneBy({ email });
            if (userExist) {
                console.log('user already exist');
            } else {
                const salt = await bcrypt.genSalt();
                let hashed_pwd = await bcrypt.hash(user.password, salt);
                user.password = hashed_pwd;
                let newUser = this.$repository.save(user);
                return newUser;
            }
        } catch (error) {
            return error;
        }

    }

    async updateUser(id: string, updateUserDto?: UpdateUserDto): Promise<User> {

        const { name, email } = updateUserDto;
        try {
            let user = await this.$repository.findOneBy({ id });

            if (user) {
                await this.$repository.update({ id: user.id }, { name, email })

                for (const [key, val] of Object.entries(updateUserDto)) user[key] = val;

                return user;
            }
        } catch (error) {
            return error;
        }



    }

    async deleteUser(id: string): Promise<void> {
        const isUser = await this.getUser(id);
        if (isUser) {
            await this.$repository.delete(id);
            return;
        }
    }

    
}