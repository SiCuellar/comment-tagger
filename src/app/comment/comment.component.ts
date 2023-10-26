import { Component, Input } from '@angular/core';
import { Comment } from 'src/shared/models/comment';


@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
}
