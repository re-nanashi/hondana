import * as Storage from './store/store';
import BookCard from './modules/book';
import { Library } from './modules/library';
import { SearchForm } from './modules/form';
import { renderSideBar } from './modules/sidebar';
import { LibraryImpl, Form, Book, Store } from './shared/module';

export class App {
	storage: Store;
	library: LibraryImpl;
	form: Form;
	book: Book;

	constructor() {
		this.storage = Storage;
		this.library = new Library();
		this.form = new SearchForm();
		this.book = new BookCard();

		//Explicitly render sidebar and events
		renderSideBar();
	}

	init = (): void => {
		this.library.init(this.book);
		this.form.bindFormEvents(this.library, this.storage);
	};
}
