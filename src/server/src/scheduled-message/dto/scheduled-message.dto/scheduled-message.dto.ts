// scheduled-message/dto/scheduled-message.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ScheduledMessageDto {
  @ApiProperty()
  chatId: number;

  @ApiProperty()
  botToken: string;

  @ApiProperty()
  text: string;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  scheduledTime: Date;
}
