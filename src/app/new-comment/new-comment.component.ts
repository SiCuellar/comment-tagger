import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/shared/models/user';
import { Comment } from 'src/shared/models/comment';
import { UserMentionService } from 'src/shared/services/user-mention.service';

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent {
  @Input() users: User[] = [];
  @Output() commentAdded = new EventEmitter<Comment>();

  newComment = new FormControl('');
  showUserSuggestions = false;
  suggestedUsers: User[] = [];
  activeUserIndex = 0;

  constructor(private userMentionService: UserMentionService) {}

  // this is not good practice, update this
  ngOnInit(): void {
    this.newComment.valueChanges.subscribe((value) => {
      this.onCommentInput(value || " ");
    });
  }

  onCommentInput(commentText: string): void {
    const words = commentText.split(/\s+/);
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith('@')) {
      const searchName = lastWord.substring(1);
      this.suggestedUsers = this.userMentionService.getSuggestedUsers(
        this.users,
        searchName
      );
      this.showUserSuggestions = this.suggestedUsers.length > 0;
    } else {
      this.showUserSuggestions = false;
    }
  }

  onUserSuggestionClick(userName: string): void {
    const commentText = this.newComment.value ?? '';
    const words = commentText.split(/\s+/);
    words[words.length - 1] = `@${userName} `;
    this.newComment.setValue(words.join(' '));
    this.showUserSuggestions = false;
  }
  
  addComment(): void {
    const commentText = (this.newComment.value ?? '').trim();
    if (!commentText) return; // Optionally, you can return early if the comment is empty.
  
    const authorUserId = 1;
    const mentions = this.userMentionService.extractMentions(this.users, commentText);
    const newComment = new Comment(commentText, authorUserId, mentions);
  
    this.commentAdded.emit(newComment);
    this.newComment.setValue('');
  
    mentions.forEach((user: User) => {
      alert(`Hey ${user.name} you have been pinged!!`);
    });
  }
  
  onArrowKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      this.activeUserIndex = (this.activeUserIndex + 1) % this.suggestedUsers.length;
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      this.activeUserIndex = (this.activeUserIndex - 1 + this.suggestedUsers.length) % this.suggestedUsers.length;
      event.preventDefault();
    } else if (event.key === 'Enter' && this.showUserSuggestions) {
      this.onUserSuggestionClick(this.suggestedUsers[this.activeUserIndex].name);
      event.preventDefault();
    }
  }
}

