import { Injectable } from '@angular/core';
import {WishlistItemsModel} from '../../core/models/wishlist-items.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  addBookToWishlist(wishlistItem: WishlistItemsModel) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (!wishlist.includes(wishlistItem)) {
      wishlist.push(wishlistItem);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }

  removeBookFromWishlist(wishlistItem: WishlistItemsModel) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    wishlist = wishlist.filter((value: WishlistItemsModel) => value !== wishlistItem);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  isInWishlist(wishlistItem: WishlistItemsModel) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.includes(wishlistItem);
  }

  getAllBooks(): WishlistItemsModel[] {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  }
}
