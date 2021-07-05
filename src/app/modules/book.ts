import {
    Book,
    BookData,
    BookFetchDataItem,
    ResultsDataItem,
} from '../shared/module';

//TODO book interface class
export default class BookCard implements Book {
    private bookData: BookFetchDataItem;

    constructor(bookData?: BookFetchDataItem) {
        this.bookData = bookData;
    }

    public getBookDetails = (
        data: BookFetchDataItem = this.bookData
    ): BookData => {
        const volumeInfo = data['volumeInfo'];
        const accessInfo = data['accessInfo'];

        let dataObject = {
            selfLink: data.selfLink,
            title: volumeInfo['title'],
            authors: volumeInfo['authors'],
            publisher: volumeInfo['publisher'],
            publishedDate: volumeInfo['publishedDate'],
            description: volumeInfo['description'],
            isbn: volumeInfo['industryIdentifiers'],
            categories: volumeInfo['categories'],
            pageCount: volumeInfo['pageCount'],
            image: volumeInfo.imageLinks?.['thumbnail'],
            infoLink: volumeInfo['infoLink'],
            webReaderLink: accessInfo['webReaderLink'],
        };

        //Filter undefined values from dataObject
        Object.keys(dataObject).forEach((property: keyof BookData) => {
            if (dataObject[property] === undefined)
                (<any>dataObject)[property] = '該当なし';
        });

        return dataObject as BookData;
    };

    /**
     *
     * @param data
     * @returns {string} HTML template literal
     */
    public createResultsDataItem = (
        data: BookData = this.getBookDetails()
    ): ResultsDataItem => {
        let { title, image, authors, isbn, pageCount } = data;
        const imageClass =
            image !== '該当なし' ? 'cover-image' : 'no-cover-image';
        const isbnString = isbn.map((item) => {
            if (item['type'].includes('ISBN')) return item['identifier'];

            return `他, ${item['identifier']}`;
        });

        //Base img src according to imageClass
        let resultsHTML = `
                <div class=${imageClass}>
                    <img src='${
                        imageClass === 'cover-image' ? image : ''
                    }' alt="book_cover" height="100px">
                </div>
                <div class="details">
                    <div class="title">
                        ${title}
                    </div>
                    <div class="authors">
                        作者名:
                        <i>${authors}</i>
                    </div>
                    <div class="ISBN">
                        ISBN:
                        <i>${isbnString}</i>
                    </div>
                    <div class="pageCount">
                        ページ数:
                    <i>${pageCount}</i>
                </div>
            `;

        return resultsHTML;
    };
}

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
