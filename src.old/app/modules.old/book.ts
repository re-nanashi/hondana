import {
  Book,
  BookData,
  BookFetchDataItem,
  LibraryItem,
  ResultsDataItem,
  Status,
} from '../shared/module';

export default class BookCard implements Book {
  private bookData: BookFetchDataItem;

  constructor(bookData?: BookFetchDataItem) {
    this.bookData = bookData;
  }

  /**
   *
   * @param data
   * @returns
   */
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
      previewLink: volumeInfo['previewLink'],
      webReaderLink: accessInfo['webReaderLink'],
    };

    //Filter undefined values from dataObject
    Object.keys(dataObject).forEach((property: keyof BookData) => {
      if (dataObject[property] === undefined)
        (<any>dataObject)[property] = '該当なし';
    });

    return dataObject as BookData;
  };

  private getISBNString = (isbn: keyof BookData | any) => {
    if (isbn === '該当なし') return isbn;

    return isbn.map((item: any) => {
      if (item['type'].includes('ISBN')) return item['identifier'];

      return `他, ${item['identifier']}`;
    });
  };

  /**
   *
   * @param data
   * @returns {string} HTML template literal
   */
  public createResultsDataItem = (
    data: BookData = this.getBookDetails()
  ): ResultsDataItem => {
    let { selfLink, title, image, authors, isbn } = data;

    const imageClass = image !== '該当なし' ? 'cover-image' : 'no-cover-image';

    title.length > 30 ? (title = `${title.slice(0, 19)}...`) : true;

    //Base img src according to imageClass
    let resultsHTML = `
                <div class=${imageClass}>
                    <img src='${
                      imageClass === 'cover-image'
                        ? image
                        : 'https://books.google.com.ph/googlebooks/images/no_cover_thumb.gif'
                    }' alt="book_cover" height="100px">
                </div>
                <div class="details">
                    <div data-link="${selfLink}" class="title">
                        ${title}
                    </div>
                    <div class="authors">
                        著者:
                        <i>${authors}</i>
                    </div>
                    <div class="ISBN">
                        ISBN:
                        <i>${this.getISBNString(isbn)}</i>
                    </div>
                </div>
            `;

    return resultsHTML;
  };

  //First create a template for library card.
  public createLibraryItem = (
    status: Status,
    data: BookData = this.getBookDetails()
  ): LibraryItem => {
    let {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      isbn,
      categories,
      pageCount,
      image,
      previewLink,
      webReaderLink,
    } = data;
    const thumbnailAvailable = image !== '該当なし' ? true : false;

    let statusString: '読んでる' | '読んだ' | '読みたい';

    switch (status) {
      case Status.Finished:
        statusString = '読んだ';
        break;
      case Status.Currently:
        statusString = '読んでる';
        break;
      default:
        statusString = '読みたい';
        break;
    }

    let cardHTML = `
        <button id="card_remove_btn">&#x2715
            <span class="confirmation">
                削除しますか？<br>
                <a href="#" id="confirm">はい</a>
            </span>
        </button>
        <div class="book-cover-cont">
            <img
                src=${
                  thumbnailAvailable === true
                    ? image
                    : 'https://books.google.com.ph/googlebooks/images/no_cover_thumb.gif'
                }
                alt="image-cover"
                height="150px"
                width="112px"
            />
            <a
                href=${webReaderLink}
                class="read_now_button"
                target="_blank"
                rel="noopener noreferrer"
                >今すぐ読む</a
            >
        </div>
        <div class="book-details">
            <div class="book-title">
                <a
                    href=${previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    >${title}
                </a>
            </div>
            <table class="text-info">
                <tbody>
                    <tr>
                        <td class="table-label book-author">著者:</td>
                        <td class="table-value"><i>${authors}</i></td>
                    </tr>
                    <tr>
                        <td class="table-label">出版社:</td>
                        <td class="table-value book-source">
                            <i>${publisher}, ${publishedDate.split('-')[0]}</i>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-label book-isbn">ISBN:</td>
                        <td class="table-value"><i>${this.getISBNString(
                          isbn
                        )}</i></td>
                    </tr>
                    <tr>
                        <td class="table-label book-pageCount">ページ数:</td>
                        <td class="table-value"><i>${pageCount}</i></td>
                    </tr>
                    <tr>
                        <td class="table-label book-category">カテゴリー:</td>
                        <td class="table-value"><i>${categories}</i></td>
                    </tr>
                    <tr>
                        <td class="table-label book-status">ステータス:</td>
                        <td class="table-value"><i>${statusString}</i></td>
                    </tr>
                    
                </tbody>
            </table>
            <div class="description">${description}</div>
            <div class="more_btn_cont">
                <button class="more">もっと見る</button>
            </div>
        </div>
    `;

    return cardHTML;
  };
}
