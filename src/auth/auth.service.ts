// src/auth.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (foundUser) {
      throw new ConflictException('User already exists!');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async login(email, password): Promise<any> {
    const foundUser = await this.userModel.findOne({
      email,
    });
    if (!foundUser) {
      throw new ConflictException("User doesn't exists!");
    }
    const passwordMatched = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatched) {
      throw new ConflictException('Incorrect email or password!');
    } else {
      const payload = {
        username: foundUser.username,
        email: foundUser.email,
        id: foundUser._id,
        status: foundUser.status,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = foundUser.toObject();
      return {
        token: this.jwtService.sign(payload),
        user,
      };
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUserById(userId: string, image: string): Promise<User | any> {
    const updatedUser = await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          image,
        },
      },
    );
    return updatedUser;
  }
}
