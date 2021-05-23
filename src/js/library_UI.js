import { Book } from './form.js';

//Class: UI Library
class LibraryUI {
	static render() {
		this.moreFunction();
	}

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

		//Save images that has token
		let coverBase64;
		this.toDataURL(image, (dataURL) => {
			coverBase64 = dataURL;
			console.log(dataURL);
		});

		const libraryContainer = document.querySelector('#book_library');
		const bookCard = document.createElement('div');
		bookCard.classList.add('book_card');

		bookCard.innerHTML = `
			<div class="manga-cover-cont">
				<img
					src=${coverBase64}
					alt="image-cover"
					height="150px"
					width="112px"
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
				<div class="manga-title">
					<a
						href=${link}
						target="_blank"
						rel="noopener noreferrer"
						>${title}
					</a>	
				</div>
				<table class="text-info">
					<tbody>
						<tr>
							<td class="table-label">Source:</td>
							<td class="table-value manga-source">
								<i>${source}</i>
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
				<div class="description">${description}</div>
				<div class="more_btn_cont">
					<button class="more">もっと見る</button>
				</div>
			</div>
		`;

		libraryContainer.append(bookCard);
	}

	static toDataURL(src, callback) {
		let img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');
			let dataURL;
			canvas.height = this.naturalHeight;
			canvas.width = this.naturalWidth;
			ctx.drawImage(this, 0, 0);
			dataURL = canvas.toDataURL('image/jpeg');
			callback(dataURL);
		};
		img.src = src;
	}
	// 	static removeMangaFromList() {}
	// 	static editManga() {}

	static moreFunction() {
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
