import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { EventBookingModule } from './event-booking/event-booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), // Load environment variables from .env
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    EventsModule,
    EventBookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
