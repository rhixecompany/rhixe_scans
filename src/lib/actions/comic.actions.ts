"use server"
import { DATABASE_URL } from "@/lib/constants"

import { convertToPlainObject } from "../utils"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formatError } from "../utils"
import { insertComicSchema, updateComicSchema } from "../validators"

// Get all comics
export async function getAllComics(query?: string, currentPage?: number) {
  if (query) {
    // Query filter
    const res = await fetch(`${DATABASE_URL}/api/comics/?titlesearch=${query}`)
    const data = await res.json()
    return convertToPlainObject(data)
  }
  if (currentPage) {
    // Query Pagination
    const res = await fetch(`${DATABASE_URL}/api/comics/?page=${currentPage}`)
    const data = await res.json()
    return convertToPlainObject(data)
  }
  const res = await fetch(`${DATABASE_URL}/api/comics/`)
  const data = await res.json()
  return convertToPlainObject(data)
}
// Get  comic by Slug
export async function getComicBySlug(slug: string) {
  const res = await fetch(`${DATABASE_URL}/api/comics/${slug}/`)
  const data = await res.json()
  return convertToPlainObject(data)
}
// Get Select comics
export async function getSelectComics() {
  const res = await fetch(`${DATABASE_URL}/api/comics/select/`)

  const data = await res.json()
  return convertToPlainObject(data)
}

// Get Top comics
export async function getTopComics() {
  const res = await fetch(`${DATABASE_URL}/api/comics/top/`)

  const data = await res.json()
  return convertToPlainObject(data)
}

// Get Featured comics
export async function getFeaturedComics() {
  const res = await fetch(`${DATABASE_URL}/api/comics/featured/`)

  const data = await res.json()
  return convertToPlainObject(data)
}

// Create a comic
export async function createComic(data: z.infer<typeof insertComicSchema>) {
  try {
    const comic = insertComicSchema.parse(data)
    await fetch(`${DATABASE_URL}/api/comics/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comic)
    })

    revalidatePath("/admin/comics")

    return {
      success: true,
      message: "Comic created successfully"
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
// Update a comic
export async function updateComic(data: z.infer<typeof updateComicSchema>) {
  try {
    const comic = updateComicSchema.parse(data)
    const comicExists = await fetch(`${DATABASE_URL}/api/comics/${comic.slug}/`)
    if (!comicExists) throw new Error("Comic not found")
    await fetch(`${DATABASE_URL}/api/comics/update/${comic.slug}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comic)
    })

    revalidatePath("/admin/comics")

    return {
      success: true,
      message: "Comic updated successfully"
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
