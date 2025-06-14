/* eslint-disable @next/next/no-img-element */

import { Comic } from "@/types"
import { Star } from "lucide-react"
import Link from "next/link"

interface IndexAccordianItemProps {
  comic: Comic

  count: number
}

const IndexAccordianItem = ({
  comic,

  count
}: IndexAccordianItemProps) => {
  return (
    <>
      <div>
        <div className="flex px-[15px] py-3 overflow-hidden h-[104px] relative border-b border-[#383838]">
          <div className="flex items-center justify-center">
            <div className="h-[25px] w-[25px] text-center leading-[25px] text-[14px] text-[#888] absolute vertical-middle ml-[25px] rounded-[3px] border-solid border-[0.5px] border-[#888]">
              {count + 1}
            </div>
          </div>
          <div className="flex overflow-hidden mt-0.5 mb-2.5 ml-[37px] mr-2 float-left max-w-[55px] h-[72px] max-h-[80px] rounded-[3px]">
            <Link
              href={`series/${comic.slug}`}
              className="text-[13px] font-[500] text-[#fff] decoration-none overflow-hidden"
            >
              <img
                alt="poster"
                fetchPriority="high"
                width="0"
                height="0"
                decoding="async"
                data-nimg="1"
                className="w-full cursor-pointer"
                src={
                  comic.images &&
                  `http://localhost:8000${comic.images[0].image}`
                }
                style={{
                  color: "transparent",
                  width: "100px",
                  height: "auto",
                  maxHeight: "110px"
                }}
              />
            </Link>
          </div>
          <div className="w-full p-0 overflow-hidden">
            <span className="block">
              <Link
                href={`series/${comic.slug}`}
                className="overflow-hidden block leading-[1.2] text-[13px] md:text-[12px] xl:text-[13px] font-[500] text-[#fff] cursor-pointer hover:text-themecolor"
              >
                {comic.title}
              </Link>
            </span>
            <span>
              <p className="sm:hidden xl:inline-block leading-[1.3] text-[#888] text-[12px] mt-1">
                <b>Genres:</b>
                {comic.genres &&
                  comic.genres.slice(0, 3).map((genre, index) => (
                    <Link
                      key={index}
                      href={`/series?page=1&genres=${genre}`}
                      className="text-white hover:text-themecolor cursor-pointer mb-[-10px]"
                    >
                      {genre.name},
                    </Link>
                  ))}
              </p>
            </span>
            <span>
              <p className="hidden sm:inline-block xl:hidden leading-[1.2] text-[11px] sm:text-[11px] md:text-[12px] lg:text-[11px] text-[#888] overflow-hidden mt-1">
                <b>Genres:</b>
                {comic.genres &&
                  comic.genres.slice(0, 2).map((genre, index) => (
                    <Link
                      key={index}
                      href={`/series?page=1&genres=${genre}`}
                      className="text-white hover:text-themecolor cursor-pointer mb-[-10px]"
                    >
                      {genre.name},
                    </Link>
                  ))}
              </p>
            </span>
            <div className="mt-[-2px]">
              <div className="overflow-hidden">
                <div className="float-left">
                  <div className="overflow-hidden inline-block mb-[-1px]">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-0.5">
                        {Number(comic.rating) >= 5.6 ? (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-transparent text-yellow-400" />
                            <div className="absolute inset-0 overflow-hidden w-1.5">
                              <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                        )}
                        {Number(comic.rating) >= 6.6 ? (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-transparent text-yellow-400" />
                            <div className="absolute inset-0 overflow-hidden w-1.5">
                              <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                        )}
                        {Number(comic.rating) >= 7.6 ? (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-transparent text-yellow-400" />
                            <div className="absolute inset-0 overflow-hidden w-1.5">
                              <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                        )}
                        {Number(comic.rating) >= 8.6 ? (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-transparent text-yellow-400" />
                            <div className="absolute inset-0 overflow-hidden w-1.5">
                              <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                        )}
                        {Number(comic.rating) >= 9.6 ? (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          <div className="relative p-0 w-3 h-3">
                            <Star className=" w-3 h-3 fill-transparent text-yellow-400" />
                            <div className="absolute inset-0 overflow-hidden w-1.5">
                              <Star className=" w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inline-block ml-[5px] text-[12px] leading-normal italic text-[#999]">
                  {comic.rating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexAccordianItem
