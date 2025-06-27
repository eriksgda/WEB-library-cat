import {Component, signal, SimpleChanges} from '@angular/core';
import {WishlistItemsModel} from '../../core/models/wishlist-items.model';
import {WishlistService} from '../../infrastructure/storage/wishlist.service';
import {WishlistCardComponent} from './components/wishlist-card/wishlist-card.component';
import {BookModel} from '../../core/models/book.model';
import {AuthorModel} from '../../core/models/author.model';
import {RawBookModel} from '../../core/models/raw-book.model';
import {CardDetailsComponent} from '../../shared/card-details/card-details.component';

@Component({
  selector: 'app-wishlist',
  imports: [
    WishlistCardComponent,
    CardDetailsComponent
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  constructor(private wishlistService: WishlistService) {
  }

  public items = signal<WishlistItemsModel[]>([]);

  private loadItemsFromStorage() {
    this.items.set(this.wishlistService.getAllBooks());
  }

  ngOnInit() {
    this.loadItemsFromStorage();
  }

  removeOnClick(item: WishlistItemsModel) {
    this.wishlistService.removeBookFromWishlist(item);

    this.loadItemsFromStorage();
  }

  public isVisible: boolean = false;
  public item: WishlistItemsModel | null = null;

  closeModal() {
    this.isVisible = false;
    this.item = null;
  }

  onBookClick(item: WishlistItemsModel) {
    this.item = item;
    this.isVisible = true;
  }
}
