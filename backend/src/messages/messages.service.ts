import { Injectable } from '@nestjs/common';
import { MessagesDto } from 'src/models/messages.models';

@Injectable()
export class MessagesService {
  async getMessages(): Promise<string> {
    // Logique pour récupérer tous les messages en base de données
    return 'Tous les messages';
  }

  async getMessage(id: number): Promise<string> {
    // Logique pour récupérer un message en base de données
    return `Message numéro ${id}`;
  }

  async postMessage(body: MessagesDto): Promise<string> {
    const { userId, userName, title, content } = body;
    // Logique pour post un message en base de données
    return `Ce message a été posté : ${content}`;
  }
}
