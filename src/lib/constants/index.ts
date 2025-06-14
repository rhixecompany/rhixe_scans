export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Rhixe Scans"
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Read Comics"
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
export const DATABASE_URL =
  process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:8000"

export const signInDefaultValues = {
  email: "admin@example.com",
  password: "123456"
}

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

export const comicDefaultValues = {
  id: "",
  title: "",
  slug: "",
  serialization: "",
  rating: "",
  status: "",
  updated_at: "",
  link: "",
  numchapters: 0,
  numimages: 0,
  description: ""
}
export const chapterDefaultValues = {
  id: "",
  title: "",
  slug: "",
  name: "",

  updated_at: "",
  link: "",

  numimages: 0,
  comic: ""
}
export const userDefaultValues = {
  id: "",
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  full_name: "",
  image: "",
  is_admin: false
}

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"]
