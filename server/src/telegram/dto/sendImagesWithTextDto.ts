// send-images-with-text.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsArray, ArrayMinSize, IsUrl } from 'class-validator';

export class SendImagesWithTextDto {
  @ApiProperty({ example: 12345, description: 'ID do chat do Telegram' })
  @IsInt()
  readonly chatId: number;

  @ApiProperty()
  botToken: string;

  @ApiProperty({ example: 'Mensagem de exemplo', description: 'Texto da mensagem' })
  @IsString()
  readonly text: string;

  @ApiProperty({
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: 'Lista de URLs das imagens',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'A lista de imagens deve conter pelo menos uma imagem.' })
  @IsUrl({}, { each: true, message: 'Cada URL de imagem deve ser uma URL válida.' })
  readonly images: string[];
}
