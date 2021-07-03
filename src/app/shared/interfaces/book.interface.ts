import * as BookType from '../types/book.type';

export interface BookData {
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	description: string;
	ISBN: { type: string; identifier: string }[];
	categories: string[];
	pageCount: number;
	image: string;
	infoLink: string;
	webReaderLink: string;
}

export interface Book {
	getBookDetails(data?: BookType.BookFetchData): BookData;
	createLibraryItem(data?: BookData): BookType.LibraryItem;
	createResultsDataItem(data?: BookData): BookType.ResultsDataItem;
}
