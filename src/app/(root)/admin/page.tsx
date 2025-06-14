import LoadingPage from "@/app/loading"
import ComicsTable from "@/components/comics/ComicsTable"
import AnalyticsChart from "@/components/dashboard/AnalyticsChart"
import DashboardCard from "@/components/dashboard/DashboardCard"
import { getAllChapters } from "@/lib/actions/chapter.actions"
import { getAllComics } from "@/lib/actions/comic.actions"
import { getAllUsers } from "@/lib/actions/user.actions"
import { Folder, MessageCircle, Newspaper, User } from "lucide-react"
import { Suspense } from "react"
export default async function Home(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const comics = await getAllComics(query, currentPage)
  const chapters = await getAllChapters(query, currentPage)
  const users = await getAllUsers(query, currentPage)
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <DashboardCard
          title="Comics"
          count={comics.total_results}
          icon={<Newspaper className="text-neutral-500" size={72} />}
        />
        <DashboardCard
          title="Chapters"
          count={chapters.total_results}
          icon={<Folder className="text-neutral-500" size={72} />}
        />
        <DashboardCard
          title="Users"
          count={users.total_results}
          icon={<User className="text-neutral-500" size={72} />}
        />
        <DashboardCard
          title="Comments"
          count={1200}
          icon={<MessageCircle className="text-neutral-500" size={72} />}
        />
      </div>
      <AnalyticsChart />
      <Suspense key={query + currentPage} fallback={<LoadingPage />}>
        <ComicsTable title="Latest Comics" limit={10} items={comics.results} />
      </Suspense>
    </>
  )
}
