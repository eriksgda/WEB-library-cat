import {Component, effect, signal, WritableSignal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {RawBookModel} from '../../core/models/raw-book.model';
import {BooksService} from '../../core/services/books.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private bookService: BooksService) {
  }

  protected MAX_PAGE: number = 10;

  title = 'library';
  public currentPage = signal(1);
  public books = signal<RawBookModel[]>([]);
  public bookQuery = signal('');

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

  onSubmit(event: Event) {
    event.preventDefault();
    this.currentPage.set(1);
    this.loadBooks();
  }

  nextPage() {
    if (this.currentPage() <= this.MAX_PAGE) {
      this.currentPage.update(value => value + 1);
      this.loadBooks();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(value => value - 1);
      this.loadBooks();
    }
  }
}
