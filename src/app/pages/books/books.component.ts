import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: any = [];
  book: Books = {};
  bookId: string = '';
  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => (this.bookId = param.id));
  }
  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.booksService.getBooks().subscribe((res) => {
      this.books = res;
      this.getBookById();
    });
  }

  getBookById() {
    this.book = this.books.find((book: Books) => book.id == this.bookId);
  }
}
