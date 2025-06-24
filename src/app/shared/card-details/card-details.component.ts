import {Component, Input} from '@angular/core';
import {BookModel} from '../../core/models/book.model';
import {AuthorModel} from '../../core/models/author.model';

@Component({
  selector: 'app-card-details',
  imports: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {

  @Input() public book!: BookModel;
  @Input() public author!: AuthorModel;
  @Input() public year!: number;

  get parsedDescription(): string {
    if (typeof this.book?.description === 'string') return this.book.description;
    if (typeof this.book?.description === 'object') return this.book.description.value;
    return 'No description available.';
  }

  get parsedBio(): string {
    if (typeof this.author?.bio === "string") return this.author.bio;
    if (typeof this.author?.bio === "object") return this.author.bio.value;
    return 'No bio available.';
  }

  public bookCoverLoaded: boolean = false;
  public bookCoverSrc: string = "";
  public authorCoverLoaded: boolean = false;
  public authorCoverSrc: string = "";

  ngOnInit() {
    this.bookCoverSrc = this.book.covers[0]
      ? `https://covers.openlibrary.org/b/id/${this.book.covers[0]}-L.jpg`
      : 'assets/book-placeholder.jpg';

    this.authorCoverSrc = this.author.photos[0]
      ? `https://covers.openlibrary.org/b/id/${this.author.photos[0]}-L.jpg`
      : 'assets/book-placeholder.jpg';
  }

  onBookLoad() {
    this.bookCoverLoaded = true;
  }

  onAuthorLoad() {
    this.authorCoverLoaded = true;
  }

  onError(event: Event) {
    const cover = event.target as HTMLImageElement;
    cover.src = 'assets/book-placeholder.jpg';
  }
}
