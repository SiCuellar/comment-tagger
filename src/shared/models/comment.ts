export class Comment {
  constructor(public commentText : string, public authorUserId: number) {}
}

// Maybe we can add a mentions array to keep track of who has been mentioned in what comment
