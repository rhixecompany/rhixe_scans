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

import { Comic } from "@/types"

interface ComicsTableProps {
  limit?: number
  title?: string
  items: Comic[]
}

const ComicsTable = ({ title, items }: ComicsTableProps) => {
  // // Sort comics in dec order based on updated_at
  // const sortedComics: Comic[] = [...items].sort(
  //   (a, b) =>
  //     new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  // )
  // const filteredComics = limit ? sortedComics.slice(0, limit) : sortedComics
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">
        {title ? title : "Comics"}
      </h3>
      <Table>
        <TableCaption>A list of recent comics</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>

            <TableHead>Rating</TableHead>

            <TableHead className="hidden md:table-cell">Status</TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((comic) => (
            <TableRow key={comic.slug}>
              <TableCell>{comic.title}</TableCell>

              <TableCell>{comic.rating}</TableCell>
              <TableCell className="hidden md:table-cell">
                {comic.status}
              </TableCell>
              <TableCell>{comic.updated_at}</TableCell>

              <TableCell>
                <Link href={`/admin/comics/edit/${comic.slug}`}>
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

export default ComicsTable
