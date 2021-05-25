//Class: Storage
export class Storage {
	static getMangaList() {
		let mangaList;

		if (localStorage.getItem('mangaList') === null) {
			mangaList = [];
		} else {
			mangaList = JSON.parse(localStorage.getItem('mangaList'));
		}
		//Default: Sort alphabetical order
		mangaList.sort((firstItem, secondItem) => {
			return firstItem['title'].localeCompare(secondItem['title']);
		});

		return mangaList;
	}

	static storeManga(manga) {
		const mangaList = Storage.getMangaList();
		mangaList.push(manga);

		localStorage.setItem('mangaList', JSON.stringify(mangaList));
	}

	static removeMangaFromStorage(title) {
		const mangaList = Storage.getMangaList();

		mangaList.forEach((manga, index) => {
			if (manga.title === title) {
				mangaList.splice(index, 1);
			}
		});

		localStorage.setItem('mangaList', JSON.stringify(mangaList));
	}
}
