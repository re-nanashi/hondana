/**
 * //Class: Manga/Manhua/Manhwa
 * @param {object} dataObject - with source as the key
 */
class Book {
	constructor(bookData) {
		this._bookData = bookData;
	}

	//Function: return an organized object data
	static getBookDetails(data = this._bookData) {
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

	//Create a div to display the results
	static displayData(objData) {
		let bookData = Book.getBookDetails(objData);
		let { source, title, image, status, latest } = bookData;

		const bookLibraryCont = document.querySelector('#results-cont');

		//Checks if previous results is still displayed
		if (bookLibraryCont.childElementCount > 0) {
			//Remove previous result
			bookLibraryCont.firstElementChild.remove();
		}

		//Create new div
		const bookCard = document.createElement('div');
		bookCard.classList.add('result');

		//Results HTML template
		bookCard.innerHTML = `
		<div class="cover-image">
			<img src=${image} alt="book_cover" height="200px">
		</div>
		<div class="details">
			<div class="title">
				Title
				<i>${title}</i>
			</div>
			<div class="source">
				Source
				<i>${source}</i>
			</div>

			<div class="status">
				Status
				<i>${status}</i>
			</div>
			<div class="latest">
				Latest
				<i>${latest}</i>
			</div>
		</div>
		`;

		bookLibraryCont.append(bookCard);
	}

	static render() {
		const form = document.querySelector('#manga-form');

		//Event: search
		form.addEventListener('submit', async (e) => {
			//Prevent actual submit and refresh
			e.preventDefault();

			//Get form value
			const url = document.querySelector('#address__url').value;

			//Fetch for object data
			const data = await Form.getBookData(url);

			//Display data to results container
			Form.displayData(data);
		});
	}
}

export { Form };
