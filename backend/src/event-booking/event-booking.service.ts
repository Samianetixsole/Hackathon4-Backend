// event-booking.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EventBookingDto } from './dto/create-event-booking.dto';
import { EventBooking } from './schema/event-booking.schema';

@Injectable()
export class EventBookingService {
  constructor(
    @InjectModel('EventBooking')
    private readonly eventBookingModel: Model<EventBooking>,
  ) {}

  async create(eventBookingDto: EventBookingDto): Promise<EventBooking> {
    const createdEventBooking = new this.eventBookingModel(eventBookingDto);
    return createdEventBooking.save();
  }

  async getEventsByUserId(userId: string): Promise<EventBooking[]> {
    return this.eventBookingModel.find({ userId }).exec();
  }

  async getBookingsByUser(userId: string): Promise<EventBooking[]> {
    return this.eventBookingModel.find({ userId }).exec();
  }
  async getAllBookedEvents(): Promise<EventBooking[]> {
    const bookedEvents = await this.eventBookingModel.find().exec();
    return bookedEvents;
  }

  async findByEventAndUser(
    eventId: string,
    userId: string,
  ): Promise<EventBooking | null> {
    return this.eventBookingModel.findOne({ eventId, userId }).exec();
  }

  async update(eventBooking: EventBooking): Promise<EventBooking> {
    return eventBooking.save();
  }
}
