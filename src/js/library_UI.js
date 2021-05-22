import { Book } from './form.js';

//Class: UI Library
class LibraryUI {
	static getListFromStorage() {}

	//Add and display manga to list
	static addMangaToList(dataObj) {
		let data = Book.getBookDetails(dataObj);
		let {
			source,
			link,
			title,
			image,
			latest,
			latestLink,
			author,
			status,
			description,
		} = data;

		const libraryContainer = document.querySelector('#book_library');
		const bookCard = document.createElement('div');
		bookCard.classList.add('book_card');

		bookCard.innerHTML = `
			<div class="manga-cover-cont">
				<img
					src=${image}
					alt="image-cover"
					height="220px"
					width="163px"
				/>
				<a
					href=${latestLink}
					class="read_now_button"
					target="_blank"
					rel="noopener noreferrer"
					>今すぐ読む</a
				>
			</div>
			<div class="manga-details">
				<div class="manga-title">${title}</div>
				<table class="text-info">
					<tbody>
						<tr>
							<td class="table-label">Source:</td>
							<td class="table-value manga-source">
								<a
									href=${link}
									target="_blank"
									rel="noopener noreferrer"
									>${source}
								</a>
							</td>
						</tr>
						<tr>
							<td class="table-label manga-author">Author(s):</td>
							<td class="table-value"><i>${author}</i></td>
						</tr>
						<tr>
							<td class="table-label manga-status">Status:</td>
							<td class="table-value"><i>${status}</i></td>
						</tr>
						<tr>
							<td class="table-label manga-latest">Latest:</td>
							<td class="table-value"><i>${latest}</i></td>
						</tr>
						<tr></tr>
					</tbody>
				</table>
			</div>
		`;

		libraryContainer.append(bookCard);
	}
	static removeMangaFromList() {}
	static editManga() {}
}

export { LibraryUI };
