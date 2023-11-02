import { Component, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/models/user';
import { Comment } from 'src/shared/models/comment';
import { UserMentionService } from 'src/shared/services/user-mention.service';

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent implements OnDestroy {
  @Input() users: User[] = [];
  @Output() commentAdded = new EventEmitter<Comment>();

  newComment = new FormControl('');
  showUserSuggestions = false;
  activeUserIndex = 0;
  subscription: Subscription;
  suggestedUsers: User[] = [];

  constructor(private userMentionService: UserMentionService) {
    this.subscription = this.newComment.valueChanges.subscribe((value) => {
      this.onCommentInput(value || " ");
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCommentInput(commentText: string): void {
    this.userMentionService.detectUserMention(this.users, commentText);
    this.suggestedUsers = this.userMentionService.getSuggestedUsers();
    this.showUserSuggestions = this.userMentionService.shouldShowSuggestions();
    this.activeUserIndex = this.userMentionService.getActiveUserIndex();
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
    if (!commentText) return;
  
    const authorUserId = 1; // Assuming a static user id for now
    const mentions = this.userMentionService.extractMentions(this.users, commentText);
    const newComment = new Comment(commentText, authorUserId, mentions);
  
    this.commentAdded.emit(newComment);
    this.newComment.setValue('');
  
    mentions.forEach((user: User) => {
      alert(`Hey ${user.name} you have been pinged!!`);
    });
  }
  
  onArrowKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      this.userMentionService.navigateUserSuggestions(event);
      this.activeUserIndex = this.userMentionService.getActiveUserIndex();
    } else if (event.key === 'Enter' && this.showUserSuggestions) {
      this.onUserSuggestionClick(this.suggestedUsers[this.activeUserIndex].name);
      event.preventDefault();
    }
  }
}
