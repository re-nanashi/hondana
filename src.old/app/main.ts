import BookCard from './modules/book';
import { Library } from './modules/library';
import { BookStats } from './modules/stats';
import { SearchForm } from './modules/form';
import * as Storage from './store/library.store';
import { renderSideBar } from './modules/sidebar';
import { runLoader } from './shared/loader/loader';
import { LibraryImpl, Form, Book, Store, Statistics } from './shared/module';

export class App {
  storage: Store;
  library: LibraryImpl;
  form: Form;
  book: any;
  bookStats: Statistics;

  constructor() {
    this.storage = Storage;
    this.library = new Library();
    this.form = new SearchForm();
    this.book = new BookCard();
    this.bookStats = new BookStats();

    //Explicitly render sidebar and events
    runLoader();
    renderSideBar();
    this.bookStats.renderUpdatedStats();
  }

  init = (): void => {
    // this.library.init(this.book, this.bookStats);
    this.form.bindFormEvents(this.library, this.storage, this.bookStats);
  };
}
