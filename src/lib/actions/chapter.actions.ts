"use server"
import { DATABASE_URL } from "@/lib/constants"

import { convertToPlainObject } from "../utils"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formatError } from "../utils"
import { insertChapterSchema, updateChapterSchema } from "../validators"

// Get all chapters
export async function getAllChapters(query?: string, currentPage?: number) {
  if (query) {
    // Query filter
    const res = await fetch(
      `${DATABASE_URL}/api/chapters/?titlesearch=${query}`
    )
    const data = await res.json()
    return convertToPlainObject(data)
  }
  if (currentPage) {
    // Query Pagination
    const res = await fetch(`${DATABASE_URL}/api/chapters/?page=${currentPage}`)
    const data = await res.json()
    return convertToPlainObject(data)
  }
  const res = await fetch(`${DATABASE_URL}/api/chapters/`)
  const data = await res.json()
  return convertToPlainObject(data)
}
// Get  chapter by Slug
export async function getChapterBySlug(slug: string) {
  const res = await fetch(`${DATABASE_URL}/api/chapters/${slug}/`)
  const data = await res.json()
  return convertToPlainObject(data)
}

// Create a chapter
export async function createChapter(data: z.infer<typeof insertChapterSchema>) {
  try {
    const chapter = insertChapterSchema.parse(data)
    await fetch(`${DATABASE_URL}/api/chapters/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chapter)
    })

    revalidatePath("/admin/chapters")

    return {
      success: true,
      message: "Chapter created successfully"
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
// Update a chapter
export async function updateChapter(data: z.infer<typeof updateChapterSchema>) {
  try {
    const chapter = updateChapterSchema.parse(data)
    const chapterExists = await fetch(
      `${DATABASE_URL}/api/chapters/${chapter.slug}/`
    )
    if (!chapterExists) throw new Error("Chapter not found")
    await fetch(`${DATABASE_URL}/api/chapters/update/${chapter.slug}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chapter)
    })

    revalidatePath("/admin/chapters")

    return {
      success: true,
      message: "Chapter updated successfully"
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
