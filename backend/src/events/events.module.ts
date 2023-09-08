import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventSchema } from './schema/event.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    AuthModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
