"use client"
import { formUrlQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

type PaginationProps = {
  page: number | string
  totalPages: number
  urlParamName?: string
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString()
    })

    router.push(newUrl)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4">
      <button
        className="flex items-center bg-themecolor  text-white px-5 py-1.5 rounded-[2px] text-[13px] w-[110px] cursor-pointer text-center mr-1 pointer-events-auto"
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}
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
        Previous
      </button>
      <button
        className="flex items-center bg-themecolor text-white px-8 py-1.5 rounded-[2px] text-[13px] w-[110px] text-center  pointer-events-auto"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}
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
      </button>
    </div>
  )
}

export default Pagination
