import ChaptersTable from "@/components/chapters/ChaptersTable"

import Pagination from "@/components/chapters/pagination"
import { getAllChapters } from "@/lib/actions/chapter.actions"

import { Button } from "@/components/ui/button"
import Link from "next/link"
export default async function ChaptersPage(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const chapters = await getAllChapters(query, currentPage)
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          {query && (
            <div>
              Filtered by <i>&quot;{query}&quot;</i>{" "}
              <Link href="/admin/chapters">
                <Button variant="outline" size="sm">
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/chapters/create">Create Chapter</Link>
        </Button>
      </div>

      <ChaptersTable title="Chapters" items={chapters.results} />
      {chapters.total_pages > 1 && (
        <Pagination page={currentPage} totalPages={chapters.total_pages} />
      )}
    </div>
  )
}
