import { createBookCard } from './book_card.js';
import { Storage } from './localStorage.js';

//Module: Library UI
const libraryUI = (function () {
	return {
		init() {
			//Event: Display
			document.addEventListener('DOMContentLoaded', () => {
				this.displayListFromStorage();
				this.renderEvents();
			});
		},

		renderEvents() {
			//Event: Open remove card popup
			const deleteButton = document.querySelectorAll('#card_remove_btn');

			deleteButton.forEach((button) => {
				button.addEventListener('click', this.removePopUpToggle);
			});

			//Event: Confirm remove/delete
			const confirmDelete = document.querySelectorAll('#confirm');

			confirmDelete.forEach((button) => {
				button.addEventListener('click', this.deleteCard);
			});

			//Event: Expand card
			const readMoreBtn = document.querySelectorAll('.more');

			readMoreBtn.forEach((button) => {
				button.addEventListener('click', this.expandCollapse);
			});
		},

		//Get manga from storage then display
		displayListFromStorage() {
			const mangaList = Storage.getMangaList();

			mangaList.forEach((manga) => {
				this.addMangaToList(manga);
			});
		},

		//Add and Display manga to list
		addMangaToList(dataObj) {
			const card = createBookCard(dataObj);

			const libraryContainer = document.querySelector('#book_library');
			const bookItemCard = document.createElement('div');

			bookItemCard.classList.add('book_card');
			bookItemCard.innerHTML = card.newCard();

			libraryContainer.append(bookItemCard);
		},

		//Display popup toggle
		removePopUpToggle(e) {
			const confirmationPopUp = e.target.querySelector('.confirmation');

			if (confirmationPopUp) confirmationPopUp.classList.toggle('active');
		},

		deleteCard(e) {
			//Select .book_card element
			const parentElement = e.target.parentElement.parentElement.parentElement;
			const bookLibrary = document.querySelector('#book_library');

			bookLibrary.removeChild(parentElement);

			//Remove from storage
			const title = parentElement.querySelector('.manga-title > a').textContent;
			Storage.removeMangaFromStorage(title);
		},

		expandCollapse(e) {
			//Select .book_card element
			const parentElement = e.target.parentElement.parentElement.parentElement;

			parentElement.classList.contains('expand')
				? parentElement.classList.remove('expand')
				: parentElement.classList.add('expand');
		},
	};
})();

export { libraryUI as UI };
