export interface BookModel {
  key: string;
  title: string;
  description?: string | {value: string};
  covers: number[];
  subjects?: string[];
}
