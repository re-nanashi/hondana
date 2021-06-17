import { BookData } from '../shared/interfaces/book.interface';

//Create type[]
export const getMangaList = (): BookData[] => {
	//Get data from localStorage
	let mangaList: BookData[] =
		JSON.parse(localStorage.getItem('mangaList')) || [];

	//Default: sort alphabetical order
	//Create a type for Item
	mangaList.sort((firstItem: any, secondItem: any) => {
		return firstItem['title'].localCompare(secondItem['title']);
	});

	return mangaList;
};

//Create type for manga
export const storeManga = (manga: BookData): void => {
	const mangaList: BookData[] = getMangaList();
	mangaList.push(manga);

	localStorage.setItem('mangaList', JSON.stringify(mangaList));
};

export const removeMangaFromStorage = (title: string): void => {
	const mangaList: BookData[] = getMangaList();

	//Create type
	mangaList.forEach((manga: BookData, index: number) => {
		//Use trim to remove whitespace
		if (manga['title'].trim() === title.trim()) {
			mangaList.splice(index, 1);
		}
	});

	localStorage.setItem('mangaList', JSON.stringify(mangaList));
};
