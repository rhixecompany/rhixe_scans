import { getAllComics } from "@/lib/actions/comic.actions"

import { Comic } from "@/types"
import SeriesGridItem from "./SeriesGridItem"
const SeriesGrid = async ({
  query,
  currentPage
}: {
  query: string
  currentPage: number
}) => {
  const comics = await getAllComics(query, currentPage)

  return (
    <div className="w-full min-[768px]:w-[100%] bg-[#222222] min-[880px]:w-[98%] min-[912px]:w-[98%] lg:w-[100%] mb-2">
      <div className="relative flex justify-between align-baseline font-500 bg-[#222222] border-b-[1px] border-[#312f40] px-[15px] py-[8px] p-2  mt-5 sm:mt-0">
        <h3 className="text-[15px] text-white font-semibold leading-5 m-0">
          Series list
        </h3>
      </div>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-5 bg-[#222222] sm:gap-[6px] gap-[3px] px-2.5 sm:px-3 pt-[12px]">
          <div className="bg-[#222222] sm:m-[2px] m-[4px]">
            <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
              <span className="mt-0.5 capitalize"> Genre All</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-0"
              >
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div className="bg-[#222222] sm:m-[2px] m-[4px]">
            <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
              <span className="mt-0.5 capitalize"> Status All</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-0"
              >
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div className="bg-[#222222] sm:m-[2px] m-[4px]">
            <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
              <span className="mt-0.5 capitalize"> Type All</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-0"
              >
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div className="bg-[#222222] sm:m-[2px] m-[4px]">
            <button className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-[#ccc] text-[12px] font-normal pl-[20px] align-middle hover:bg-white hover:text-black h-[26px] border-solid rounded-[2px] bg-[#333]">
              <span className="mt-0.5 capitalize"> Order by Last Up...</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-0"
              >
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div className="bg-[#222222] mt-[2px] ml-[2px] mb-[2px] mr-[3px] hidden sm:block">
            <button
              className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-white text-[12px] font-normal border-none rounded-none h-[26px] bg-themecolor hover:bg-[#333] hover:text-white"
              type="submit"
              form="hook-form"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-0.5"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="none"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
              </svg>
              <span className="pt-0.5">Search</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 bg-[#222222] gap-1 p-4 pb-1 pt-2 sm:hidden">
          <button
            className="inline-flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full hover:cursor-pointer justify-center text-white text-[12px] font-normal h-[26px] border-solid rounded-[2px] bg-themecolor hover:bg-[#333] hover:text-white"
            type="submit"
            form="hook-form"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-0.5"
            >
              <path
                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                fill="none"
                fillRule="evenodd"
                clipRule="evenodd"
                stroke="currentColor"
                strokeWidth="1"
              ></path>
            </svg>
            <span className="pt-0.5">Search</span>
          </button>
        </div>
        <div className="bg-[#222222] border-[#222222] sm:pr-3 sm:pl-3 overflow-hidden">
          <div className="bg-[#333] sm:max-h-[240px] overflow-hidden overflow-y-auto w-[68%] border-[#333333] mt-[-30px] sm:mt-1 absolute rounded-none z-10  max-[600px]:w-[100%] max-[768px]:w-[96.5%] max-[860px]:w-[93%] max-[882px]:w-[63%] max-[912px]:w-[66%] ">
            <form id="hook-form" className=""></form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-3 p-4">
        {comics &&
          comics.results.map((comic: Comic) => (
            <SeriesGridItem key={comic.slug} comic={comic} />
          ))}
      </div>
      <div className="flex items-center justify-center py-[15px] bg-[#222222] ">
        <a className="flex items-center bg-themecolor  text-white px-5 py-1.5 rounded-[2px] text-[13px] w-[110px] cursor-pointer text-center mr-1 pointer-events-auto">
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
        </a>
        <a
          className="flex items-center bg-slate-500 opacity-60  text-white px-8 py-1.5
        rounded-[2px] text-[13px] w-[110px] text-center cursor-pointer pointer-events-none "
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
        </a>
      </div>
    </div>
  )
}

export default SeriesGrid
