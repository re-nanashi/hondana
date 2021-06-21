import { SearchForm } from '../form';
import * as Storage from '../../store/store';

class UpdateCard {}

function checkForUpdates() {
	const mangaList = Storage.getMangaList();
}

/**
 * 1. Get list of all manga
 * 2. Fetch all through manga[link]
 * 3. Get latestLink then compare to old links from 1st step
 * 4. If there is a new link create an 'update card' then update mangaList in Storage
 * 4.5. Create a new function on storage that stores manga cards that hasnt been read
 * 5. If a manga has no update, do nothing
 * 6. If all manga has no update throw new Message(No updates currently) to updates bar
 */

/**
 * Instructions on update card function
 * 1. make a function that creates an update card from template class that appends to side bar then add circle
 * 2. add the image cover, new chapter(with latestLink) and title
 * 3. If user has that manga already in updates bar, change the new Chapter text only then add a circle
 *
 */
