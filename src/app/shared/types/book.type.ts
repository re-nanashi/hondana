export type BookFetchData = {
	[items: string]: BookFetchDataItem[];
};

export type BookFetchDataItem = {
	kind: string;
	id: string;
	etag: string;
	selfLink: string;
	volumeInfo: { [key: string]: any };
	saleInfo: { [key: string]: any };
	accessInfo: { [key: string]: any };
	searchInfo: { [key: string]: any };
};

export type LibraryItem = string;

export type ResultsDataItem = string;
