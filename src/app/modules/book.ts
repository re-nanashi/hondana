import {
	Book,
	BookData,
	BookFetchData,
	BookFetchDataItem,
} from '../shared/module';

//TODO book interface class
export default class BookCard {
	private bookData: BookFetchDataItem;

	constructor(bookData?: BookFetchDataItem) {
		this.bookData = bookData;
	}

	getBookDetails = (data: BookFetchDataItem = this.bookData): BookData => {
		const volumeInfo = data['volumeInfo'];
		const accessInfo = data['accessInfo'];

		return {
			title: volumeInfo['title'],
			authors: volumeInfo['authors'],
			publisher: volumeInfo['publisher'],
			publishedDate: volumeInfo['publishedDate'],
			description: volumeInfo['description'],
			ISBN: volumeInfo['industryIdentifiers'],
			categories: volumeInfo['categories'],
			pageCount: volumeInfo['pageCount'],
			image: volumeInfo.imageLinks?.['thumbnail'] || 'no image',
			infoLink: volumeInfo['infoLink'],
			webReaderLink: accessInfo['webReaderLink'],
		};
	};

	// createLibraryItem = (data: BookData = this.getBookDetails()): string => {
	// 	let {
	// 		source,
	// 		link,
	// 		title,
	// 		image,
	// 		latest,
	// 		latestLink,
	// 		author,
	// 		status,
	// 		description,
	// 	} = data;

	// 	let base64Image = 'data:image/png;base64,' + image;

	// 	let cardHTML = `
	//         <button id="card_remove_btn">&#x2715
	//             <span class="confirmation">
	//                 削除しますか？<br>
	//                 <a href="#" id="confirm">はい</a>
	//             </span>
	//         </button>
	//         <div class="manga-cover-cont">
	//             <img
	//                 src=${base64Image}
	//                 alt="image-cover"
	//                 height="150px"
	//                 width="112px"
	//             />
	//             <a
	//                 href=${latestLink}
	//                 class="read_now_button"
	//                 target="_blank"
	//                 rel="noopener noreferrer"
	//                 >今すぐ読む</a
	//             >
	//         </div>
	//         <div class="manga-details">
	//             <div class="manga-title">
	//                 <a
	//                     href=${link}
	//                     target="_blank"
	//                     rel="noopener noreferrer"
	//                     >${title}
	//                 </a>
	//             </div>
	//             <table class="text-info">
	//                 <tbody>
	//                     <tr>
	//                         <td class="table-label">ソース:</td>
	//                         <td class="table-value manga-source">
	//                             <i>${source}</i>
	//                         </td>
	//                     </tr>
	//                     <tr>
	//                         <td class="table-label manga-author">作者名:</td>
	//                         <td class="table-value"><i>${author}</i></td>
	//                     </tr>
	//                     <tr>
	//                         <td class="table-label manga-status">ステータス:</td>
	//                         <td class="table-value"><i>${status}</i></td>
	//                     </tr>
	//                     <tr>
	//                         <td class="table-label manga-latest">最新話:</td>
	//                         <td class="table-value"><i>${latest}</i></td>
	//                     </tr>
	//                 </tbody>
	//             </table>
	//             <div class="description">${description}</div>
	//             <div class="more_btn_cont">
	//                 <button class="more">もっと見る</button>
	//             </div>
	//         </div>
	//     `;

	// 	return cardHTML;
	// };

	createResultsDataItem = (data: BookData = this.getBookDetails()): string => {
		let { title, image, authors, categories } = data;

		let resultsHTML = `
                <div class="cover-image">
                    <img src=${image} alt="book_cover" height="140px">
                </div>
                <div class="details">
                    <div class="title">
                        ${title}
                    </div>
                    <div class="authors">
                        作者名:
                        <i>${authors}</i>
                    </div>
                    <div class="category">
                        カテゴリー:
                        <i>${categories}</i>
                    </div>
                </div>
            `;

		return resultsHTML;
	};
}
