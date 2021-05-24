/**
 * Class: create new book card
 * @param {object} dataObject from JSON
 */
export class BookCardCreate {
	constructor(data) {
		this.data = data;
	}

	/**
	 *
	 * @param {object} dataObj from this.data
	 * @returns {string} html template literal
	 */
	createNewCard(dataObj = this.data) {
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
		} = dataObj;

		let cardHTML = `
            <div class="manga-cover-cont">
                <img
                    src=${image}
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

		return cardHTML;
	}
}
