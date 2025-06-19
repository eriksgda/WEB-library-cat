import {Component, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {RawBookModel} from '../../core/models/raw-book.model';
import {BooksService} from '../../core/services/books.service';
import {BookInputComponent} from './components/book-input/book-input.component';
import {SimpleCardComponent} from '../../shared/simple-card/simple-card.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, BookInputComponent, SimpleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private bookService: BooksService) {
  }

  protected MAX_PAGE: number = 20;

  public currentPage = signal(1);
  public books = signal<RawBookModel[]>([]);
  public bookQuery = signal('');

  onValueReceived(value: string): void {
    this.bookQuery.set(value);
    this.currentPage.set(1);
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.searchBooks("title", this.bookQuery(), this.currentPage()).subscribe(
      next => {
        console.log('books:', next.docs);
        this.books.set(next.docs)
      },
      error => console.log(error),
      () => console.log('complete')
    )
  }

  nextPage() {
    if (this.currentPage() <= this.MAX_PAGE) {
      this.currentPage.update(value => value + 1);
      this.loadBooks();
    }
  }

  lastPage() {
    this.currentPage.set(this.MAX_PAGE);
    this.loadBooks();
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(value => value - 1);
      this.loadBooks();
    }
  }

  firstPage() {
    this.currentPage.set(1);
    this.loadBooks();
  }
}
