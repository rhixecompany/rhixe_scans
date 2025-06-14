"use client"

import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
interface SearchCardProps {
  myclass: string
  placeholder: string
}
const SearchCard = ({ myclass, placeholder }: SearchCardProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace, push } = useRouter()
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    if (pathname == "/series") {
      replace(`${pathname}?${params.toString()}`)
    } else {
      push(`/series?${params.toString()}`)
    }
  }
  return (
    <div className="hidden md:flex justify-end items-center w-full">
      <Input
        type="text"
        className={myclass}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <svg
        className="h-8 w-8 absolute pt-1 text-white cursor-not-allowed"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  )
}

export default SearchCard
