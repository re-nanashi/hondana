import { BookData, Statistics } from '../shared/module';
import { getMangaList } from '../store/library.store';

export class BookStats implements Statistics {
	private totalBooks: HTMLElement;
	private ongoingBooks: HTMLElement;
	private completedBooks: HTMLElement;

	constructor() {
		this.totalBooks = document.querySelector(`[data-total="books"]`);
		this.ongoingBooks = document.querySelector(`[data-total="ongoing"]`);
		this.completedBooks = document.querySelector(`[data-total="completed"]`);
	}

	private _totalBooksInStorage = (): number => {
		const mangaList: BookData[] = getMangaList();

		return mangaList.length;
	};

	private _statusOfBooksInStorage = (
		status: 'ongoing' | 'completed'
	): number => {
		let mangaList: BookData[] = getMangaList();
		const ongoingRegEx: RegExp = new RegExp(status, 'i');

		return mangaList.filter((manga: BookData) =>
			ongoingRegEx.test(manga['status'])
		).length;
	};

	public renderUpdatedStats = (): void => {
		this.totalBooks.textContent = `${this._totalBooksInStorage()}`;
		this.ongoingBooks.textContent = `${this._statusOfBooksInStorage(
			`ongoing`
		)}`;
		this.completedBooks.textContent = `${this._statusOfBooksInStorage(
			'completed'
		)}`;
	};
}
