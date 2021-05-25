import { Book } from './form.js';
import { BookCardCreate } from './book_card.js';

//Class: UI Library
class LibraryUI {
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

	static getListFromStorage() {}

	//Add and display manga to list
	static addMangaToList(dataObj) {
		let data = Book.getBookDetails(dataObj);
		const card = new BookCardCreate(data);

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
	// //Add Confirmation delete pop up
	static removeCard(e) {
		//select .book_card element
		const parentElement = e.target.parentElement.parentElement.parentElement;
		const bookLibrary = document.querySelector('#book_library');

		bookLibrary.removeChild(parentElement);
	}
	// 	static editManga() {}

	static expandCollapse(e) {
		//select .book_card element
		const parentElement = e.target.parentElement.parentElement.parentElement;

		parentElement.classList.contains('expand')
			? parentElement.classList.remove('expand')
			: parentElement.classList.add('expand');
	}
}

export { LibraryUI };
