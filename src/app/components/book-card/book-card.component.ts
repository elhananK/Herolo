import { Component, Input, Output, EventEmitter } from '@angular/core';

// Interfaces
import { IBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {

  @Input() book: IBook = null;

  @Output() editt: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  editBook() {
    this.editt.emit(this.book);
  }

  deleteBook() {
    this.delete.emit(this.book);
  }

}
