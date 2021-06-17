import { BookData } from '../shared/interfaces/book.interface';

//Create type[]
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

export const storeManga = (manga: BookData): void => {
	const mangaList: BookData[] = getMangaList();
	mangaList.push(manga);

	localStorage.setItem('mangaList', JSON.stringify(mangaList));
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
