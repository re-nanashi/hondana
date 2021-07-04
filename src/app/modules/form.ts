import BookCard from './book';
import {
  Book,
  LibraryImpl,
  Form,
  ResultsDataItem,
  Store,
  Statistics,
  BookFetchData,
  BookFetchDataItem,
  BookData,
} from '../shared/module';

export class SearchForm implements Form {
  //TODO currentData type
  private currentData: BookData[] | any[];

  resultsContainer: HTMLElement;
  formContainer: HTMLElement;
  pageContainer: HTMLElement;
  openFormButton: HTMLElement;
  closeFormButton: HTMLElement;
  searchForm: HTMLInputElement;
  saveDataButton: HTMLElement;

  constructor() {
    this.currentData = [];

    this.resultsContainer = document.querySelector('#results-cont');
    this.formContainer = document.getElementById('form_container');
    this.pageContainer = document.getElementById('page_content');
    this.openFormButton = document.querySelector('.addBook_btn');
    this.closeFormButton = document.querySelector('#close_btn');
    this.searchForm = document.querySelector('#manga-form');
    this.saveDataButton = document.querySelector('#save_btn');
  }

  private _getBookData = async (keyword: string): Promise<BookFetchData> => {
    try {
      let response = (
        await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=3`
        )
      ).json();

      let data = await response;

      return data['items'];
    } catch (err) {
      throw new Error(err);
    }
  };

  //TODO
  //DISPLAY MULTIPLE DATA TO VIEW
  private _displayData = (data: ResultsDataItem): void => {
    const bookDetails: HTMLDivElement = document.createElement('div');
    bookDetails.classList.add('result');

    bookDetails.innerHTML = data;

    //Remove loader
    this.resultsContainer.firstElementChild.remove();

    //Append results to container
    this.resultsContainer.append(bookDetails);
  };

  private _displayLoader = (): void => {
    //Checks if previous results are still displayed
    this._removeResults();

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

  private _removeResults = (): void => {
    //Check if previous results are still displayed
    if (this.resultsContainer.childElementCount > 0) {
      //Remove previous results
      this.resultsContainer.firstElementChild.remove();
    }

    this.currentData = [];
  };

  private _displayError = (): void => {
    const errorDiv: HTMLDivElement = document.createElement('div');
    errorDiv.innerHTML = `
            <div class="error-result">エラーが発生しました。もう一度お試しください</div>
        `;

    this.resultsContainer.append(errorDiv);
  };

  private _openSearchForm = (): void => {
    this.formContainer.classList.remove('hidden');
    this.pageContainer.classList.add('inactive');
  };

  private _closeSearchForm = (): void => {
    //Remove text input from form
    (<HTMLInputElement>document.querySelector('#address__url')).value = '';

    this._removeResults();

    //Close container
    this.formContainer.classList.add('hidden');
    this.pageContainer.classList.remove('inactive');
  };

  private _bindOpenCloseEvents = (): void => {
    this.openFormButton.addEventListener('click', this._openSearchForm);
    this.closeFormButton.addEventListener('click', this._closeSearchForm);
  };

  private _submitInputURL = async (): Promise<void> => {
    //Get form value
    const searchString: string = (<HTMLInputElement>(
      document.querySelector('#address__url')
    )).value;

    //Check url if conditions are met
    if (searchString === '') return;

    //Call loader
    this._displayLoader();

    //TODO
    //TODO
    /**
     * So at this point we can call fetch and have an array of objects that corresponds to data
     * we need to convert that data into BookData through bookcard class where are going to temporarily save the data ?
     * since we need to check later which one
     */
    //Results object
    this._getBookData(searchString)
      .then((response) => {
        // let book = new BookCard(response);
        response.forEach((item: BookFetchDataItem) => {
          let book = new BookCard(item);
          this.currentData.push(book.getBookDetails());
          console.log(book);
          // this._displayData(book.createResultsDataItem());
        });
        // //Stage current data
        // this.currentData = book;

        //Response is an array of objects

        // //Display data to results container
        // this._displayData(book.createResultsDataItem());
      })
      .catch((err) => {
        //Remove loader
        this.resultsContainer.firstElementChild.remove();

        this._displayError();
        console.log(`問題が発生しました: ${err}`);
      });
  };

  // private _saveDataToLibrary = (
  // 	library: LibraryImpl,
  // 	store: Store,
  // 	stats: Statistics
  // ): void => {
  // 	//Check there is current data
  // 	if (typeof this.currentData !== 'object') return;

  // 	//Check if there manga is already saved
  // 	const checkIfSaved = store.storeManga(this.currentData.getBookDetails());

  // 	checkIfSaved === null
  // 		? null
  // 		: library.addMangaToList(this.currentData.createLibraryItem());

  // 	//Update library list
  // 	library.bindLibraryEvents();
  // 	stats.renderUpdatedStats();

  // 	//Clear fields and remove results
  // 	this.currentData = undefined;
  // 	this._closeSearchForm();
  // };

  public bindFormEvents = (
    library: LibraryImpl,
    store: Store,
    stats: Statistics
  ): void => {
    this._bindOpenCloseEvents();

    //Event: search
    this.searchForm.addEventListener('submit', async (e: Event) => {
      e.preventDefault();

      await this._submitInputURL();
    });

    // //Event: save/add data to library
    // this.saveDataButton.addEventListener('click', (): void => {
    // 	this._saveDataToLibrary(library, store, stats);
    // });
  };
}
