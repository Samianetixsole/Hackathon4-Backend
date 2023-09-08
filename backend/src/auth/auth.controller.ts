// src/auth.controller.ts
import {
  Controller,
  Post,
  Request,
  Get,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.body.email, req.body.password);
  }

  @Get('user/:id')
  async getUserById(@Param('id') userId: string) {
    return this.authService.getUserById(userId);
  }

  @Patch('user/:id')
  async updateUser(@Param('id') userId: string, @Body() image: any) {
    console.log('image:::', image);
    return this.authService.updateUserById(userId, image.imageURL);
  }

  @Get('userByEmail/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }
}
