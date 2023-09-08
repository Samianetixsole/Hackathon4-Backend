// src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto) {
    console.log('object', createEventDto);
    const newEvent = new this.eventModel({
      creatorId: createEventDto.creatorId,
      creatorUsername: createEventDto.creatorUsername,
      creatorEmail: createEventDto.creatorEmail,
      title: createEventDto.title,
      description: createEventDto.description,
      date: createEventDto.date,
      time: createEventDto.time,
      venue: createEventDto.venue,
      coverImage: createEventDto.coverImage,
    });
    console.log('object', newEvent);
    return newEvent.save();
  }

  async getEvents() {
    return this.eventModel.find().exec();
  }

  async findOne(eventId: string): Promise<Event | null> {
    return this.eventModel.findById({ _id: eventId }).exec();
  }
}
