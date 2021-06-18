import { BookData, Statistics } from '../shared/module';
import { getMangaList } from '../store/store';

export class BookStats implements Statistics {
	private totalBooks: HTMLElement;
	private ongoingBooks: HTMLElement;
	private completedBooks: HTMLElement;

	constructor() {
		this.totalBooks = document.querySelector(`[data-total="books"]`);
		this.ongoingBooks = document.querySelector(`[data-total="ongoing"]`);
		this.completedBooks = document.querySelector(`[data-total="completed"]`);
	}

	private totalBooksInStorage = (): number => {
		const mangaList: BookData[] = getMangaList();

		return mangaList.length;
	};

	private ongoingBooksInStorage = (): number => {
		let mangaList: BookData[] = getMangaList();
		const ongoingRegEx: RegExp = /ongoing/i;

		return mangaList.filter((manga: BookData) =>
			ongoingRegEx.test(manga['status'])
		).length;
	};

	private completedBooksInStorage = (): number => {
		let mangaList: BookData[] = getMangaList();
		const ongoingRegEx: RegExp = /completed/i;

		return mangaList.filter((manga: BookData) =>
			ongoingRegEx.test(manga['status'])
		).length;
	};

	public renderUpdatedStats = (): void => {
		this.totalBooks.textContent = `${this.totalBooksInStorage()}`;
		this.ongoingBooks.textContent = `${this.ongoingBooksInStorage()}`;
		this.completedBooks.textContent = `${this.completedBooksInStorage()}`;
	};
}
