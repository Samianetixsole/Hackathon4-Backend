// src/event-booking/schema/event-booking.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EventBooking extends Document {
  @Prop()
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Prop()
  userEmail: string;

  @Prop()
  eventTitle: string;

  @Prop()
  eventVenue: string;

  @Prop()
  eventDate: string;

  @Prop()
  eventTime: string;

  @Prop()
  status: string;
}
export const EventBookingSchema = SchemaFactory.createForClass(EventBooking);
