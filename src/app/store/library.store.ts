import { BookData } from '../shared/interfaces/book.interface';

export const getMangaList = (): BookData[] => {
	//Get data from localStorage
	let mangaList: BookData[] =
		JSON.parse(localStorage.getItem('mangaList')) || [];

	//Default: sort alphabetical order
	mangaList.sort((firstItem: BookData, secondItem: BookData) => {
		return firstItem['title'].localeCompare(secondItem['title']);
	});

	return mangaList;
};

export const storeManga = (manga: BookData): void | null => {
	const mangaList: BookData[] = getMangaList();

	//Check if manga already exists
	if (checkStore(mangaList, manga)) return null;

	mangaList.push(manga);

	localStorage.setItem('mangaList', JSON.stringify(mangaList));
};

const checkStore = (list: BookData[], manga: BookData): boolean => {
	return list.some((item: BookData) => item['title'] === manga['title']);
};

export const removeMangaFromStorage = (title: string): void => {
	const mangaList: BookData[] = getMangaList();

	mangaList.forEach((manga: BookData, index: number) => {
		//Use trim to remove whitespace
		if (manga['title'].trim() === title.trim()) {
			mangaList.splice(index, 1);
		}
	});

	localStorage.setItem('mangaList', JSON.stringify(mangaList));
};

export function updateMangaList(
	list: BookData[],
	newUpdates: Partial<BookData>[]
): void {
	//Search for the key in list that has the same title in newUpdates
	//change the list then update storage
	newUpdates.forEach((manga: Partial<BookData>) => {
		let key = list.findIndex((item: BookData) => {
			return item['title'] === manga['title'];
		});

		list[key]['latest'] = manga['latest'];
		list[key]['latestLink'] = manga['latestLink'];
		list[key]['status'] = manga['status'];
	});

	localStorage.setItem('mangaList', JSON.stringify(list));
}
