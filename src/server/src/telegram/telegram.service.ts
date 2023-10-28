// telegram.service.ts
import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { MediaGroup } from 'telegraf/typings/telegram-types';

@Injectable()
export class TelegramService {

  base64ToImage(base64String: string): Buffer {

    // Remova o cabeçalho "data:image/jpeg;base64," da string Base64
    const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '');

    // Converta a string Base64 em um buffer
    return Buffer.from(base64Data, 'base64');

  }

  async sendImagesWithTextAndImage(chatId: number, botToken: string, text: string, images: string[]): Promise<void> {
    try {
      const bot: Telegraf<Context<Update>> = new Telegraf(botToken);
      const media: MediaGroup = images.map((image) => ({
        type: "photo",
        media: { source: this.base64ToImage(image) },
        caption: ""
      }));

      media[media.length - 1].caption = text

      // Opção para desativar a prévia do link
      const options = { caption: text, disable_web_page_preview: true };

      // Envie as imagens com a legenda como um grupo de mídia
      await bot.telegram.sendMediaGroup(chatId, media);
      console.log('Mensagem com imagem enviada com sucesso')
    } catch (error) {
      console.error('Error sending images with text:', error);
    }
  }

  async sendImagesWithText(chatId: number, botToken: string, text: string): Promise<void> {
    try {
      const bot = new Telegraf(botToken);
      await bot.telegram.sendMessage(chatId, text);
      console.log('Mensagem com texto enviada com sucesso')

    } catch (error) {
      console.error('Error sending images with text:', error);
    }
  }

  async sendMessage(chatId: number, botToken: string, text: string, images: string[]) {
    try {
      images.length > 0 ? this.sendImagesWithTextAndImage(chatId, botToken, text, images) : this.sendImagesWithText(chatId,botToken, text)
    } catch (error) {
      console.log(error)
    }
  }
}
