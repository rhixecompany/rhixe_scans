import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import Link from "next/link"

import { Button } from "../ui/button"

import { User } from "@/types"

interface UsersTableProps {
  limit?: number
  title?: string
  items: User[]
}

const UsersTable = ({ title, items }: UsersTableProps) => {
  // // Sort users in dec order based on updated_at
  // const sortedUsers: User[] = [...items].sort(
  //   (a, b) =>
  //     new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  // )
  // const filteredUsers = limit ? sortedUsers.slice(0, limit) : sortedUsers
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Users"}</h3>
      <Table>
        <TableCaption>A list of recent users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="hidden md:table-cell">First Name</TableHead>
            <TableHead className="hidden md:table-cell">Last Name</TableHead>
            <TableHead className="hidden md:table-cell">Full Name</TableHead>
            <TableHead className="hidden md:table-cell">Image</TableHead>
            <TableHead>Is Admin</TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell className="hidden md:table-cell">
                {user.first_name}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.last_name}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.full_name}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user.image}
              </TableCell>
              <TableCell>{user.is_admin}</TableCell>

              <TableCell>
                <Link href={`/admin/users/edit/${user.id}`}>
                  <Button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded text-xs ">
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
