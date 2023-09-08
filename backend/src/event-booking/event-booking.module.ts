import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { EventBookingService } from './event-booking.service';
import { EventBookingController } from './event-booking.controller';
import { AuthModule } from 'src/auth/auth.module';
import { EventBooking } from './entities/event-booking.entity';
import { EventBookingSchema } from './schema/event-booking.schema';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: EventBooking.name, schema: EventBookingSchema },
    ]),
    AuthModule,
  ],
  controllers: [EventBookingController],
  providers: [EventBookingService],
})
export class EventBookingModule {}
