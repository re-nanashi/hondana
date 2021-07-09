import { Status } from '../module';
import { BookData, LibraryBookData } from './book.interface';

export interface Store {
  getBookList(): LibraryBookData[];
  storeBook(book: BookData, status: Status): void | null;
  removeBookFromStorage(T: string): void;
}
