import * as BookType from '../types/book.type';

export interface BookData {
	source: string;
	link: string;
	title: string;
	image: string;
	latest: string;
	latestLink: string;
	author: string;
	status: string;
	description: string;
}

export interface Book {
	getBookDetails(data?: BookType.BookFetchData): BookData;
	createLibraryItem(data?: BookData): BookType.LibraryItem;
	createResultsDataItem(data?: BookData): BookType.ResultsDataItem;
}
