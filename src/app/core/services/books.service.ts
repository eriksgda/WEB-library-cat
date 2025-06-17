import { Injectable } from '@angular/core';
import {BookApiService} from '../../infrastructure/api/book.api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private bookApiService: BookApiService) { }

  searchBooks(type: string, query: string, page: number) {
    return this.bookApiService.searchBooks(type, query, page);
  }
}
