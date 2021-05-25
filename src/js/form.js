import { UI } from './library_UI.js';
import { Storage } from './localStorage.js';

/**
 * Function: Book/Manga/Manhua/Manhwa
 * @param {object} dataObject - with source as the key
 */
const book = () => {
	let _bookData = {};

	return {
		//Function: set data
		setBookData(dataObject) {
			_bookData = dataObject;
		},

		//Function: return an organized object data
		getBookDetails(data = _bookData) {
			//Get book source through the object key
			//Convert array to string
			let source = Object.keys(data).toString();

			return {
				source: source,
				...data[`${source}`],
			};
		},
	};
};

//Module: Form
const form = (function () {
	'use strict';

	let resultsContainer = document.querySelector('#results-cont');

	return {
		/**
		 *
		 * @param {string} url
		 * @returns {object} from JSON
		 */
		async getBookData(url) {
			let response = (
				await fetch(
					`https://kiru-js.vercel.app/direct?url=${url}`,
					{ method: 'GET' },
					{ mode: 'no-cors' }
				)
			).json();

			let data = await response;

			return JSON.parse(data);
		},

		/**
		 * //Function: Displays data to results container
		 * @param {object} objData
		 */
		displayData(objData) {
			//Instantiate book()
			const Book = book();

			let bookData = Book.getBookDetails(objData);
			let { source, title, image, author, status, latest } = bookData;
			let base64Img = 'data:image/png;base64,' + image;

			//Checks if previous results is still displayed
			this.removeResults();

			//Create new div
			const bookCard = document.createElement('div');
			bookCard.classList.add('result');

			//Results HTML template
			bookCard.innerHTML = `
				<div class="cover-image">
					<img src=${base64Img} alt="book_cover" height="140px">
				</div>
				<div class="details">
					<div class="title">
						${title}
					</div>
					<div class="source">
						Source:
						<i>${source}</i>
					</div>
					<div class="authors">
						Author(s):
						<i>${author}</i>
					</div>
					<div class="status">
						Status:
						<i>${status}</i>
					</div>
					<div class="latest">
						Latest:
						<i>${latest}</i>
					</div>
				</div>
			`;

			resultsContainer.append(bookCard);
		},

		displayLoader() {
			//Checks if previous results is still displayed
			this.removeResults();

			const loaderDiv = document.createElement('div');
			loaderDiv.innerHTML = `
			<div class="loader">
			  <div class="bounce1"></div>
			  <div class="bounce2"></div>
			  <div class="bounce3"></div>
			</div>
			`;

			resultsContainer.append(loaderDiv);
		},

		removeResults() {
			//Checks if previous results is still displayed
			if (resultsContainer.childElementCount > 0) {
				//Remove previous result
				resultsContainer.firstElementChild.remove();
			}
		},

		displayError() {
			const errorDiv = document.createElement('div');
			errorDiv.innerHTML = `
			<div class="error-result">エラーが発生しました。もう一度お試しください</div>
			`;

			resultsContainer.append(errorDiv);
		},

		formModalControllers() {
			const formContent = document.getElementById('form_container');
			const pageContent = document.getElementById('page_content');
			const openButton = document.querySelector('.addBook_btn');
			const closeButton = document.querySelector('#close_btn');

			return {
				openForm() {
					formContent.classList.remove('hidden');
					pageContent.classList.add('inactive');
				},

				closeForm() {
					//Remove text input from form
					document.querySelector('#address__url').value = '';

					//Remove current result
					form.removeResults();

					//Close container
					pageContent.classList.remove('inactive');
					formContent.classList.add('hidden');
				},

				init() {
					//Event: Open form
					openButton.addEventListener('click', this.openForm);

					//Even: Close form
					closeButton.addEventListener('click', this.closeForm);
				},
			};
		},

		render() {
			const searchForm = document.querySelector('#manga-form');
			const modalControl = this.formModalControllers();
			let currentData = {};

			//Event: render modal controllers
			modalControl.init();

			//Event: search
			searchForm.addEventListener('submit', async (e) => {
				//Prevent actual submit and reload
				e.preventDefault();

				//Get form value
				const url = document.querySelector('#address__url').value;

				//Check URL
				if (url === '') return;

				//Call loader
				this.displayLoader();

				//Fetch for object data
				async function fetchData() {
					const data = await form.getBookData(url);

					//Remove loader
					resultsContainer.firstElementChild.remove();

					return data;
				}

				fetchData()
					.then((response) => {
						//Stage current data
						currentData = response;

						//Display data to results container
						this.displayData(response);
					})
					.catch((err) => {
						//Remove loader
						resultsContainer.firstElementChild.remove();

						//Display error message
						form.displayError();
					});
			});

			//NOTE: IF CURRENT DATA IS EMPTY DO NOT ADD
			//      IF DATA IS ALREADY SAVE DO NOT ADD
			//Event: Save/add data to library
			document.querySelector('#save_btn').addEventListener('click', () => {
				//Instantiate book
				const createBook = book();
				createBook.setBookData(currentData);
				let formattedData = createBook.getBookDetails();

				//Check data if empty
				if (formattedData.source === '') return;

				//Display data to library
				UI.addMangaToList(formattedData);

				//Add to storage
				Storage.storeManga(formattedData);

				//Update library list
				UI.renderEvents();

				//Clear fields and remove results
				//Close modal
				currentData = {};
				modalControl.closeForm();
			});
		},
	};
})();

export { book as Book, form as Form };
