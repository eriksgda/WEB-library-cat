import {Component, EventEmitter, Input, Output, signal, SimpleChanges} from '@angular/core';
import {BookModel} from '../../core/models/book.model';
import {AuthorModel} from '../../core/models/author.model';
import {WishlistService} from '../../infrastructure/storage/wishlist.service';
import {WishlistItemsModel} from '../../core/models/wishlist-items.model';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-card-details',
  imports: [
    TranslatePipe
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {

  constructor(private wishlistService: WishlistService) { }

  public isInWishlist = signal(false);

  ngOnInit() {
    const item: WishlistItemsModel = {
      book: this.book,
      author: this.author,
      year: this.year,
    }
    this.isInWishlist.set(this.wishlistService.isInWishlist(item));
  }

  addBookToWishlist() {
    const item: WishlistItemsModel = {
      book: this.book,
      author: this.author,
      year: this.year,
    }

    this.wishlistService.addBookToWishlist(item);
    this.isInWishlist.set(true);
  }

  removeBookFromWishlist() {
    const item: WishlistItemsModel = {
      book: this.book,
      author: this.author,
      year: this.year,
    }

    this.wishlistService.removeBookFromWishlist(item);
    this.isInWishlist.set(false);
  }

  @Input() public book!: BookModel;
  @Input() public author!: AuthorModel;
  @Input() public year!: number;

  @Output() public close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book']) {
      this.bookCoverLoaded = false;
      this.bookCoverSrc = this.book?.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${this.book.covers[0]}-L.jpg`
        : 'assets/placeholder.jpg';
    }

    if (changes['author']) {
      this.authorCoverLoaded = false;
      this.authorCoverSrc = this.author?.photos?.[0]
        ? `https://covers.openlibrary.org/b/id/${this.author.photos[0]}-L.jpg`
        : 'assets/placeholder.jpg';
    }
  }

  onBookLoad() {
    this.bookCoverLoaded = true;
  }

  onAuthorLoad() {
    this.authorCoverLoaded = true;
  }

  onError(event: Event) {
    const cover = event.target as HTMLImageElement;
    cover.src = 'assets/placeholder.jpg';
  }
}
