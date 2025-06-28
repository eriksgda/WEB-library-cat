import {Component, signal} from '@angular/core';
import {RawBookModel} from '../../core/models/raw-book.model';
import {BooksService} from '../../core/services/books.service';
import {BookInputComponent} from './components/book-input/book-input.component';
import {SimpleCardComponent} from '../../shared/simple-card/simple-card.component';
import {AuthorModel} from '../../core/models/author.model';
import {BookModel} from '../../core/models/book.model';
import {PaginationComponent} from './components/pagination/pagination.component';
import {CardDetailsComponent} from '../../shared/card-details/card-details.component';
import {SearchType} from '../../core/models/search-type.enum';

@Component({
  selector: 'app-home',
  imports: [BookInputComponent, SimpleCardComponent, PaginationComponent, CardDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private bookService: BooksService) {
  }

  public currentPage = signal(1);
  public books = signal<RawBookModel[]>([]);
  public bookQuery = signal('');
  public searchType = signal<SearchType>(SearchType.Title);

  onValueReceived(value: {query: string, type: SearchType}): void {
    this.bookQuery.set(value.query);
    this.searchType.set(value.type);
    this.currentPage.set(1);
    this.loadBooks();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);

    this.loadBooks();
  }

  loadBooks() {
    this.bookService.searchBooks(this.searchType(), this.bookQuery(), this.currentPage()).subscribe(
      next => {
        console.log('books:', next.docs);
        this.books.set(next.docs)
      },
      error => console.log(error),
      () => console.log('complete')
    )
  }

  public isVisible: boolean = false;
  public bookDetails: BookModel | null = null;
  public authorDetails: AuthorModel | null = null;
  public year: number = -1;

  onBookClick(book: RawBookModel) {

    this.bookService.getBookDetails(book.key).subscribe(
      next => {
        this.bookDetails = next;
      }
    );

    this.bookService.getAuthorDetails(book.author_key[0]).subscribe(
      next => {
        this.authorDetails = next;
      }
    );

    this.year = book.first_publish_year ?? -1;

    setTimeout(() => {
      this.isVisible = true;
    }, 50);
  }

  closeModal() {
    this.isVisible = false;
    this.bookDetails = null;
    this.authorDetails = null;
    this.year = -1;
  }

}
