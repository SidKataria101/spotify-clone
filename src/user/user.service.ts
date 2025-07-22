import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user-dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';

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
        user.apiKey = uuid4();
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

    async findById(id: number) : Promise<User> {
        const user = await this.userRepository.findOneBy({ userId: id });
        if (!user) {
            throw new UnauthorizedException('Invalid User');
        }
        return user;
    }

    async updateTwoFASecret(id: number, secret: string) : Promise<UpdateResult> {
        return await this.userRepository.update(
            { userId: id }, 
            { 
                twoFASecret: secret,
                isTwoFAEnabled: true
            });
    }

    async disable2FA(id: number) : Promise<UpdateResult> {
        return await this.userRepository.update(
            { userId: id }, 
            { 
                twoFASecret: undefined,
                isTwoFAEnabled: false
            });
    }

    async findByApiKey(apiKey: string) : Promise<User> {
        const user = await this.userRepository.findOneBy({ apiKey });
        if (!user) {
            throw new UnauthorizedException('Invalid API key');
        }
        return user;
    }
}
