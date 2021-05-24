import { Book } from './form.js';
import { BookCardCreate } from './book_card.js';

//Class: UI Library
class LibraryUI {
	static render() {
		this.expandFunction();
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

	// 	static removeMangaFromList() {}
	// 	static editManga() {}

	static expandFunction() {
		const readMoreBtn = document.querySelectorAll('.more');

		readMoreBtn.forEach((button) => {
			button.addEventListener('click', this.expandCollapse);
		});
	}

	static expandCollapse(event) {
		const parentElement =
			event.target.parentElement.parentElement.parentElement;

		parentElement.classList.contains('expand')
			? parentElement.classList.remove('expand')
			: parentElement.classList.add('expand');
	}
}

export { LibraryUI };
