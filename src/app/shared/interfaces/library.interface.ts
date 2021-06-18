import * as BookType from '../types/book.type';
import { Book } from './book.interface';

export interface LibraryImpl {
	init(book: Book, stats: any): void;
	addMangaToList(data: BookType.LibraryItem): void;
	searchLibrary(): void;
	bindLibraryEvents(): void;
}
