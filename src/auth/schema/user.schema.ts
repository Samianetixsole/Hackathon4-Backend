// src/user/schema/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  @IsNotEmpty()
  username: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  password: string;

  @Prop()
  image: string;

  @Prop({ required: true, default: 'active' }) // 'active' or 'blocked'
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash the password before saving
UserSchema.pre<User & Document>('save', async function (next) {
  const user = this as User & Document; // Store the value of this
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});
