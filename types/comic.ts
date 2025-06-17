import { Artist } from '@/types/artist';
import { Author } from '@/types/author';
import { Category } from '@/types/category';
import { ComicImage } from '@/types/comicimage';
import { Genre } from '@/types/genre';

export interface Comic {
  title: string;
  slug: string;
  description: string;
  rating: string;
  status: string;

  updated_at: string;
  link: string;
  serialization: string;
  numchapters: number;
  numimages: number;

  has_images: boolean;
  has_chapters: boolean;
  images: ComicImage[];
  author: Author;
  artist: Artist;

  category: Category;
  genres?: Genre[];
}
