import * as BookType from '../types/book.type';

export interface BookData {
    selfLink: string;
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    ISBN: { type: string; identifier: string }[];
    categories: string[] | string;
    pageCount: number;
    image: string;
    infoLink: string;
    webReaderLink: string;
}

export interface Book {
    getBookDetails: (data?: BookType.BookFetchDataItem) => BookData;
    // createLibraryItem(data?: BookData): BookType.LibraryItem;
    createResultsDataItem: (data?: BookData) => BookType.ResultsDataItem;
}
