/**
 * //Class: Manga/Manhua/Manhwa
 * @param {object} dataObject - with source as the key
 */
class Book {
	constructor(bookData) {
		this._bookData = bookData;
	}

	getBookDetails() {
		//Get book source through the object key
		//Convert array to string
		let source = Object.keys(this._bookData).toString();

		return {
			source: source,
			...this._bookData[`${source}`],
		};
	}
}

//Class: Form
class Form {
	static async getBookData(url) {
		let res = (
			await fetch(
				`https://kiru-js.vercel.app/direct?url=${url}`,
				{ method: 'GET' },
				{ mode: 'no-cors' }
			)
		).json();

		let data = await res;

		console.log(data);
	}

	//Create a div to display the results
	static displayData(data) {
		let { source, title, image, status, latest } = data;

		const bookLibraryCont = document.querySelector('#results-cont');
	}

	static render() {
		const form = document.querySelector('#manga-form');

		//Event: search
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			//Prevent actual submit and refresh
			//Get form value
			const url = document.querySelector('#address__url').value;

			Form.getBookData(url);
		});
	}
}

export { Form };
