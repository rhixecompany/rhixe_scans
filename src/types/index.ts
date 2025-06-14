import {
  insertChapterSchema,
  insertComicSchema,
  insertUserSchema
} from "@/lib/validators"
import { z } from "zod"

interface Image {
  id: string
  link: string
  image: string
  status: string
  checksum: string
  comic: ComicObject
}

interface ComicObject {
  title: string
  slug: string
  description: string
  rating: string
  numchapters: number
  numimages: number
  updated_at: string
  serialization: string
  status: string
  link: string
}

interface ChapterModel {
  name: string
  title: string
  slug: string
  link: string
  numimages: number
  updated_at: string
  comic: ComicObject
}

interface Category {
  name: string
  id: string
}
export type Comic = z.infer<typeof insertComicSchema> & {
  id: string
  chapters: ChapterModel[]
  first_chapter: ChapterModel
  last_chapter: ChapterModel
  author: Category
  artist: Category
  genres: Category[]
  category: Category
  images: Image[]
}
export type Chapter = z.infer<typeof insertChapterSchema> & {
  id: string
}
export type User = z.infer<typeof insertUserSchema> & {
  id: string
}
