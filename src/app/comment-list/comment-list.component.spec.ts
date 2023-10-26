import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListComponent } from './comment-list.component';
import { Comment } from 'src/shared/models/comment';
import { CommentComponent } from '../comment/comment.component';


describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentListComponent, CommentComponent]
    });
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display multiple comments when they exists', () => {
    const fakeComments: Comment[]= [
      new Comment('work please 1', 1, []),
      new Comment('I beg you', 2, []),
      new Comment('I would love a job', 3, [])
    ]
    
    component.comments = fakeComments;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const commentsList = compiled.querySelectorAll('.comments-list li');
    
    expect(commentsList.length).toBe(3);
    expect(commentsList[2].textContent).toContain('I would love a job');
  });

  it('should show "There are no comments to display" when there are no comments', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('There are no comments to display');
    //use better tagging
  });

  // Add testing for comment count gaurd rails. Current funtionality does not exists. 
});