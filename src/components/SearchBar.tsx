"use client"
import { useEffect } from "react"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
interface SearchBarProps {
  myclass: string
  placeholder: string
}
const SearchBar = ({ myclass, placeholder }: SearchBarProps) => {
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
  useEffect(() => {
    const searchForm = document.getElementById("searchform") as HTMLBodyElement

    const searchButton = document.getElementById(
      "searchbutton"
    ) as HTMLBodyElement
    const searchButton1 = document.getElementById(
      "searchbutton1"
    ) as HTMLBodyElement
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        searchButton.classList.add("hidden")
        searchButton1.classList.remove("hidden")
        searchButton1.classList.add("inline-flex")
        searchForm.classList.remove("hidden")
      })
    }
    if (searchButton1) {
      searchButton1.addEventListener("click", () => {
        searchButton.classList.remove("hidden")
        searchButton1.classList.add("hidden")
        searchButton1.classList.remove("inline-flex")
        searchForm.classList.add("hidden")
      })
    }
  }, [])
  return (
    <>
      <div id="searchform" className="flex-1 hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <Input
            type="search"
            className={myclass}
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get("query")?.toString()}
          />
        </div>
      </div>
      <button
        id="searchbutton1"
        className="hidden items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 text-white hover:bg-purple-800/50"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        id="searchbutton"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 text-white hover:bg-purple-800/50"
      >
        <Search className="h-5 w-5" />
      </button>
    </>
  )
}

export default SearchBar
