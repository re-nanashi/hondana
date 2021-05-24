import { Book } from './form.js';
import { BookCardCreate } from './book_card.js';

//Class: UI Library
class LibraryUI {
	static render() {
		this.expandFunction();
		this.removeMangaFromList();
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

	static removeMangaFromList() {
		const removeButton = document.querySelectorAll('#card_remove_btn');

		removeButton.forEach((button) => {
			button.addEventListener('click', removeCard);
		});

		function removeCard(e) {
			const bookLibrary = document.querySelector('#book_library');
			//select .book_card element
			const parentElement = e.target.parentElement;

			bookLibrary.removeChild(parentElement);
		}
	}
	// 	static editManga() {}

	static expandFunction() {
		const readMoreBtn = document.querySelectorAll('.more');

		readMoreBtn.forEach((button) => {
			button.addEventListener('click', expandCollapse);
		});

		function expandCollapse(e) {
			//select .book_card element
			const parentElement = e.target.parentElement.parentElement.parentElement;

			parentElement.classList.contains('expand')
				? parentElement.classList.remove('expand')
				: parentElement.classList.add('expand');
		}
	}
}

export { LibraryUI };
