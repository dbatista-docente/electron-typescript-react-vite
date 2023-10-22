import { Controller, Post, Body } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { SendImagesWithTextDto } from './dto/sendImagesWithTextDto';

@Controller('telegram')
@ApiTags('Telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) { }

  @Post('sendImagesWithText')
  @ApiOperation({ summary: 'Enviar mensagens com imagens para o Telegram' })
  @ApiBody({ type: SendImagesWithTextDto })
  async sendImagesWithText(@Body() body: SendImagesWithTextDto): Promise<string> {
    try {
      await this.telegramService.sendMessage(body.chatId, body.botToken, body.text, body.images);
      return 'Mensagens com imagens enviadas com sucesso para o Telegram!';
    } catch (error) {
      return 'Erro ao enviar as mensagens com imagens para o Telegram.';
    }
  }
}
