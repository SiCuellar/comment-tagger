import { User } from './user'

export class Comment {
  constructor(
    public commentText: string, 
    public authorUserId: number, 
    public mentions: User[] = []
  ) {}
}

// Maybe we can add a mentions array to keep track of who has been mentioned in what comment
