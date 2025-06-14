/* eslint-disable @next/next/no-img-element */

import { Comic } from "@/types"
import Link from "next/link"
interface IndexGridItemProps {
  comic: Comic
}

const IndexGridItem = ({ comic }: IndexGridItemProps) => {
  return (
    <>
      <div className="w-full p-1 pt-1 pb-3 border-b-[1px] border-b-[#312f40]">
        <div className="grid grid-rows-1 grid-cols-12 m-2">
          <div className="col-span-3">
            <div className="w-[100%] h-32 relative">
              <Link href={`/series/${comic.slug}`}>
                <img
                  alt=""
                  loading="lazy"
                  width="0"
                  height="0"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-md object-cover"
                  src={
                    comic.images &&
                    `http://localhost:8000${comic.images[0]?.image}`
                  }
                  style={{
                    color: "transparent",
                    width: "100px",
                    maxHeight: "130px",
                    objectFit: "cover",
                    objectPosition: "100% 25%"
                  }}
                />
              </Link>
            </div>
          </div>
          <div className="col-span-9 space-y-1.5 overflow-hidden pl-[9px]">
            <span className="text-[15px] font-medium hover:text-themecolor hover:cursor-pointer">
              <Link href={`/series/${comic.slug}`}>{comic.title}</Link>
            </span>
            <div className="flex flex-col gap-y-1.5 list-disc">
              {comic.chapters.map((chapter, index) => (
                <span key={index} className="flex-1 inline-block mt-1">
                  <div className="flex flex-row justify-between rounded-sm">
                    <div className="flex text-sm text-[#999] font-medium hover:text-white">
                      <Link
                        href={`/series/${comic.slug}/chapter/${chapter.slug}`}
                        className=""
                      >
                        <span className="flex">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#9d4942] mt-[2px]"
                          >
                            <path
                              d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <div className="flex gap-1">
                            <p className="w-[80px]">{chapter.name}</p>
                          </div>
                        </span>
                      </Link>
                    </div>
                    {/* {chapter.public_in && (
                        <div className="flex">
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
                            className="lucide lucide-timer mt-[3px] w-3.5 h-3.5 text-purple-500"
                          >
                            <line x1="10" x2="14" y1="2" y2="2"></line>
                            <line x1="12" x2="15" y1="14" y2="11"></line>
                            <circle cx="12" cy="14" r="8"></circle>
                          </svg>
                          <p className="flex items-end text-[12px] ml-2 text-zinc-500">
                            Public in {chapter.public_in}
                          </p>
                        </div>
                      )} */}
                    {chapter.updated_at && (
                      <p className="flex items-end ml-2 text-[12px] text-[#555555]">
                        {chapter.updated_at}
                      </p>
                    )}
                  </div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexGridItem
