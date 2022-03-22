export class Location {
  //id: number;

  state;

  town;

  comment;

  map;

  author;

  photos;

  constructor(
    state = '',
    town = '',
    comment = '',
    map = '',
    author = '',
    photos = ''
  ) {
    //this.id = parseInt(Math.random() * 1_000_000_000, 10);
    this.state = state;
    this.town = town;
    this.comment = comment;
    this.map = map;
    this.author = author;
    this.photos = photos;
  }
}
