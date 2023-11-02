import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommentComponent } from './new-comment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from 'src/shared/models/user';


describe('NewCommentComponent', () => {
  let component: NewCommentComponent;
  let fixture: ComponentFixture<NewCommentComponent>;

  const fakeUsers: User[] = [ 
    { userId: 1, name: 'Kaladin' },
    { userId: 2, name: 'Miss Angular' },
    { userId: 3, name: 'Silver' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [NewCommentComponent]
    });
    fixture = TestBed.createComponent(NewCommentComponent);
    component = fixture.componentInstance;
    component.users = fakeUsers;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form control', () => {
    expect(component.newComment).toBeDefined();
  });

  it('should emit commentAdded event with correct comment data when addComment is called', () => {
    spyOn(component.commentAdded, 'emit');

    component.newComment.setValue('@Kaladin where is your shard blade?');
    component.addComment();

    expect(component.commentAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      commentText: '@Kaladin where is your shard blade?',
      authorUserId: 1,
      mentions: [jasmine.objectContaining({ name: 'Kaladin' })]
    }));
  });

  it('should show user suggestions when "@" is typed', () => {
    component.newComment.setValue('@Ka');
    fixture.detectChanges();
    expect(component.suggestedUsers.length).toBe(1);
    expect(component.suggestedUsers[0].name).toBe('Kaladin');
    expect(component.showUserSuggestions).toBeTrue();
  });

  it('should trigger an alert when a comment is added with a mention', () => {
    const alertSpy = spyOn(window, 'alert');
    component.newComment.setValue('@Kaladin you are stormblessed!');
    component.addComment();
    expect(alertSpy).toHaveBeenCalledWith('Hey Kaladin you have been pinged!!');
  });
  
  // Add testing for keyboard arrow clicks
});
