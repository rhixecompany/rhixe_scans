import LoadingPage from "@/app/loading"
import IndexAccordian from "@/components/index/IndexAccordian"
import SeriesGrid from "@/components/series/SeriesGrid"
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
  return (
    <>
      <div className="w-[100%] float-left min-[882px]:w-[70%] max-[600px]:w-[100%]">
        <Suspense key={query + currentPage} fallback={<LoadingPage />}>
          <SeriesGrid query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="w-[100%] min-[882px]:w-[30%] max-[600px]:w-[100%] float-right">
        <div className="lg:ml-[15px] min-[855px]:mr-3 lg:mr-0 bg-[#222] rounded-[3px] mb-[18px]">
          <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
            <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
              Popular
            </h3>
          </div>

          <IndexAccordian />
        </div>
      </div>
    </>
  )
}
