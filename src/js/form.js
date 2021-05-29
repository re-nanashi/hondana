//Module: Form
const form = (function () {
	'use strict';

	const DOM = {
		_resultsContainer: document.querySelector('#results-cont'),
		_formContainer: document.getElementById('form_container'),
		_pageContainer: document.getElementById('page_content'),
		_openFormButton: document.querySelector('.addBook_btn'),
		_closeFormButton: document.querySelector('#close_btn'),
		_searchForm: document.querySelector('#manga-form'),
		_saveData: document.querySelector('#save_btn'),
	};

	const _getBookData = async (url) => {
		let response = (
			await fetch(
				`https://kiru-js.vercel.app/direct?url=${url}`,
				{ method: 'GET' },
				{ mode: 'no-cors' }
			)
		).json();

		let data = await response;

		return JSON.parse(data);
	};

	const _displayData = (data) => {
		//Create new div
		const bookDetails = document.createElement('div');
		bookDetails.classList.add('result');

		//Results HTML template
		bookDetails.innerHTML = data;

		//Append results
		DOM._resultsContainer.append(bookDetails);
	};

	const _displayLoader = () => {
		//Checks if previous results is still displayed
		_removeResults();

		const loaderDiv = document.createElement('div');
		loaderDiv.innerHTML = `
			<div class="loader">
			  <div class="bounce1"></div>
			  <div class="bounce2"></div>
			  <div class="bounce3"></div>
			</div>
			`;

		DOM._resultsContainer.append(loaderDiv);
	};

	const _removeResults = () => {
		//Checks if previous results is still displayed
		if (DOM._resultsContainer.childElementCount > 0) {
			//Remove previous results
			DOM._resultsContainer.firstElementChild.remove();
		}
	};

	const _displayError = () => {
		const errorDiv = document.createElement('div');
		errorDiv.innerHTML = `
			<div class="error-result">エラーが発生しました。もう一度お試しください</div>
			`;

		DOM._resultsContainer.append(errorDiv);
	};

	const _bindModalFormEvents = (function () {
		const _openForm = () => {
			DOM._formContainer.classList.remove('hidden');
			DOM._pageContainer.classList.add('inactive');
		};

		const _closeForm = () => {
			//Remove text input from form
			document.querySelector('#address__url').value = '';

			//Remove current result
			_removeResults();

			//Close container
			DOM._formContainer.classList.add('hidden');
			DOM._pageContainer.classList.remove('inactive');
		};

		return {
			open: _openForm,
			close: _closeForm,
			init: function () {
				//Event: Open form
				DOM._openFormButton.addEventListener('click', _openForm);

				//Event: Close form
				DOM._closeFormButton.addEventListener('click', _closeForm);
			},
		};
	})();

	return {
		selector: DOM,
		bindEvents: _bindModalFormEvents,
		getBookData: _getBookData,
		displayResults: _displayData,
		load: _displayLoader,
		error: _displayError,
	};
})();

export { form as Form };
