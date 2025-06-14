import { z } from "zod"

// Schema for inserting genres
export const insertGenreSchema = z.object({
  name: z.string().min(3, "Name is required")
})
// Schema for updating genres
export const updateGenreSchema = insertGenreSchema.extend({
  id: z.string().min(1, "Id is required")
})
// Schema for inserting categorys
export const insertCategorySchema = z.object({
  name: z.string().min(3, "Name is required")
})
// Schema for updating categorys
export const updateCategorySchema = insertCategorySchema.extend({
  id: z.string().min(1, "Id is required")
})
// Schema for inserting authors
export const insertAuthorSchema = z.object({
  name: z.string().min(3, "Name is required")
})
// Schema for updating authors
export const updateAuthorSchema = insertAuthorSchema.extend({
  id: z.string().min(1, "Id is required")
})
// Schema for inserting artists
export const insertArtistSchema = z.object({
  name: z.string().min(3, "Name is required")
})
// Schema for updating artists
export const updateArtistSchema = insertArtistSchema.extend({
  id: z.string().min(1, "Id is required")
})
// Schema for inserting comics
export const insertComicSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().min(3, "Description is required"),
  status: z.string().min(3, "Status is required"),
  updated_at: z.string().min(3, "Updated_at is required"),
  rating: z.string().min(0, "Rating is required"),
  numchapters: z.coerce.number(),
  numimages: z.coerce.number(),
  link: z.string().min(3, "Link is required"),
  serialization: z.string().min(1, "Serialization is required")
  // images: z.array(
  //   z.object({
  //     image: z.string(),
  //     status: z.string().optional(),
  //     checksum: z.string().optional(),
  //     link: z.string()
  //   })
  // )
})

// Schema for updating comics
export const updateComicSchema = insertComicSchema.extend({
  id: z.string().min(1, "Id is required")
})
// Schema for inserting chapters
export const insertChapterSchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z.string().min(3, "Slug is required"),
  title: z.string().optional(),
  updated_at: z.string().min(3, "Updated_at is required"),
  numimages: z.coerce.number(),
  link: z.string().min(3, "Link is required"),
  comic: z.string().min(1, "Comic is required")
  // images: z.array(
  //   z.object({
  //     image: z.string().optional(),
  //     status: z.string().optional(),
  //     checksum: z.string().optional(),
  //     link: z.string()
  //   })
  // )
})

// Schema for updating chapters
export const updateChapterSchema = insertChapterSchema.extend({
  id: z.string().min(1, "Id is required")
})
// Schema for inserting users
export const insertUserSchema = z.object({
  email: z.string().min(3, "Email is required").email(),
  username: z.string().min(3, "Username is required"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  full_name: z.string().optional(),
  image: z.string().optional(),
  is_admin: z.boolean()
})

// Schema for updating users
export const updateUserSchema = insertUserSchema.extend({
  id: z.string().min(1, "Id is required")
})

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })
