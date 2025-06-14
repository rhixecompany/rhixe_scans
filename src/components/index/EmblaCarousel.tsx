/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { Comic } from "@/types"
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import Link from "next/link"
import React, { useCallback } from "react"
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from "./EmblaCarouselArrowButtons"
import { DotButton, useDotButton } from "./EmblaCarouselDotButton"
type PropType = {
  comics: Comic[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { comics, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: false
    })
  ])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <div>
      <div className="carousel-root">
        <div className="carousel carousel-slider w-[100%]">
          <ul className="control-dots">
            {scrollSnaps.map((_: any, index: any) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"dot".concat(
                  index === selectedIndex ? " selected" : ""
                )}
              />
            ))}
          </ul>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="slider-wrapper axis-horizontal" ref={emblaRef}>
            <ul className="slider animated myslider">
              {comics.map((comic, index) => (
                <li className="slide" key={index}>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
                    <div className="h-[280px] relative select-none">
                      <div>
                        <img
                          alt="poster"
                          fetchPriority="high"
                          loading="eager"
                          decoding="async"
                          data-nimg="fill"
                          className="blur-lg brightness-[0.2] "
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            inset: "0px",
                            objectFit: "cover",
                            color: "transparent"
                          }}
                          src={
                            comic.images &&
                            `http://localhost:8000${comic.images[0].image}`
                          }
                        />
                      </div>
                      <div className="relative grid grid-cols-12 slide-content">
                        <div className="col-span-9 sm:col-span-9 text-white pr-3.5 sm:pr-5">
                          <div className="info-left">
                            <div className="rating">
                              <div className="vote">
                                <div className="site-vote">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    fill="#f3d872"
                                  >
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                  </svg>
                                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm italic text-[#0a0a0a]">
                                    {comic.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="ellipsis">
                              <span>
                                <Link
                                  href={`/series/${comic.slug}`}
                                  className="hover:text-[#f3d872]"
                                >
                                  {comic.title}
                                </Link>
                              </span>
                              <br />
                              <span className="release-year">
                                {comic.category.name}
                              </span>
                            </div>
                          </div>
                          <span className="block sm:hidden text-[12px] mt-[68px] extra-category">
                            {comic.genres.map((genre) => (
                              <Link
                                key={genre.id}
                                href="#"
                                className="text-white hover:text-themecolor cursor-pointer mb-[-10px]"
                              >
                                {genre.name},
                              </Link>
                            ))}

                            <Link
                              href="#"
                              className="text-white hover:text-themecolor cursor-pointer mb-[-10px]"
                            >
                              ...
                            </Link>
                          </span>
                          <span className="hidden sm:block text-[12px] mt-[68px] extra-category">
                            {comic.genres.map((genre) => (
                              <Link
                                key={genre.id}
                                href="#"
                                className="text-white hover:text-themecolor cursor-pointer mb-[-10px]"
                              >
                                {genre.name},
                              </Link>
                            ))}
                          </span>
                          <span className="block uppercase mt-2 title">
                            <strong>summary</strong>
                          </span>
                          <div className="text-left hidden sm:block mt-1 summary justify-between">
                            {comic.description.slice(0, 150)}...
                          </div>
                          <div className="text-left sm:hidden mt-1 summary justify-between">
                            {comic.description.slice(0, 100)}...
                          </div>
                          <span className="block text-[13px] mt-1">
                            Status: {comic.status} <br />
                          </span>
                        </div>
                        <div className="col-span-3">
                          <Link href={`/series/${comic.slug}`}>
                            <div className="hidden sm:flex poster relative">
                              <img
                                alt="poster"
                                loading="lazy"
                                width="0"
                                height="0"
                                decoding="async"
                                data-nimg="1"
                                className="rounded-[4px]"
                                src={
                                  comic.images &&
                                  `http://localhost:8000${comic.images[0].image}`
                                }
                                style={{
                                  color: "transparent",
                                  width: "100%",
                                  maxHeight: "180px",
                                  objectFit: "contain",
                                  objectPosition: "100% 15%"
                                }}
                              />
                            </div>
                            <div className="sm:hidden relative">
                              <img
                                alt="poster"
                                loading="lazy"
                                width="0"
                                height="0"
                                decoding="async"
                                data-nimg="1"
                                className="rounded-[4px]"
                                src={
                                  comic.images &&
                                  `http://localhost:8000${comic.images[0].image}`
                                }
                                style={{
                                  color: "transparent",
                                  width: "100%",
                                  maxHeight: "125px",
                                  objectFit: "contain",
                                  objectPosition: "100% 15%"
                                }}
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
