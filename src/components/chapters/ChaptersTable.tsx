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

import { Chapter } from "@/types"

interface ChaptersTableProps {
  limit?: number
  title?: string
  items: Chapter[]
}

const ChaptersTable = ({ title, items }: ChaptersTableProps) => {
  // // Sort chapters in dec order based on updated_at
  // const sortedChapters: Chapter[] = [...items].sort(
  //   (a, b) =>
  //     new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  // )
  // const filteredChapters = limit ? sortedChapters.slice(0, limit) : sortedChapters
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">
        {title ? title : "Chapters"}
      </h3>
      <Table>
        <TableCaption>A list of recent chapters</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Title</TableHead>
            {/* <TableHead>Comic</TableHead> */}

            <TableHead>Updated_at</TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((chapter) => (
            <TableRow key={chapter.slug}>
              <TableCell>{chapter.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {chapter.title}
              </TableCell>
              {/* <TableCell>
                <Button variant="secondary" size="sm">
                  {chapter.comic}
                </Button>
              </TableCell> */}

              <TableCell>{chapter.updated_at}</TableCell>

              <TableCell>
                <Link href={`/admin/chapters/edit/${chapter.slug}`}>
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

export default ChaptersTable
