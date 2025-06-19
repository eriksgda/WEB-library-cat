import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-simple-card',
  imports: [],
  templateUrl: './simple-card.component.html',
  styleUrl: './simple-card.component.scss'
})
export class SimpleCardComponent {
  @Input() public title?: string;
  @Input() public author_name?: string;
  @Input() public first_publish_year?: number;
  @Input() public cover_i?: string;

  public coverLoaded: boolean = false;
  public coverSrc: string = "";

  ngOnInit() {
    this.coverSrc = this.cover_i
      ? `https://covers.openlibrary.org/b/id/${this.cover_i}-M.jpg`
      : 'assets/book-placeholder.jpg';
  }

  onLoad() {
    this.coverLoaded = true;
  }

  onError(event: Event) {
    const cover = event.target as HTMLImageElement;
    cover.src = 'assets/book-placeholder.jpg';
  }
}
