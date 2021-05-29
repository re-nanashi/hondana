import { Storage } from './storage.js';

//Module: Library UI
const library = (function () {
	'use strict';

	const _libraryContainer = document.querySelector('#book_library');

	const init = (callback) => {
		//Event: Display
		document.addEventListener('DOMContentLoaded', () => {
			_displayListFromStorage(callback);
			_bindLibraryEvents.render();
		});
	};

	/**
	 *
	 * @param {array} manga list array from localStorage
	 * @param {function} book.createLibraryItem()
	 */
	//Get manga from storage then display
	const _displayListFromStorage = ({ createLibraryItem }) => {
		const mangaList = Storage.data();

		//Unknown data structure
		mangaList.forEach((manga) => {
			_addMangaToList(createLibraryItem(manga));
		});
	};

	/**
	 *
	 * @param {function} that returns library item template literal
	 */
	//Add and display manga to list
	const _addMangaToList = (data) => {
		const bookItemCard = document.createElement('div');

		bookItemCard.classList.add('book_card');
		bookItemCard.innerHTML = data;

		_libraryContainer.append(bookItemCard);
	};

	/**
	 *
	 * @param {event} event
	 * @param {function} removeManga from storage callback
	 */
	const _deleteMangaFromList = (e) => {
		//Select .book_card element
		const parentElement = e.target.parentElement.parentElement.parentElement;

		_libraryContainer.removeChild(parentElement);

		//Remove from storage
		const title = parentElement.querySelector('.manga-title > a').textContent;
		Storage.delete(title);
	};

	const _removePopUpToggle = (e) => {
		const confirmationPopUp = e.target.querySelector('.confirmation');

		if (confirmationPopUp) confirmationPopUp.classList.toggle('active');
	};

	const _expandCollapse = (e) => {
		//Select .book_card element
		const parentElement = e.target.parentElement.parentElement.parentElement;

		parentElement.classList.contains('expand')
			? parentElement.classList.remove('expand')
			: parentElement.classList.add('expand');
	};

	const _searchLibrary = () => {
		let input, filter, books, a, textValue;
		input = document.getElementById('searchInput');
		filter = input.value.toUpperCase();
		books = _libraryContainer.querySelectorAll('.book_card');

		for (let i = 0; i < books.length; i++) {
			a = books[i].querySelector('.manga-title > a');
			textValue = a.textContent || a.innerText;

			if (textValue.toUpperCase().indexOf(filter) > -1) {
				books[i].style.display = '';
			} else {
				books[i].style.display = 'none';
			}
		}
	};

	const _bindLibraryEvents = (function () {
		function render() {
			//Event: Search library
			const search = document.querySelector('#searchInput');

			search.addEventListener('keyup', _searchLibrary);

			//Event: Display remove card popup
			const deleteButton = document.querySelectorAll('#card_remove_btn');

			deleteButton.forEach((button) => {
				button.addEventListener('click', _removePopUpToggle);
			});

			//Event: Expand card
			const readMoreButton = document.querySelectorAll('.more');

			readMoreButton.forEach((button) => {
				button.addEventListener('click', _expandCollapse);
			});

			//Event: confirm deletion
			const confirmDelete = document.querySelectorAll('#confirm');

			confirmDelete.forEach((button) => {
				button.addEventListener('click', _deleteMangaFromList);
			});
		}

		return {
			render,
		};
	})();

	return {
		init: init,
		bind: _bindLibraryEvents.render,
		add: _addMangaToList,
		delete: _deleteMangaFromList,
	};
})();

export { library as Library };
