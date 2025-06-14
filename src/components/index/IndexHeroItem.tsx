/* eslint-disable @next/next/no-img-element */

import { Comic } from "@/types"
import { Star } from "lucide-react"
import Link from "next/link"
interface IndexHeroItemProps {
  comic: Comic
}
const IndexHeroItem = ({ comic }: IndexHeroItemProps) => {
  return (
    <Link href={`/series/${comic.slug}`}>
      <div>
        <div className="flex h-[250px] md:h-[200px] overflow-hidden relative hover:opacity-60">
          <img
            alt=""
            loading="lazy"
            width="0"
            height="0"
            decoding="async"
            data-nimg="1"
            className="rounded-md"
            src={
              comic.images && `http://localhost:8000${comic.images[0].image}`
            }
            style={{
              color: "transparent",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top"
            }}
          />
          <div className="absolute bottom-[0px] flex justify-center left-[5px] mb-[5px] rounded-[3px] text-white bg-[#a12e24]">
            <span className="text-[10px] font-bold py-[2px] px-[7px]">
              {comic.category.name}
            </span>
          </div>
        </div>
        <div
          className="block w-[100%] h-auto items-center"
          style={{
            fontSize: "13.3px",
            margin: "8px 0px 5px",
            fontWeight: "500",
            lineHeight: "19px",
            textAlign: "left",
            overflow: "hidden"
          }}
        >
          <span className="block text-[13.3px] font-bold">{comic.title}</span>
          <span className="text-[13px] text-[#999]">
            {comic.first_chapter.name}
          </span>
          <span className="flex text-[12px] text-[#999]">
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
                <span className="ml-1 text-xs">{comic.rating}</span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default IndexHeroItem
