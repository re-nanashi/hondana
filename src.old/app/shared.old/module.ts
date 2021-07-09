export * from './interfaces/book.interface';
export * from './interfaces/library.interface';
export * from './types/book.type';
export * from './interfaces/form.interface';
export * from './interfaces/storage.interface';
export * from './interfaces/stats.interface';

//Shared reading status
export enum Status {
  Finished = 'FINISHED_READING',
  Currently = 'CURRENTLY_READING',
  Want = 'WANT_TO_READ',
}
