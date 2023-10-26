import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/shared/models/user';
import { Comment } from 'src/shared/models/comment';

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})

export class NewCommentComponent {
  @Input() users: User[] = [];
  @Output() commentAdded = new EventEmitter<Comment>();

  newComment = new FormControl;
  showUserSuggestions = false;
  suggestedUsers: any[] = [];

  ngOnInit(): void {
    this.newComment.valueChanges.subscribe(value => {
      this.onCommentInput(value);
    });
  }

  onCommentInput(commentText: string): void {
    const words = commentText.split(/\s+/);
    const lastWord = words[words.length - 1];
    
    if (lastWord.startsWith('@')) {
      const searchName = lastWord.substring(1).toLowerCase();
      this.suggestedUsers = this.users.filter(user => user.name.toLowerCase().startsWith(searchName));
      this.showUserSuggestions = this.suggestedUsers.length > 0;
    } else {
      this.showUserSuggestions = false;
    }
  }

  onUserSuggestionClick(userName: string): void {
    const words = this.newComment.value.split(/\s+/); // Split by spaces including tabs unlike .split(" ") nice!
    words[words.length - 1] = `@${userName} `;
    this.newComment.setValue(words.join(' '));
    this.showUserSuggestions = false;
  }

  addComment(): void {
    const commentText = this.newComment.value.trim();
    // Grab currentUser Id for session here
    const authorUserId = 1; // hardcoding a user id 
    const mentions = this.extractMentions(commentText);
    const newComment = new Comment(commentText, authorUserId, mentions);
  
    this.commentAdded.emit(newComment);
  
    this.newComment.setValue('');
  
    mentions.forEach(user => {
      alert(`Hey ${user.name} you have been pinged!!`);
    });
  }
  
  extractMentions(text: string): User[] {
    const words = text.split(/\s+/); // Split by spaces including tabs unlike .split(" ")
    const mentionedUsers: User[] = [];
  
    words.forEach(word => {
      if (word.startsWith('@')) {
        const username = word.substring(1);
        const user = this.users.find(u => u.name.toLowerCase() === username.toLowerCase());
        if (user) {
          mentionedUsers.push(user);
        }
      }
    });
  
    return mentionedUsers;
  }
}
