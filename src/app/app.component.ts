import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/shared/models/comment';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments : Comment[] =[
    new Comment('Fix the jeep', 1),
    new Comment('Do a good job on this app Silver!', 5),
    new Comment('Learn Angular Fast', 3)
  ]

  newComment = new FormControl;
  showUserSuggestions = false;
  suggestedUsers: any[] = [];
  
  users: User[] = [
    new User(1, 'Kevin'),
    new User(2, 'Jeff'),
    new User(3, 'Bryan'),
    new User(4, 'Gabbey'),
    new User(5, 'Silver')
  ];


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
    const words = this.newComment.value.split(/\s+/);
    words[words.length - 1] = `@${userName} `;
    this.newComment.setValue(words.join(' '));
    this.showUserSuggestions = false;
  }

  addComment(): void {
    const commentText = this.newComment.value.trim()
    // Grab currentUser Id for session here
    const authorUserId = 1; // hardcoding a user id 

    this.comments.push(new Comment(commentText, authorUserId))
    this.newComment.setValue('');
  }
}
