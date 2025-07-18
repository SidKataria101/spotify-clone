import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto) : Promise<User> {
        const salt = await bcrypt.genSalt();
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.email = createUserDto.email;
        user.password = await bcrypt.hash(createUserDto.password, salt);
        const savedUser = await this.userRepository.save(user);
        // Remove password before returning the user object
        const { password, ...userWithoutPassword } = savedUser;
        console.log('New user created : ', userWithoutPassword);
        return userWithoutPassword as User;
    }

    async findByEmail(email: string) : Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid Email');
        }
        return user;
    }
}
