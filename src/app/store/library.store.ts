// import { BookData } from '../shared/interfaces/book.interface';

export const getMangaList = (): any[] => {
    //Get data from localStorage
    let mangaList: any[] = JSON.parse(localStorage.getItem('mangaList')) || [];

    //Default: sort alphabetical order
    mangaList.sort((firstItem: any, secondItem: any) => {
        return firstItem['title'].localeCompare(secondItem['title']);
    });

    return mangaList;
};

export const storeManga = (manga: any): void | null => {
    const mangaList: any[] = getMangaList();

    //Check if manga already exists
    if (checkStore(mangaList, manga)) return null;

    mangaList.push(manga);

    localStorage.setItem('mangaList', JSON.stringify(mangaList));
};

const checkStore = (list: any[], manga: any): boolean => {
    return list.some((item: any) => item['title'] === manga['title']);
};

export const removeMangaFromStorage = (title: string): void => {
    const mangaList: any[] = getMangaList();

    mangaList.forEach((manga: any, index: number) => {
        //Use trim to remove whitespace
        if (manga['title'].trim() === title.trim()) {
            mangaList.splice(index, 1);
        }
    });

    localStorage.setItem('mangaList', JSON.stringify(mangaList));
};

export function updateMangaList(list: any[], newUpdates: Partial<any>[]): void {
    //Search for the key in list that has the same title in newUpdates
    //change the list then update storage
    newUpdates.forEach((manga: Partial<any>) => {
        let key = list.findIndex((item: any) => {
            return item['title'] === manga['title'];
        });

        list[key]['latest'] = manga['latest'];
        list[key]['latestLink'] = manga['latestLink'];
        list[key]['status'] = manga['status'];
    });

    localStorage.setItem('mangaList', JSON.stringify(list));
}
