import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookSearchResponse} from '../../core/models/book-search-response.model';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {
  private readonly baseUrl = "https://openlibrary.org";

  constructor(private http: HttpClient) { }

  searchBooks(type: string, query: string, page: number): Observable<BookSearchResponse> {
    return this.http.get<BookSearchResponse>(`${this.baseUrl}/search.json?${type}=${query}&page=${page}&limit=10`);
  }
}
