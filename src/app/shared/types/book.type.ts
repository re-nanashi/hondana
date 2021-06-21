export type BookFetchData = {
	[source: string]: {
		link: string;
		title: string;
		image: string;
		latest: string;
		latestLink: string;
		author: string;
		status: string;
		description: string;
	};
};

export type SpecificBookDetail =
	| 'link'
	| 'title'
	| 'image'
	| 'latest'
	| 'latestLink'
	| 'author'
	| 'status'
	| 'description';

export type LibraryItem = string;

export type ResultsDataItem = string;
