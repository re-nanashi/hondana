import * as Storage from '../store/store';
import {
	LibraryItem,
	LibraryImpl,
	Book,
	BookData,
	Statistics,
} from '../shared/module';

export class Library implements LibraryImpl {
	private libraryContainer: HTMLElement;
	libraryStats: Statistics;

	/**
	 * @description Get manga from storage then display
	 * @param a callback that creates a library item
	 */
	private _displayListFromStorage = ({ createLibraryItem }: Book): void => {
		const mangaList: BookData[] = Storage.getMangaList();

		mangaList.forEach((manga: BookData): void => {
			this.addMangaToList(createLibraryItem(manga));
		});
	};

	/**
	 * @description removes manga from list and storage
	 * @param e as a mouse click event
	 */
	private _deleteMangaFromList = (e: MouseEvent): void => {
		//Define clicked element
		const eventTargetElement = e.target as HTMLElement;

		//Select parent .book_card element
		const parentElement: HTMLElement =
			eventTargetElement.parentElement.parentElement.parentElement;

		this.libraryContainer.removeChild(parentElement);

		//Remove from storage
		const title: string =
			parentElement.querySelector('.manga-title > a').textContent;
		Storage.removeMangaFromStorage(title);

		//Update stats
		this.libraryStats.renderUpdatedStats();
	};

	private _removePopUpToggle = (e: Event): void => {
		const confirmationPopUp = (<HTMLElement>e.target).querySelector(
			'.confirmation'
		);

		//Check if delete is clicked and confirmation popup is displayed
		if (confirmationPopUp) confirmationPopUp.classList.toggle('active');
	};

	private _expandCollapse = (e: Event): void => {
		//Select parent .book_card element
		const parentElement = (<HTMLElement>e.target).parentElement.parentElement
			.parentElement;

		parentElement.classList.contains('expand')
			? parentElement.classList.remove('expand')
			: parentElement.classList.add('expand');
	};

	/**
	 * @constructor
	 * @description contains library container
	 */
	constructor() {
		this.libraryContainer = document.querySelector('#book_library');
		this.libraryStats;
	}

	/**
	 * @description initialize library
	 * @param book class BookCreator
	 */
	init = (book: Book, bookStats: Statistics): void => {
		//Event: Display
		document.addEventListener('DOMContentLoaded', () => {
			this._displayListFromStorage(book);
			this.bindLibraryEvents();
		});

		this.libraryStats = bookStats;
	};

	/**
	 * @description add and display manga to list
	 * @param {string} data as library item templete literal string
	 */
	addMangaToList = (data: LibraryItem): void => {
		const bookItemCard: HTMLDivElement = document.createElement('div');

		bookItemCard.classList.add('book_card');
		bookItemCard.innerHTML = data;

		this.libraryContainer.append(bookItemCard);
	};

	/**
	 * @description filter searches library by title
	 */
	searchLibrary = (): void => {
		let input = <HTMLInputElement>document.getElementById('searchInput'),
			filter: string = input.value.toUpperCase(),
			books: NodeListOf<HTMLElement> =
				this.libraryContainer.querySelectorAll('.book_card'),
			a: HTMLElement,
			textValue: string;

		//Loop through books
		for (let i = 0; i < books.length; i++) {
			a = books[i].querySelector('.manga-title > a');
			textValue = a.textContent || a.innerText;

			//Check if conditions are met
			//Filter book list by hiding element
			textValue.toUpperCase().indexOf(filter) > -1
				? (books[i].style.display = '')
				: (books[i].style.display = 'none');
		}
	};

	/**
	 * @description binds library events
	 */
	bindLibraryEvents = (): void => {
		//Event: Search library
		const search: HTMLElement = document.querySelector('#searchInput');

		search.addEventListener('keyup', this.searchLibrary);

		//Event: Display remove card popup
		const deleteButton: NodeListOf<Element> =
			document.querySelectorAll('#card_remove_btn');

		deleteButton.forEach((button) => {
			button.addEventListener('click', this._removePopUpToggle);
		});

		//Event: Expand card
		const readMoreButton: NodeListOf<Element> =
			document.querySelectorAll('.more');

		readMoreButton.forEach((button) => {
			button.addEventListener('click', this._expandCollapse);
		});

		//Event: confirm deletion
		const confirmDelete: NodeListOf<Element> =
			document.querySelectorAll('#confirm');

		confirmDelete.forEach((button) => {
			button.addEventListener('click', this._deleteMangaFromList);
		});
	};
}
