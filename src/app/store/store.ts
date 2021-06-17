import { IBookDetails } from '../shared/interfaces/book.interface';

//Create type[]
export const _getMangaList = (): IBookDetails[] => {
	//Get data from localStorage
	let mangaList: IBookDetails[] =
		JSON.parse(localStorage.getItem('mangaList')) || [];

	//Default: sort alphabetical order
	//Create a type for Item
	mangaList.sort((firstItem: any, secondItem: any) => {
		return firstItem['title'].localCompare(secondItem['title']);
	});

	return mangaList;
};

//Create type for manga
export const _storeManga = (manga: IBookDetails): void => {
	const mangaList: IBookDetails[] = _getMangaList();
	mangaList.push(manga);

	localStorage.setItem('mangaList', JSON.stringify(mangaList));
};

export const _removeMangaFromStorage = (title: string): void => {
	const mangaList: IBookDetails[] = _getMangaList();

	//Create type
	mangaList.forEach((manga: IBookDetails, index: number) => {
		//Use trim to remove whitespace
		if (manga['title'].trim() === title.trim()) {
			mangaList.splice(index, 1);
		}
	});

	localStorage.setItem('mangaList', JSON.stringify(mangaList));
};
