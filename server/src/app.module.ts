import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ScheduledMessageService } from './scheduled-message/scheduled-message.service';
import { ScheduledMessageController } from './scheduled-message/scheduled-message.controller';

@Module({
  imports: [TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
