import { ChapterImage } from '@/types/chapterimage';

interface Comic {
  title: string;
  slug: string;
  serialization: string;
  rating: string;
  status: string;
  updated_at: string;
  link: string;
  numchapters: number;
  numimages: number;
  description: string;
}

export interface Chapter {
  link: string;
  updated_at: string;
  comic: Comic;
  name: string;
  slug: string;
  title?: string;
  images?: ChapterImage[];
}
