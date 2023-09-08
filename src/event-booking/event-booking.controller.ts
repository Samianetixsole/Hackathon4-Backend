// src/event-booking/event-booking.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { EventBookingService } from './event-booking.service';
import { EventBookingDto } from './dto/create-event-booking.dto';
import { ConfirmAttendanceDto } from './dto/confirm-attending.dto';

@Controller('event-booking')
export class EventBookingController {
  constructor(private readonly eventBookingService: EventBookingService) {}

  @Post('create')
  async bookEvent(@Body() eventBookingDto: EventBookingDto) {
    return this.eventBookingService.create(eventBookingDto);
  }

  @Post()
  create(@Body() eventBookingDto: EventBookingDto) {
    return this.eventBookingService.create(eventBookingDto);
  }

  @Get('user/:userId')
  async getEventsByUserId(
    @Param('userId') userId: string,
  ): Promise<EventBookingDto[]> {
    return this.eventBookingService.getEventsByUserId(userId);
  }

  @Get('all')
  async getAllBookedEvents() {
    const bookedEvents = await this.eventBookingService.getAllBookedEvents();
    return bookedEvents;
  }

  @Patch(':eventId/confirm-attendance')
  async confirmAttendance(
    @Param('eventId') eventId: string,
    @Body() confirmAttendanceDto: ConfirmAttendanceDto,
  ) {
    const { userId, status } = confirmAttendanceDto;

    // Find the event booking document by eventId and userId
    const eventBooking = await this.eventBookingService.findByEventAndUser(
      eventId,
      userId,
    );

    if (!eventBooking) {
      throw new NotFoundException('Event booking not found');
    }

    // Update the status field
    eventBooking.status = status;

    // Save the updated document
    await this.eventBookingService.update(eventBooking);
    return { message: 'Attendance confirmed' };
  }
}
