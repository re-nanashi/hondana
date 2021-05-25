//Class: Storage
export class Storage {
	static getMangaList() {
		let mangaList;

		if (localStorage.getItem('mangaList') === null) {
			mangaList = [];
		} else {
			mangaList = JSON.parse(localStorage.getItem('mangaList'));
		}

		return mangaList;
	}

	//Filter by name
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
