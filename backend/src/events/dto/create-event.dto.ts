// create-event.dto.ts
export class CreateEventDto {
  creatorId: string;
  creatorUsername;
  creatorEmail;
  title: string;
  description: string;
  date: Date;
  time: string;
  venue: string;
  coverImage: string;
}
