import {
  bookmarkItemSchema,
  insertBookmarkSchema,
  insertChapterSchema,
  insertComicSchema,
  signUpFormSchema,
} from '@/lib/validators';
import { z } from 'zod';

export type Comic = z.infer<typeof insertComicSchema> & {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Chapter = z.infer<typeof insertChapterSchema> & {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type User = z.infer<typeof signUpFormSchema> & {
  id?: string;
};

export type Bookmark = z.infer<typeof insertBookmarkSchema>;
export type BookmarkItem = z.infer<typeof bookmarkItemSchema>;
