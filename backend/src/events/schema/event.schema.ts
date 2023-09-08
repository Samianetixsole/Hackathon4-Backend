import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

@Schema({ timestamps: true })
export class Event {
  @Prop()
  creatorId: string;

  @Prop()
  creatorUsername: string;

  @Prop()
  creatorEmail: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Prop()
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @Prop()
  @IsNotEmpty()
  @IsString()
  time: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  venue: string;

  @Prop()
  coverImage: string;
}
export const EventSchema = SchemaFactory.createForClass(Event);
