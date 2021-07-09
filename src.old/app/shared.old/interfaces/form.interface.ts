import { LibraryImpl } from './library.interface';
import { Store } from './storage.interface';

export interface Form {
	bindFormEvents(arg1: LibraryImpl, arg2: Store, arg3: any): void;
}
