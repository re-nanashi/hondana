import { Status } from '../module';
import * as BookType from '../types/book.type';

export interface BookData {
  selfLink: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  isbn: { type: string; identifier: string }[] | any;
  categories: string[] | string;
  pageCount: number;
  image: string;
  previewLink: string;
  webReaderLink: string;
}

export interface LibraryBookData extends BookData {
  status: Status;
}

export interface Book {
  getBookDetails: (data?: BookType.BookFetchDataItem) => BookData;
  createResultsDataItem: (data?: BookData) => BookType.ResultsDataItem;
  createLibraryItem(status: Status, data?: BookData): BookType.LibraryItem;
}
