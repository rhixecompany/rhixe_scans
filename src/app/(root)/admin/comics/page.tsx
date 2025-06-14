import ComicsTable from "@/components/comics/ComicsTable"

import Pagination from "@/components/comics/pagination"
import { getAllComics } from "@/lib/actions/comic.actions"

import { Button } from "@/components/ui/button"
import Link from "next/link"
export default async function ComicsPage(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const comics = await getAllComics(query, currentPage)
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          {query && (
            <div>
              Filtered by <i>&quot;{query}&quot;</i>{" "}
              <Link href="/admin/comics">
                <Button variant="outline" size="sm">
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/comics/create">Create Comic</Link>
        </Button>
      </div>

      <ComicsTable title="Comics" items={comics.results} />
      {comics.total_pages > 1 && (
        <Pagination page={currentPage} totalPages={comics.total_pages} />
      )}
    </div>
  )
}
