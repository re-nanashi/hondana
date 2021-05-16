import { Book } from './form.js';

//Class: UI Library
class LibraryUI {
	static getListFromStorage() {}

	//Add and display manga to list
	static addMangaToList(dataObj) {
		let data = Book.getBookDetails(dataObj);
		let { source, link, title, latest, latestLink, status, description } = data;
	}
	static removeMangaFromList() {}
	static editManga() {}
}

export { LibraryUI };
