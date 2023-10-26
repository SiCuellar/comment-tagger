import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';
import { Comment } from 'src/shared/models/comment';

fdescribe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentComponent]
    });
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

    component.comment = new Comment('Test comment text', 1, []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show comment text', () => {
    const fakeComment: Comment = { commentText: 'fake test comment', authorUserId: 1, mentions: []};
    component.comment = fakeComment;
  
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.comment').textContent).toContain('fake test comment');
  });
});
