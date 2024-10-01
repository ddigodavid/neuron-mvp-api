import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Message } from './domain/entites/message';

@Injectable()
export class AppService {
  emitter = new Subject<Message>();

  observable() {
    return this.emitter;
  }

  emit(message: Message) {
    this.emitter.next(message);
  }
}
