import { BookData, LibraryBookData } from '../shared/interfaces/book.interface';
import { Status } from '../shared/module';

export const getBookList = (): LibraryBookData[] => {
  //Get data from localStorage
  let bookList: LibraryBookData[] =
    JSON.parse(localStorage.getItem('bookList')) || [];

  //Default: sort alphabetical order
  bookList.sort((firstItem: LibraryBookData, secondItem: LibraryBookData) => {
    return firstItem['title'].localeCompare(secondItem['title']);
  });

  return bookList;
};

export const storeBook = (book: BookData, status: Status): void | null => {
  const bookList: LibraryBookData[] = getBookList();

  const libraryBookItem: LibraryBookData = {
    ...book,
    status,
  };

  //Check if book already exists w
  if (checkStore(bookList, libraryBookItem)) return null;

  bookList.push(libraryBookItem);

  localStorage.setItem('bookList', JSON.stringify(bookList));
};

//We are not
const checkStore = (
  list: LibraryBookData[],
  book: LibraryBookData
): boolean => {
  return list.some(
    (item: LibraryBookData) => item['selfLink'] === book['selfLink']
  );
};

export const removeBookFromStorage = (previewLink: string): void => {
  const bookList: LibraryBookData[] = getBookList();

  bookList.forEach((book: LibraryBookData, index: number) => {
    //Use trim to remove whitespace
    if (book['previewLink'].trim() === previewLink.trim()) {
      bookList.splice(index, 1);
    }
  });

  localStorage.setItem('bookList', JSON.stringify(bookList));
};

//updateBookList is when user edits status
export function updateBookList(
  list: LibraryBookData[],
  newUpdates: Partial<LibraryBookData>[]
): void {
  // //Search for the key in list that has the same title in newUpdates
  // //change the list then update storage
  // newUpdates.forEach((book: Partial<LibraryBookData>) => {
  //   let key = list.findIndex((item: any) => {
  //     return item['title'] === book['title'];
  //   });
  //   list[key]['latest'] = book['latest'];
  //   list[key]['latestLink'] = book['latestLink'];
  //   list[key]['status'] = book['status'];
  // });
  // localStorage.setItem('bookList', JSON.stringify(list));
}
