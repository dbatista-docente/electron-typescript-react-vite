// scheduled-message.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ScheduledMessageService } from './scheduled-message.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScheduledMessageDto } from './dto/scheduled-message.dto/scheduled-message.dto';

@Controller('scheduled-messages')
@ApiTags('Scheduled-Messages')
export class ScheduledMessageController {
  constructor(private readonly scheduledMessageService: ScheduledMessageService) {}

  @ApiOperation({ summary: 'Enviar mensagens com imagens para o Telegram' })
  @ApiBody({ type: ScheduledMessageDto })
  @Post('send')
  async sendScheduledMessage(@Body() body: ScheduledMessageDto): Promise<string> {
    try {
      await this.scheduledMessageService.sendScheduledMessage(
        body.chatId,
        body.botToken,
        body.text,
        body.images,
        body.scheduledTime
      );
      return 'Mensagem agendada com sucesso!';
    } catch (error) {
      return 'Erro ao agendar a mensagem.';
    }
  }
}
