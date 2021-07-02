import BookCard from '../book';
import { SearchForm } from '../form';
import * as Storage from '../../store/library.store';
import { BookData, BookFetchData } from '../../shared/module';
import './updates.css';

class UpdateCardCreator {
	private _data: Partial<BookData>;

	constructor(data: Partial<BookData>) {
		this._data = data;
	}

	createCardTemplate = (): string => {
		let { title, image, latest, latestLink } = this._data;
		let base64Image = 'data:image/png;base64,' + image;

		let cardHTML = `
			<div class="img_cont">
				<img src="${base64Image}" height="80px">
			</div>
			<div class="update_details">
				<p>${title}</p>
				<a href="${latestLink}">${latest}</a>
			</div>
		`;

		return cardHTML;
	};
}

function appendUpdate(newUpdates: Partial<BookData>[]): void {
	const updatesContainer: HTMLElement =
		document.querySelector('#updates_container');

	//Remove no new updates message if any
	removeNoNewUpdateMsg(updatesContainer);

	//Appends new updates to container node
	newUpdates.forEach((manga: Partial<BookData>) => {
		let card = new UpdateCardCreator(manga);

		let updateCardDiv: HTMLDivElement = document.createElement('div');
		updateCardDiv.classList.add('update_card');
		updateCardDiv.innerHTML = card.createCardTemplate();

		updatesContainer.append(updateCardDiv);
	});
}

function removeUpdate(e: Event): void {
	const updateCardDiv = (<HTMLElement>e.target).parentElement.parentElement;

	const updatesContainer: HTMLElement =
		document.querySelector('#updates_container');

	updatesContainer.removeChild(updateCardDiv);
}

function throwNoNewUpdateMsg(): void {
	const updatesContainer: HTMLElement =
		document.querySelector('#updates_container');

	const noUpdateMsgDiv: HTMLDivElement = document.createElement('div');
	noUpdateMsgDiv.id = 'no-update';
	noUpdateMsgDiv.textContent = '更新はありません。';

	updatesContainer.append(noUpdateMsgDiv);
}

function removeNoNewUpdateMsg(container: HTMLElement): void {
	//Remove no updates message
	const noUpdateMsgDiv: HTMLDivElement = document.querySelector('#no-update');
	if (container.contains(noUpdateMsgDiv)) container.removeChild(noUpdateMsgDiv);
}

function bindUpdateEvents(): void {
	//Event: remove card when visited/click
	const latestLink: NodeListOf<HTMLElement> = document.querySelectorAll(
		'.update_details > a'
	);

	latestLink.forEach((link: HTMLElement): void => {
		link.addEventListener('click', removeUpdate);
	});
}

export async function checkForUpdates(): Promise<void> {
	const mangaList: BookData[] = Storage.getMangaList();

	try {
		//Call fetch on every manga on list
		let newUpdates: Partial<BookData>[] = (
			await Promise.all(
				mangaList.map(async (manga: BookData): Promise<Partial<BookData>> => {
					let mangaLink = manga['link'];
					let data: BookFetchData = await SearchForm.getBookData(mangaLink);
					let newData: Partial<BookData> = BookCard.getSpecificDetail(data, [
						'title',
						'image',
						'latest',
						'latestLink',
						'status',
					]);

					//Check if there are updates by comparing new fetch data from old
					return manga['latestLink'] !== newData['latestLink'] ? newData : null;
				})
			)
		)
			//Filters falsy values in the array
			.filter(Boolean);

		//Check if there are new updates on array
		if (newUpdates.length !== 0) {
			Storage.updateMangaList(mangaList, newUpdates);
			appendUpdate(newUpdates);

			//Bind events on new elements
			bindUpdateEvents();
		} else {
			throwNoNewUpdateMsg();
		}
	} catch (err) {
		throw new Error(err);
	}
}
