import { LibraryUI } from './library_UI.js';

/**
 * //Class: Manga/Manhua/Manhwa
 * @param {object} dataObject - with source as the key
 */
class Book {
	constructor(bookData) {
		this.bookData = bookData;
	}

	//Function: return an organized object data
	static getBookDetails(data) {
		//Get book source through the object key
		//Convert array to string
		let source = Object.keys(data).toString();

		return {
			source: source,
			...data[`${source}`],
		};
	}
}

//Class: Form
class Form {
	/**
	 *
	 * @param {string} url
	 * @returns {object} from JSON
	 */
	static async getBookData(url) {
		let res = (
			await fetch(
				`https://kiru-js.vercel.app/direct?url=${url}`,
				{ method: 'GET' },
				{ mode: 'no-cors' }
			)
		).json();

		let data = await res;

		return JSON.parse(data);
	}

	/**
	 * //Function: Displays data to results container
	 * @param {object} objData
	 */
	static displayData(objData) {
		let bookData = Book.getBookDetails(objData);
		let { source, title, image, author, status, latest } = bookData;

		const bookLibraryCont = document.querySelector('#results-cont');

		//Checks if previous results is still displayed
		this.removeResults();

		//Create new div
		const bookCard = document.createElement('div');
		bookCard.classList.add('result');

		//Results HTML template
		bookCard.innerHTML = `
		<div class="cover-image">
			<img src=${image} alt="book_cover" height="140px">
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

		bookLibraryCont.append(bookCard);
	}

	static displayLoader() {
		const bookLibraryCont = document.querySelector('#results-cont');

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

		bookLibraryCont.append(loaderDiv);
	}

	static removeResults() {
		const bookLibraryCont = document.querySelector('#results-cont');

		//Checks if previous results is still displayed
		if (bookLibraryCont.childElementCount > 0) {
			//Remove previous result
			bookLibraryCont.firstElementChild.remove();
		}
	}

	static displayError() {
		const bookLibraryCont = document.querySelector('#results-cont');

		const errorDiv = document.createElement('div');
		errorDiv.innerHTML = `
		<div class="error-result">エラーが発生しました。もう一度お試しください</div>
		`;

		bookLibraryCont.append(errorDiv);
	}

	static render() {
		const form = document.querySelector('#manga-form');
		const modalControl = this.formModalControllers();
		let currentData = {};

		//Event: render modal controllers
		modalControl.render();

		//Event: search
		form.addEventListener('submit', async (e) => {
			//Prevent actual submit and refresh
			e.preventDefault();

			//Get form value
			const url = document.querySelector('#address__url').value;

			//Call loader
			this.displayLoader();

			//Fetch for object data
			async function fetchData() {
				const data = await Form.getBookData(url);

				//Remove loader
				document.querySelector('#results-cont').firstElementChild.remove();

				return data;
			}

			fetchData()
				.then((results) => {
					//Stage current data
					currentData = results;

					//Display data to results container
					this.displayData(results);
				})
				.catch((err) => {
					const resultsContainer = document.querySelector('#results-cont');

					//Remove loader
					resultsContainer.firstElementChild.remove();

					//Display error message
					this.displayError();
				});
		});

		//Event: Save/add data to library
		document.querySelector('#save_btn').addEventListener('click', () => {
			//Instantiate book class
			const book = new Book(currentData);

			// console.log(Book.getBookDetails(book.bookData));
			//Display data to library < import function from ui
			LibraryUI.addMangaToList(book.bookData);

			//add to storage < import from storage.js
			LibraryUI.moreFunction();

			//Clear fields and remove results
			//Close modal
			modalControl.closeForm();
		});
	}

	//Function: handles modal events
	static formModalControllers() {
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
				Form.removeResults();

				//Close container
				pageContent.classList.remove('inactive');
				formContent.classList.add('hidden');
			},

			render() {
				//Event: Open form
				openButton.addEventListener('click', this.openForm);

				//Event: Close form
				closeButton.addEventListener('click', this.closeForm);
			},
		};
	}
}

export { Form, Book };
