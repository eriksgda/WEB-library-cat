import {Component, EventEmitter, Input, Output, signal} from '@angular/core';

@Component({
  selector: 'app-book-input',
  imports: [],
  templateUrl: './book-input.component.html',
  styleUrl: './book-input.component.scss'
})
export class BookInputComponent {
  public title = 'library';

  public bookQuery = signal("");

  @Output() public valueSubmit = new EventEmitter<string>();

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.valueSubmit.emit(this.bookQuery());
    this.bookQuery.set('');
  }
}
