import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookSearchResponse} from '../../core/models/book-search-response.model';
import {BookModel} from '../../core/models/book.model';
import {AuthorModel} from '../../core/models/author.model';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  private readonly baseUrl = "https://openlibrary.org";

  constructor(private http: HttpClient) { }

  searchBooks(type: string, query: string, page: number): Observable<BookSearchResponse> {
    return this.http.get<BookSearchResponse>(`${this.baseUrl}/search.json?${type}=${query}&page=${page}&limit=5`);
  }

  getBookDetails(key: string): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.baseUrl}${key}.json`);
  }

  getAuthorDetails(key: string): Observable<AuthorModel> {
    return this.http.get<AuthorModel>(`${this.baseUrl}/authors/${key}.json`);
  }
}
