import BookCard from './book';
import {
	Book,
	LibraryImpl,
	Form,
	ResultsDataItem,
	Store,
} from '../shared/module';

export class SearchForm implements Form {
	private currentData: Book | undefined;

	library: LibraryImpl;

	resultsContainer: HTMLElement;
	formContainer: HTMLElement;
	pageContainer: HTMLElement;
	openFormButton: HTMLElement;
	closeFormButton: HTMLElement;
	searchForm: HTMLInputElement;
	saveDataButton: HTMLElement;

	constructor() {
		this.currentData = undefined;

		this.resultsContainer = document.querySelector('#results-cont');
		this.formContainer = document.getElementById('form_container');
		this.pageContainer = document.getElementById('page_content');
		this.openFormButton = document.querySelector('.addBook_btn');
		this.closeFormButton = document.querySelector('#close_btn');
		this.searchForm = document.querySelector('#manga-form');
		this.saveDataButton = document.querySelector('#save_btn');
	}

	private getBookData = async (url: string) => {
		let response = (
			await fetch(`https://kiru-js.vercel.app/direct?url=${url}`, {
				method: 'GET',
			})
		).json();

		let data = await response;

		//Remove loader when fetching
		this.resultsContainer.firstElementChild.remove();

		return JSON.parse(data);
	};

	private displayData = (data: ResultsDataItem): void => {
		const bookDetails: HTMLDivElement = document.createElement('div');
		bookDetails.classList.add('result');

		bookDetails.innerHTML = data;

		//Append results to container
		this.resultsContainer.append(bookDetails);
	};

	private displayLoader = (): void => {
		//Checks if previous results are still displayed
		this.removeResults();

		const loaderDiv: HTMLDivElement = document.createElement('div');
		loaderDiv.innerHTML = `
			<div class="loader">
			  <div class="bounce1"></div>
			  <div class="bounce2"></div>
			  <div class="bounce3"></div>
			</div>
		`;

		this.resultsContainer.append(loaderDiv);
	};

	private removeResults = (): void => {
		//Check if previous results are still displayed
		if (this.resultsContainer.childElementCount > 0) {
			//Remove previous results
			this.resultsContainer.firstElementChild.remove();
		}
	};

	private displayError = (): void => {
		const errorDiv: HTMLDivElement = document.createElement('div');
		errorDiv.innerHTML = `
			<div class="error-result">エラーが発生しました。もう一度お試しください</div>
		`;

		this.resultsContainer.append(errorDiv);
	};

	private openSearchForm = (): void => {
		this.formContainer.classList.remove('hidden');
		this.pageContainer.classList.add('inactive');
	};

	private closeSearchForm = (): void => {
		//Remove text input from form
		(<HTMLInputElement>document.querySelector('#address__url')).value = '';

		this.removeResults();

		//Close container
		this.formContainer.classList.add('hidden');
		this.pageContainer.classList.remove('inactive');
	};

	private bindOpenCloseEvents = (): void => {
		this.openFormButton.addEventListener('click', this.openSearchForm);
		this.closeFormButton.addEventListener('click', this.closeSearchForm);
	};

	private submitInputURL = async (): Promise<void> => {
		//Get form value
		const url: string = (<HTMLInputElement>(
			document.querySelector('#address__url')
		)).value;

		//Check url if conditions are met
		if (url === '') return;

		//Call loader
		this.displayLoader();

		this.getBookData(url)
			.then((response) => {
				let book = new BookCard(response);

				//Stage current data
				this.currentData = book;

				//Display data to results container
				this.displayData(book.createResultsDataItem());
			})
			.catch((err) => {
				//Remove loader
				this.resultsContainer.firstElementChild.remove();

				this.displayError();
				console.log(`問題が発生しました: ${err}`);
			});
	};

	private saveDataToLibrary = (library: LibraryImpl, store: Store): void => {
		//Check there is current data
		if (typeof this.currentData !== 'object') return;

		library.addMangaToList(this.currentData.createLibraryItem());

		store.storeManga(this.currentData.getBookDetails());

		//Update library list
		library.bindLibraryEvents();

		//Clear fields and remove results
		this.currentData = undefined;
		this.closeSearchForm();
	};

	bindFormEvents = (library: LibraryImpl, store: Store): void => {
		this.bindOpenCloseEvents();

		//Event: search
		this.searchForm.addEventListener('submit', async (e: Event) => {
			e.preventDefault();

			await this.submitInputURL();
		});

		//Event: save/add data to library
		this.saveDataButton.addEventListener('click', (): void => {
			this.saveDataToLibrary(library, store);
		});
	};
}