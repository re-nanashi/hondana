import { LibraryImpl } from './library.interface';

export interface Form {
	bindFormEvents(T: LibraryImpl, X: any): void;
}
