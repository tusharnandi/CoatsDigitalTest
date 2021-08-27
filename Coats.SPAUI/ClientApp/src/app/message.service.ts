import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor() { }

  Add(message: string) {
    this.messages.push(message);
  }
  Clear() {
    this.messages = [];
  }

}
