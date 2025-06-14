import LoadingPage from "@/app/loading"
import { getAllComics } from "@/lib/actions/comic.actions"

import { Comic } from "@/types"
import Link from "next/link"
import { Suspense } from "react"
import IndexGridItem from "./IndexGridItem"
const IndexGrid = async () => {
  const comics = await getAllComics()

  return (
    <div className="text-white mb-1 md:mb-5 mt-5">
      <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px]">
        <h3 className="text-[15px] text-white font-semibold leading-5 m-0 flex flex-row">
          Latest Updates
          <div className="flex flex-row align-middle ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-x bg:accent-purple-600 w-3.5 h-3.5 m-1"
              data-tooltip-id="user-history-tooltip"
              data-tooltip-content="User history failed to load"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m15 9-6 6"></path>
              <path d="m9 9 6 6"></path>
            </svg>
          </div>
        </h3>
        <Link
          href="/series"
          className="text-[8.5px] rounded-[3px] bg-themecolor p-1 text-white uppercase hover:cursor-pointer"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 bg-[#222222] p-3 pb-0">
        {comics.results.map((comic: Comic) => (
          <Suspense key={comic.slug} fallback={<LoadingPage />}>
            <IndexGridItem comic={comic} />
          </Suspense>
        ))}
      </div>
      <div className="flex items-center justify-center py-[15px] bg-[#222222]">
        <Link
          href="/1"
          className="flex items-center bg-slate-500 opacity-60 text-white px-5 py-1.5 rounded-[2px] text-[13px] w-[110px] text-center cursor-pointer mr-1 pointer-events-none"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.81809 4.18179C8.99383 4.35753 8.99383 4.64245 8.81809 4.81819L6.13629 7.49999L8.81809 10.1818C8.99383 10.3575 8.99383 10.6424 8.81809 10.8182C8.64236 10.9939 8.35743 10.9939 8.1817 10.8182L5.1817 7.81819C5.09731 7.73379 5.0499 7.61933 5.0499 7.49999C5.0499 7.38064 5.09731 7.26618 5.1817 7.18179L8.1817 4.18179C8.35743 4.00605 8.64236 4.00605 8.81809 4.18179Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
          Previous{" "}
        </Link>
        <Link
          href="/page/2"
          className="flex items-center bg-themecolor text-white px-8 py-1.5 rounded-[2px] text-[13px] w-[110px] text-center pointer-events-auto"
        >
          Next
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default IndexGrid
