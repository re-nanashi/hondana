import BookCard from './book';
import * as anime from 'animejs';
import { statusButton } from '../shared/status_button/button';

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
  Status,
} from '../shared/module';

export class SearchForm implements Form {
  private currentData: Book[];

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

  /**
   * @description fetch data from google books api
   * @param keyword search parameter string
   * @returns {BookFetchData}
   */
  private _getBookData = async (keyword: string): Promise<BookFetchData> => {
    try {
      let response = (
        await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=2`
        )
      ).json();

      let data = (await response)['items'];

      let updatedData: BookFetchData = await Promise.all(
        data.map(async (item: BookFetchDataItem) => {
          let newData = await SearchForm._getUpdatedData(item.selfLink);

          return newData;
        })
      );

      return updatedData;
    } catch (err) {
      throw new Error(err);
    }
  };

  static _getUpdatedData = async (
    selfLink: string
  ): Promise<BookFetchDataItem> => {
    try {
      let response = (await fetch(selfLink)).json();

      let data = await response;

      return data;
    } catch (err) {
      throw new Error(err);
    }
  };

  private _displayData = (data: ResultsDataItem): void => {
    const bookDetails: HTMLDivElement = document.createElement('div');
    bookDetails.classList.add('result');

    bookDetails.innerHTML = data;

    //Adds select status button to result card
    //Appends to .details class
    statusButton(bookDetails.querySelector('.details'));

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
    //Remove previous results by looping while firstEleChild exists
    while (this.resultsContainer.firstElementChild) {
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

  private _search = async (url: string): Promise<void> => {
    try {
      const response = await this._getBookData(url);

      //Remove loader
      this.resultsContainer.firstElementChild.remove();

      //Stage and display data
      response.forEach((item: BookFetchDataItem) => {
        let book: Book = new BookCard(item);

        this.currentData.push(book);

        this._displayData(book.createResultsDataItem());
      });

      //Select book to save and its reading status
      this._selectBookToSave();
    } catch (err) {
      //Remove loader
      this.resultsContainer.firstElementChild.remove();

      this._displayError();
      console.log(`問題が発生しました: ${err}`);
    }
  };

  private _submitInputURL = (): void => {
    //Get form value
    const searchString: string = (<HTMLInputElement>(
      document.querySelector('#address__url')
    )).value;

    //Check url if conditions are met
    if (searchString === '') return;

    //Call loader
    this._displayLoader();

    this._search(searchString);
  };

  /**
   * @description uses anime.js library that animates the checkmark element in HTML
   * @param parentNode a node to append the animation to
   */
  private _selectAnimation = (parentNode: HTMLElement): void => {
    let selectTimeline = (<any>anime).default.timeline({
      direction: 'alternate',
      loop: false,
    });

    selectTimeline
      .add({
        targets: parentNode.querySelector('.checkmark'),
        scale: [{ value: [0, 1], duration: 300, easing: 'easeOutQuad' }],
      })
      .add({
        targets: parentNode.querySelector('.check'),
        strokeDashoffset: {
          value: [(<any>anime).default.setDashoffset, 0],
          duration: 350,
          delay: 100,
          easing: 'easeOutQuart',
        },
        translateX: {
          value: [6, 0],
          duration: 350,
          delay: 100,
          easing: 'easeOutQuart',
        },
        translateY: {
          value: [-2, 0],
          duration: 350,
          delay: 100,
          easing: 'easeOutQuart',
        },
        offset: 0,
      });
  };

  /**
   * @description appends checkMark animation according to mouse event
   * @param resultNode resultNode is the result element; mouse event.target
   */
  private _appendAnimation = <T extends HTMLElement>(resultNode: T): void => {
    const parentElement: T = resultNode;
    const selectDiv: HTMLDivElement = document.createElement('div');
    selectDiv.classList.add('check-cont');
    selectDiv.innerHTML = `
            <svg
                class="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
            >
                <circle class="circle" cx="16" cy="16" r="16" fill="#d9165f" />
                <path
                    class="check"
                    d="M9 16l5 5 9-9"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2.5"
                    stroke-linecap="round"
                />
            </svg>
        `;

    if (!parentElement.classList.contains('active')) {
      parentElement.classList.add('active');
      parentElement.append(selectDiv);
      this._selectAnimation(parentElement);
    } else {
      parentElement.classList.remove('active');
      parentElement.querySelector('.check-cont').remove();
    }
  };

  /**
   * @description fn that selects a result by appending a checkmark animation
   */
  private _selectBookToSave = (): void => {
    const results: NodeListOf<Node> =
      document.querySelector('#results-cont').childNodes;

    results.forEach((result) => {
      result.addEventListener('click', (e: MouseEvent) => {
        this._appendAnimation(e.currentTarget as HTMLElement);
      });
    });
  };

  /**
   * @description get selected book/s by checking if html element'classlist contains '.active'
   *              then get the element's button group's active element
   * @returns {{ index: number; status: Status }[]} an array of index and status object
   */
  private _getSelectedBooks = (): { index: number; status: Status }[] => {
    const results: NodeListOf<HTMLElement> =
      this.resultsContainer.querySelectorAll('.result');

    //Fn: get activeStatus by checking the active button on button group
    function getActiveStatus(parentNode: HTMLElement): Status {
      const buttonGroup = Array.from(
        parentNode.querySelectorAll('[data-status]')
      );

      //Checks which of the buttons are active
      let activeStatus = (
        buttonGroup.find((button: HTMLElement) =>
          button.classList.contains('active')
        ) as HTMLElement
      ).getAttribute('data-status');

      switch (activeStatus) {
        case 'currently_reading':
          return Status.Currently;
        case 'want_to_read':
          return Status.Want;
        default:
          return Status.Finished;
      }
    }

    let selected: { index: number; status: Status }[] = [];

    //Loop through the results container then check whether it is selected
    //Get the selected result's status by calling getActiveStatus function
    for (let i = 0; i < results.length; i++) {
      if ((<HTMLElement>results[i]).classList.contains('active')) {
        let status = getActiveStatus(results[i]);
        selected.push({ index: i, status: status });
      }
    }

    return selected;
  };

  //TODO: Create a left side notification box
  private _saveDataToLibrary = (
    library: LibraryImpl,
    store: Store,
    stats: Statistics
  ): void => {
    const booksToSave = this._getSelectedBooks();

    //Check if a result item is selected;
    //If none show error notification
    if (booksToSave.length === 0) {
      console.log('No book');
      return;
    }

    for (let i = 0; i < booksToSave.length; i++) {
      const bookIndex: number = booksToSave[i].index;
      //Get the same book data from this.currentdata
      const bookToSave: Book = this.currentData[bookIndex];

      //Will try to save the book data but returns null if data is already saved
      const checkIfSaved = store.storeBook(
        bookToSave.getBookDetails(),
        booksToSave[i].status
      );

      if (checkIfSaved !== null) {
        library.addBookToList(
          bookToSave.createLibraryItem(booksToSave[i].status)
        );
      } else {
        throw new Error('Book is already saved');
      }
    }

    //Update library list
    library.bindLibraryEvents();
    stats.renderUpdatedStats();

    //Clear fields and remove results
    this.currentData = [];
    this._closeSearchForm();
  };

  /**
   * @description binds all form events to respective features/module
   * @param library
   * @param store
   * @param stats
   */
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

    //Event: save/add data to library
    this.saveDataButton.addEventListener('click', (): void => {
      this._saveDataToLibrary(library, store, stats);
    });
  };
}
