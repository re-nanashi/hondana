import * as Storage from './store/store';
import BookCard from './modules/book';
import { Library } from './modules/library';
import { SearchForm as Form } from './modules/form';
import { renderSideBar } from './modules/sidebar';

export class App {
	storage: any;
	library: any;
	form: any;
	book: any;

	constructor() {
		this.storage = Storage;
		this.library = new Library();
		this.form = new Form();
		this.book = new BookCard();

		renderSideBar();
	}

	init = (): void => {
		this.library.init(this.book);
		this.form.bindFormEvents(this.library, this.storage);
	};
}
