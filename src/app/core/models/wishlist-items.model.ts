import {AuthorModel} from './author.model';
import {BookModel} from './book.model';

export interface WishlistItemsModel {
  book: BookModel;
  author: AuthorModel;
  year: number;
}
