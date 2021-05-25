import { BookCardCreate } from './book_card.js';
import { Storage } from './localStorage.js';

//Class: UI Library
class LibraryUI {
	static on() {
		//Event: Display
		document.addEventListener('DOMContentLoaded', () => {
			LibraryUI.displayListFromStorage();
			this.render();
		});
	}

	static render() {
		//Event: Open remove card popup
		const removeButton = document.querySelectorAll('#card_remove_btn');

		removeButton.forEach((button) => {
			button.addEventListener('click', LibraryUI.removePopUpToggle);
		});

		//Event: Confirm remove
		const confirmRemove = document.querySelectorAll('#confirm');

		confirmRemove.forEach((button) => {
			button.addEventListener('click', LibraryUI.removeCard);
		});

		//Event: Expand card
		const readMoreBtn = document.querySelectorAll('.more');

		readMoreBtn.forEach((button) => {
			button.addEventListener('click', LibraryUI.expandCollapse);
		});
	}

	static displayListFromStorage() {
		const mangaList = Storage.getMangaList();

		mangaList.forEach((manga) => {
			LibraryUI.addMangaToList(manga);
		});
	}

	//Add and display manga to list
	static addMangaToList(dataObj) {
		const card = new BookCardCreate(dataObj);

		const libraryContainer = document.querySelector('#book_library');
		const bookCard = document.createElement('div');

		bookCard.classList.add('book_card');
		bookCard.innerHTML = card.createNewCard();

		libraryContainer.append(bookCard);
	}

	static removePopUpToggle(e) {
		const confirmationPopUp = e.target.querySelector('.confirmation');

		if (confirmationPopUp) confirmationPopUp.classList.toggle('active');
	}

	static removeCard(e) {
		//select .book_card element
		const parentElement = e.target.parentElement.parentElement.parentElement;
		const bookLibrary = document.querySelector('#book_library');

		bookLibrary.removeChild(parentElement);

		//Remove from storage
		const title = parentElement.querySelector('.manga-title > a').textContent;

		Storage.removeMangaFromStorage(title);
	}
	// 	static editManga() {}

	static expandCollapse(e) {
		console.log(e.target);
		//select .book_card element
		const parentElement = e.target.parentElement.parentElement.parentElement;

		parentElement.classList.contains('expand')
			? parentElement.classList.remove('expand')
			: parentElement.classList.add('expand');
	}
}

export { LibraryUI };
