import { Form } from './form.js';
import { Book } from './book_card.js';
import { Library } from './library.js';
import { Storage } from './storage.js';

const controllers = (function () {
	//Form Controller
	const _form = {
		render: function () {
			let currentData;

			//Render form events
			const renderEvent = Form.bindEvents();
			renderEvent.init();

			//Event: search
			Form.selector._searchForm.addEventListener('submit', async (e) => {
				//Prevent actual submit and reload
				e.preventDefault();

				//Get form value;
				const url = document.querySelector('address__url').value;

				//Check URL
				if (url === '') return;

				//Call loader
				Form.load();

				//Fetch for object data
				fetchData()
					.then((response) => {
						let book = Book(response);

						//Stage current data
						currentData = book;

						//Display data to results container
						Form.displayResults(book.createResultsData());
					})
					.catch((err) => {
						//Remove loader
						Form.resultsContainer.firstElementChild.remove();

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
				if (typeof currentData && currentData !== null) return;

				//Display data to library
				Library.add(currentData.createLibraryItem());

				//Add to storage
				Storage.add(currentData.bookDetails());

				//Update Library list
				_library.rebind();

				//Clear fields and remove results
				currentData = {};
				Form.bindEvents.closeForm();
			});
		},
	};

	//Library Controller
	const _library = {
		render: function () {
			//Initialize library and events
			Library.init();

			//Event: delete callback from storage
			Library.bind.confirmDelete(Storage.delete);
		},

		rebind: function () {
			//Rebind library events
			Library.bind();

			//Event: delete callback from storage
			Library.bind.confirmDelete(Storage.delete);
		},
	};

	return {
		on: function () {
			_form.render();
			_library.render();
		},
	};
})();

export { controllers as App };
