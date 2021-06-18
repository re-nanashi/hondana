import { Book, BookData } from '../shared/interfaces/book.interface';

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
