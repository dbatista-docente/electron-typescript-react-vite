// scheduled-message.service.ts
import { Injectable } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import * as cron from 'node-cron';


@Injectable()
export class ScheduledMessageService {
    constructor(private readonly telegramService: TelegramService) { }

    async sendScheduledMessage(chatId: number, botToken: string, text: string, images: string[], scheduledTime: string | Date): Promise<void> {
        try {
            scheduledTime = new Date(scheduledTime)
            const day = scheduledTime.getDate(); // Obtém o dia do mês (1-31)
            const month = scheduledTime.getMonth() + 1; // Obtém o mês (0-11), adicionamos 1 para obter o mês de 1 a 12
            const years = scheduledTime.getFullYear(); // Obtém o ano com quatro dígitos (ex: 2023)
            const hour = scheduledTime.getHours(); // Obtém a hora (0-23)
            const minuts = scheduledTime.getMinutes(); // Obtém os minutos (0-59)
            const cronConvert = `${minuts} ${hour} ${day} ${month} *`;
            // Agende o envio da mensagem com base em scheduledTime
            cron.schedule(cronConvert, async () => {
                // Envie a mensagem usando o serviço Telegram
                await this.telegramService.sendMessage(chatId, botToken, text, images);
            });
            console.log(`Mensagem agendada: ${day}/${month}/${years}  ${hour}:${minuts}`)
        } catch (error) {
            console.error('Error sending scheduled message:', error);
        }
    }
}

