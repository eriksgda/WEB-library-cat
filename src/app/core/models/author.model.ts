export interface AuthorModel {
  key: string;
  name: string;
  personal_name?: string;
  birth_date?: string;
  bio: string | { value: string };
  photos: number[];
}
