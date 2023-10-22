import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { ScheduledMessageController } from 'src/scheduled-message/scheduled-message.controller';
import { ScheduledMessageService } from 'src/scheduled-message/scheduled-message.service';

@Module({
    controllers: [TelegramController, ScheduledMessageController],
    providers: [TelegramService, ScheduledMessageService]
})
export class TelegramModule { }
