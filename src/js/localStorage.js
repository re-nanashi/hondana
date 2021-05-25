//Module: Storage
const storage = (function () {
	return {
		getMangaList() {
			let mangaList;

			if (localStorage.getItem('mangaList') === null) {
				mangaList = [];
			} else {
				mangaList = JSON.parse(localStorage.getItem('mangaList'));
			}

			//Default: sort alphabetical order
			mangaList.sort((firstItem, secondItem) => {
				return firstItem['title'].localeCompare(secondItem['title']);
			});

			return mangaList;
		},

		storeManga(manga) {
			const mangaList = storage.getMangaList();
			mangaList.push(manga);

			localStorage.setItem('mangaList', JSON.stringify(mangaList));
		},

		removeMangaFromStorage(title) {
			const mangaList = storage.getMangaList();

			mangaList.forEach((manga, index) => {
				//Remove whitespace
				if (manga['title'].trim() === title.trim()) {
					mangaList.splice(index, 1);
				}
			});

			localStorage.setItem('mangaList', JSON.stringify(mangaList));
		},
	};
})();

export { storage as Storage };
