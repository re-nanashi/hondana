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

export type LibraryItem = string;

export type ResultsDataItem = string;
