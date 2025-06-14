import UsersTable from "@/components/users/UsersTable"

import Pagination from "@/components/users/pagination"
import { getAllUsers } from "@/lib/actions/user.actions"

import { Button } from "@/components/ui/button"
import Link from "next/link"
export default async function UsersPage(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const users = await getAllUsers(query, currentPage)
  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          {query && (
            <div>
              Filtered by <i>&quot;{query}&quot;</i>{" "}
              <Link href="/admin/users">
                <Button variant="outline" size="sm">
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/users/create">Create User</Link>
        </Button>
      </div>

      <UsersTable title="Users" items={users.results} />
      {users.total_pages > 1 && (
        <Pagination page={currentPage} totalPages={users.total_pages} />
      )}
    </div>
  )
}
