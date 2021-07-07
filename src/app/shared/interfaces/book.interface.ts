import { Status } from '../module';
import * as BookType from '../types/book.type';

export interface BookData {
  selfLink: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  isbn: { type: string; identifier: string }[];
  categories: string[] | string;
  pageCount: number;
  image: string;
  infoLink: string;
  webReaderLink: string;
}

export interface LibraryBookData extends BookData {
  status: Status;
}

export interface Book {
  getBookDetails: (data?: BookType.BookFetchDataItem) => BookData;
  // createLibraryItem(data?: BookData): BookType.LibraryItem;
  createResultsDataItem: (data?: BookData) => BookType.ResultsDataItem;
}
