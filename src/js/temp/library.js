//Module: Library UI
const library = (function () {
	'use strict';

	const DOM = {
		_libraryContainer: document.querySelector('#book_library'),
		_deleteButton: document.querySelectorAll('#card_remove_btn'),
		_confirmDelete: document.querySelectorAll('#confirm'),
		_readMoreButton: document.querySelectorAll('.more'),
	};

	const init = (storage, callback) => {
		//Event: Display
		document.addEventListener('DOMContentLoaded', () => {
			_displayListFromStorage(storage, callback);
			_bindLibraryEvents.init();
		});
	};

	/**
	 *
	 * @param {array} manga list array from localStorage
	 * @param {function} book.createLibraryItem()
	 */
	//Get manga from storage then display
	const _displayListFromStorage = (storage, callback) => {
		const mangaList = storage;

		//Unknown data structure
		mangaList.forEach((manga) => {
			addMangaToList(callback(manga));
		});
	};

	/**
	 *
	 * @param {function} that returns library item template literal
	 */
	//Add and display manga to list
	const addMangaToList = (data) => {
		const bookItemCard = document.createElement('div');

		bookItemCard.classList.add('book_card');
		bookItemCard.innerHTML = data;

		DOM._libraryContainer.append(bookItemCard);
	};

	/**
	 *
	 * @param {event} event
	 * @param {function} removeManga from storage callback
	 */
	const deleteMangaFromList = (event, callback) => {
		//Select .book_card element
		const parentElement =
			event.target.parentElement.parentElement.parentElement;

		DOM._libraryContainer.removeChild(parentElement);

		//Remove from storage
		const title = parentElement.querySelector('.manga-title > a').textContent;
		callback(title);
	};

	const _removePopUpToggle = (event) => {
		const confirmationPopUp = event.target.querySelector('.confirmation');

		if (confirmationPopUp) confirmationPopUp.classList.toggle('active');
	};

	const _expandCollapse = (event) => {
		//Select .book_card element
		const parentElement = e.target.parentElement.parentElement.parentElement;

		parentElement.classList.contains('expand')
			? parentElement.classList.remove('expand')
			: parentElement.classList.add('expand');
	};

	const _bindLibraryEvents = () => {
		function _bindDeleteButton() {
			//Event: Display remove card popup
			DOM._deleteButton.forEach((button) => {
				button.addEventListener('click', _removePopUpToggle);
			});
		}

		function _bindExpandButton() {
			//Event: Expand card
			DOM._readMoreButton.forEach((button) => {
				button.addEventListener('click', _expandCollapse);
			});
		}

		function _bindConfirmDelete(callback) {
			//Event: confirm deletion
			DOM._confirmDelete.forEach((button) => {
				button.addEventListener('click', (e) => {
					deleteMangaFromList(e, callback);
				});
			});
		}

		return {
			confirmDelete: _bindConfirmDelete,
			init() {
				_bindDeleteButton();
				_bindExpandButton();
			},
		};
	};

	return {
		init: init,
		bind: _bindLibraryEvents,
		add: addMangaToList,
		delete: deleteMangaFromList,
	};
})();

export { library as Library };
