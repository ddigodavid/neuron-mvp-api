import { Controller, Sse, MessageEvent, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { map, Observable } from 'rxjs';
import { Message } from './domain/entites/message';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Sse('messages')
  sse(): Observable<MessageEvent> {
    return this.appService
      .observable()
      .pipe(map((data) => ({ data: { ...data, createdAt: new Date() } })));
  }

  @Post('messages')
  post(@Body() message: Message): void {
    this.appService.emit(message);
  }
}
