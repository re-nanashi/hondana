//Module: Storage
const storage = (function () {
	const _getMangaList = () => {
		let mangaList;

		//Get localStorage
		mangaList = JSON.parse(localStorage.getItem('mangaList')) || [];

		//Default: sort alphabetical order
		mangaList.sort((firstItem, secondItem) => {
			return firstItem['title'].localeCompare(secondItem['title']);
		});

		return mangaList;
	};

	const _storeManga = (manga) => {
		const mangaList = _getMangaList();
		mangaList.push(manga);

		localStorage.setItem('mangaList', JSON.stringify(mangaList));
	};

	const _removeMangaFromStorage = (title) => {
		const mangaList = _getMangaList();

		mangaList.forEach((manga, index) => {
			//Remove whitespace
			if (manga['title'].trim() === title.trim()) {
				mangaList.splice(index, 1);
			}
		});

		localStorage.setItem('mangaList', JSON.stringify(mangaList));
	};

	return {
		data: _getMangaList,
		add: _storeManga,
		delete: _removeMangaFromStorage,
	};
})();

export { storage as Storage };
