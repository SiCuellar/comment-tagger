import { Component, Input } from '@angular/core';
import { Comment } from 'src/shared/models/comment';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
}
