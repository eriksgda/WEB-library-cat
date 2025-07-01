import {Component, Input} from '@angular/core';
import {RawBookModel} from '../../core/models/raw-book.model';

@Component({
  selector: 'app-simple-card',
  imports: [],
  templateUrl: './simple-card.component.html',
  styleUrl: './simple-card.component.scss'
})
export class SimpleCardComponent {
  @Input() public rawBook!: RawBookModel;

  public coverLoaded: boolean = false;
  public coverSrc: string = "";

  ngOnInit() {
    this.coverSrc = this.rawBook.cover_i
      ? `https://covers.openlibrary.org/b/id/${this.rawBook.cover_i}-M.jpg`
      : 'assets/placeholder.jpg';
  }

  onLoad() {
    this.coverLoaded = true;
  }

  onError(event: Event) {
    const cover = event.target as HTMLImageElement;
    cover.src = 'assets/placeholder.jpg';
  }
}
