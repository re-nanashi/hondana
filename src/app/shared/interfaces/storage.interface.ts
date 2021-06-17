import { BookData } from './book.interface';

export interface Store {
	getMangaList(): BookData[];
	storeManga(T: BookData): void;
	removeMangaFromStorage(T: string): void;
}
