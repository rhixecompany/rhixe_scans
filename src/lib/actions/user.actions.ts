"use server"
import { DATABASE_URL } from "@/lib/constants"

import { convertToPlainObject } from "../utils"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formatError } from "../utils"
import { insertUserSchema, updateUserSchema } from "../validators"

// Get all users
export async function getAllUsers(query?: string, currentPage?: number) {
  if (query) {
    // Query filter
    const res = await fetch(`${DATABASE_URL}/api/users/?titlesearch=${query}`)
    const data = await res.json()
    return convertToPlainObject(data)
  }
  if (currentPage) {
    // Query Pagination
    const res = await fetch(`${DATABASE_URL}/api/users/?page=${currentPage}`)
    const data = await res.json()
    return convertToPlainObject(data)
  }
  const res = await fetch(`${DATABASE_URL}/api/users/`)
  const data = await res.json()
  return convertToPlainObject(data)
}
// Get  user by Id
export async function getUserById(id: string) {
  const res = await fetch(`${DATABASE_URL}/api/users/${id}/`)
  const data = await res.json()
  return convertToPlainObject(data)
}

// Create a user
export async function createUser(data: z.infer<typeof insertUserSchema>) {
  try {
    const user = insertUserSchema.parse(data)
    await fetch(`${DATABASE_URL}/api/users/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    revalidatePath("/admin/users")

    return {
      success: true,
      message: "User created successfully"
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
// Update a user
export async function updateUser(data: z.infer<typeof updateUserSchema>) {
  try {
    const user = updateUserSchema.parse(data)
    const userExists = await fetch(`${DATABASE_URL}/api/users/${user.id}/`)
    if (!userExists) throw new Error("User not found")
    await fetch(`${DATABASE_URL}/api/users/update/${user.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    revalidatePath("/admin/users")

    return {
      success: true,
      message: "User updated successfully"
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
