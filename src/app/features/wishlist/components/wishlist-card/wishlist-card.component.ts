import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WishlistItemsModel} from '../../../../core/models/wishlist-items.model';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-wishlist-card',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './wishlist-card.component.html',
  styleUrl: './wishlist-card.component.scss'
})
export class WishlistCardComponent {
  @Output() public remove = new EventEmitter<WishlistItemsModel>();

  @Input() public item!: WishlistItemsModel;

  public bookCoverLoaded: boolean = false;
  public bookCoverSrc: string = "";

  ngOnInit() {
    this.bookCoverSrc = this.item.book.covers[0]
      ? `https://covers.openlibrary.org/b/id/${this.item.book.covers[0]}-M.jpg`
      : 'assets/placeholder.jpg';
  }

  onBookLoad() {
    this.bookCoverLoaded = true;
  }

  onError(event: Event) {
    const cover = event.target as HTMLImageElement;
    cover.src = 'assets/placeholder.jpg';
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.remove.emit(this.item);
  }
}
