import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/shared/models/comment';
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
    new Comment('Learn Angular Fast', 3),
    new Comment('You should hightlight the name @Silver if time permits', 5)
  ]

  users: User[] = [
    new User(1, 'Kevin'),
    new User(2, 'Jeff'),
    new User(3, 'Bryan'),
    new User(4, 'Gabbey'),
    new User(5, 'Silver'),
    new User(6, 'Sam')
  ];

  handleCommentAdded(newComment: Comment): void {
    this.comments.push(newComment);
  }

}
