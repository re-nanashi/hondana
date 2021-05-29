import { Form } from './form.js';
import { Book } from './book_card.js';
import { Library } from './library.js';
import { Storage } from './storage.js';
import { Sidebar } from './sidebar.js';

const controllers = (function () {
	//Form Controller
	const _form = {
		render: function () {
			let currentData;

			//Render form events
			Form.bindEvents.init();

			//Event: search
			Form.selector._searchForm.addEventListener('submit', async (e) => {
				//Prevent actual submit and reload
				e.preventDefault();

				//Get form value;
				const url = document.querySelector('#address__url').value;

				//Check URL
				if (url === '') return;

				//Call loader
				Form.load();

				//Fetch for object data
				fetchData()
					.then((response) => {
						let book = Book(response);

						//Stage current data
						currentData = Book(response);

						//Display data to results container
						Form.displayResults(book.createResultsData());
					})
					.catch((err) => {
						//Remove loader
						Form.selector._resultsContainer.firstElementChild.remove();

						//Display error message
						Form.error();
					});

				//Function: fetches data
				async function fetchData() {
					const data = await Form.getBookData(url);

					//Remove loader
					Form.selector._resultsContainer.firstElementChild.remove();

					return data;
				}
			});

			//Event: Save/add data to library
			Form.selector._saveData.addEventListener('click', () => {
				//Check data if object
				if (typeof currentData !== `object`) return;

				//Display data to library
				Library.add(currentData.createLibraryItem());

				//Add to storage
				Storage.add(currentData.bookDetails());

				//Update Library list
				Library.bind();

				//Clear fields and remove results
				currentData = undefined;
				Form.bindEvents.close();
			});
		},
	};

	//Library Controller
	const _library = {
		render: function () {
			const book = Book();

			//Initialize library and events
			Library.init(book);
		},
	};

	return {
		on: function () {
			_library.render();
			_form.render();
			Sidebar.render();
		},
	};
})();

export { controllers as LibraryApp };
