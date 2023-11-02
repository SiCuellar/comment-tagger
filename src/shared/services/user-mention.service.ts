import { Injectable } from '@angular/core';
import { User } from 'src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserMentionService {
  private suggestedUsers: User[] = [];
  private activeUserIndex = 0;

  constructor() { }

  detectUserMention(users: User[], commentText: string): void {
    const words = commentText.split(/\s+/);
    const lastWord = words[words.length - 1];
    
    if (lastWord.startsWith('@')) {
      const searchName = lastWord.substring(1).toLowerCase();
      this.suggestedUsers = users.filter(user => user.name.toLowerCase().startsWith(searchName));
      this.activeUserIndex = 0;
    } else {
      this.resetUserMention();
    }
  }
  
  extractMentions(users: User[], text: string): User[] {
    const mentionedUsernames = text
      .split(/\s+/)
      .filter(word => word.startsWith('@'))
      .map(username => username.substring(1).toLowerCase());

    const mentionedUsers = users.filter(user =>
      mentionedUsernames.includes(user.name.toLowerCase())
    );

    return mentionedUsers;
  }

  getSuggestedUsers(): User[] {
    return this.suggestedUsers;
  }

  getActiveUserIndex(): number {
    return this.activeUserIndex;
  }

  navigateUserSuggestions(event: KeyboardEvent): void {
    if (this.suggestedUsers.length === 0) return;

    if (event.key === 'ArrowDown') {
      this.activeUserIndex = (this.activeUserIndex + 1) % this.suggestedUsers.length;
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.activeUserIndex = (this.activeUserIndex - 1 + this.suggestedUsers.length) % this.suggestedUsers.length;
      event.preventDefault();
    }
  }

  shouldShowSuggestions(): boolean {
    return this.suggestedUsers.length > 0;
  }

  resetUserMention(): void {
    this.suggestedUsers = [];
    this.activeUserIndex = 0;
  }
}
