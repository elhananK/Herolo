import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IBook } from '../../interfaces/book.interface';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

// Injectable all the class to angular
@Injectable()
export class BooksService {


  // must be public so we can use for validate.
  public allBooks: IBook[];

  constructor(private http: HttpClient) { }

  GetAll(): Observable<IBook[]> {
    return this.http
      .get('api/books')
      .map(response => {
        return response as IBook[];
      });
  }

  GetAllPerPage(pageSize: number, pageIndex: number): Observable<IBook[]> {
    return this.http
      .get('api/books')
      .map(response => response as IBook[])
      .map(data => {
       return data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
        
      });
  }

  AddBook(book: IBook): Observable<void> {
    return this.http
      .post('api/books', book)
      .map(() => { });
  }

}
// .map(response => {
//   this.allBooks = response as IBook[];
//  return response as IBook[];