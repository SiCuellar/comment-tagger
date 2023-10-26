import { Component } from '@angular/core';
import { Comment } from 'src/shared/models/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  comments : Comment[] =[
    new Comment('Fix the jeep', 1),
    new Comment('Do a good job on this app Silver!', 4),
    new Comment('Learn Angular Fast', 3)
  ]
  

}
