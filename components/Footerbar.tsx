"use client"
import { useEffect, useState } from "react"

const isBrowser = () => typeof window !== "undefined"

function scrollToTop() {
  if (!isBrowser()) return
  window.scrollTo({ top: 0, behavior: "smooth" })
}

import Image from "next/image"
import Link from "next/link"
const Footerbar = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`style_scrollToTop ${isVisible && "style_visible"}`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="bg-themecolor h-8 w-8 p-2 mb-8 rounded-[50%]"
        >
          <path
            d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="bottom-[-40px] sm:bottom-0 absolute w-[100%]">
        <footer>
          <div className="border-gray-200 h-18 bg-themecolor text-center">
            <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
              <Link href="#">
                <span className="text-white text-[13px] sm:text-sm">
                  Privacy Policy
                </span>
              </Link>
            </div>
            <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
              <Link href="#">
                <span className="text-white text-[13px] sm:text-sm">
                  Digital Millennium Copyright Act
                </span>
              </Link>
            </div>
            <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
              <Link href="#">
                <span className="text-white text-[13px] sm:text-sm">
                  Terms of Service
                </span>
              </Link>
            </div>
            <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
              <Link href="#">
                <span className="text-white text-[13px] sm:text-sm">
                  Report An Issue
                </span>
              </Link>
            </div>
            <div className="inline-block px-3 py-1.5 items-center hover:bg-gray-900 hover:bg-opacity-40 hover:cursor-pointer">
              <Link href="#">
                <span className="text-white text-[13px] sm:text-sm">
                  Report Billing Issue
                </span>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center border-gray-200 h-24 bg-[#222222]">
            <span className="mr-0 h-10 w-10 sm:h-12 sm:w-12">
              <Link href="/">
                <Image
                  className="object-cover"
                  src="/images/logo.png"
                  height={48}
                  width={48}
                  alt="Rhixe Logo"
                  style={{
                    color: "transparent",
                    width: "100%",
                    height: "100%"
                  }}
                />
              </Link>
            </span>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Footerbar
