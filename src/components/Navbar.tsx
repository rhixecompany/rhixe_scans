"use client"
import { useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
  Bookmark,
  House,
  Library,
  // LogOut,
  LogIn,
  Menu,
  User,
  // Settings,
  UserRound,
  X
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import SearchCard from "./SearchCard"

const Navbar = () => {
  useEffect(() => {
    const mobileMenuButton = document.getElementById(
      "mobile-menu-button"
    ) as HTMLBodyElement
    const mobileMenu = document.getElementById("mobile-menu") as HTMLBodyElement
    const mobileMenuCloseButton = document.getElementById(
      "mobile-menu-close-button"
    ) as HTMLBodyElement
    if (mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.remove("hidden")
        mobileMenu.classList.add("flex")
      })
    }
    if (mobileMenu) {
      mobileMenuCloseButton.addEventListener("click", () => {
        mobileMenu.classList.remove("flex")
        mobileMenu.classList.add("hidden")
      })
    }
  }, [])
  return (
    <header className="py-1 bg-themecolor">
      <div className="max-w-[1220px] flex mx-auto px-2 items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Link className="flex h-12 w-12" href="/">
            <Image
              className="object-cover"
              src="/images/logo.png"
              height={48}
              width={48}
              alt="Rhixe Logo"
            />
          </Link>
          <ul className="hidden md:flex flex-row">
            <li>
              <Link href="/">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Home
                </span>
              </Link>
            </li>

            <li>
              <Link href="/series">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Comics
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="block pt-0 pr-[10px] pb-0 pl-[8px] leading-[42px] text-white text-[13px] tracking-wider hover:text-white hover:bg-gray-900 hover:bg-opacity-40">
                  Bookmarks
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full">
          <div className="flex-row w-full gap-3.5 items-center">
            <div className="hidden md:flex flex-row w-full gap-3.5 items-center">
              <SearchCard
                placeholder="Search"
                myclass="relative w-[95%] sm:w-[55%] md:w-[55%] lg:w-[40%] text-white px-4 py-1 sm:py-2 rounded-lg border-[1px] bg-[#16151D] border-black outline-none"
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar>
                    <AvatarImage src="/profile-picture.webp" alt="@shadcn" />
                    <AvatarFallback className="text-black">BT</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/auth">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="rounded-full flex items-center justify-center bg-[#121212]">
                      <div className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#6F2598] text-white hover:bg-[#5a1f78] flex items-center gap-0.5 w-20">
                        <p>Crud</p>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Models</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/admin">Admin</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/admin/comics">Comics</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/admin/chapters">Chapters</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/admin/users">Users</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="w-auto">
                <Link
                  className="rounded-full flex items-center justify-center bg-[#121212]"
                  href="/auth"
                >
                  <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#6F2598] text-white hover:bg-[#5a1f78] flex items-center gap-0.5 w-20">
                    <UserRound className=" w-3 h-3" />
                    <p>Login</p>
                  </button>
                </Link>
              </div>
              {/* <ThemeToggler /> */}
            </div>
            <div className="flex md:hidden flex-row w-full gap-3.5 items-center">
              <div className="flex flex-row flex-grow items-center justify-end space-x-1">
                <SearchBar
                  myclass="flex h-10 rounded-md border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full border-0 bg-purple-800/50 pl-9 text-white placeholder:text-white/70 focus-visible:ring-1 focus-visible:ring-purple-400"
                  placeholder="Search comics..."
                />

                <div className="w-auto">
                  <Link
                    className="rounded-full flex items-center justify-center bg-[#121212]"
                    href="/auth"
                  >
                    <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#6F2598] text-white hover:bg-[#5a1f78] flex items-center gap-0.5 w-20">
                      <UserRound className=" w-3 h-3" />
                      <p>Login</p>
                    </button>
                  </Link>
                </div>

                {/* mobile button */}
                <div className="block md:hidden">
                  <button
                    id="mobile-menu-button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 w-10 text-white hover:bg-purple-800/50"
                    type="button"
                  >
                    <Menu className=" h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="mobile-menu" className="md:hidden hidden">
        <div className="fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out data-open:animate-in data-closed:animate-out data-closed:duration-300 data-open:duration-500 inset-y-0 right-0 h-full data-closed:slide-out-to-right data-open:slide-in-from-right sm:max-w-sm w-full max-w-xs border-l-0 bg-gradient-to-b from-[#1a1a1a] to-purple-900 p-0 pointer-events-auto">
          {/* <div className="flex flex-col h-full">
            <div className="border-b border-white/10 bg-[#7E22CE] p-6">
              <div className="flex items-center space-x-4">
                <Image
                  width={100}
                  height={100}
                  src="/profile-picture.webp"
                  alt="adminbot"
                  className="h-12 w-12 rounded-full border-2 border-white/20"
                />
                <div className="space-y-1">
                  <h2 className="text-base font-medium text-white">adminbot</h2>
                  <p className="text-sm text-white/70">admin@rhixe.company</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-1 p-4">
              <Link
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                href="/"
              >
                <House className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/series"
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
              >
                <Library className="h-5 w-5" />
                <span>Comics</span>
              </Link>
              <Link
                href="/bookmarks"
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
              >
                <Bookmark className="h-5 w-5" />
                <span>Bookmarks</span>
              </Link>
            </div>
            <div className="border-t border-white/10 p-4">
              <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-white hover:bg-white/10 transition-colors duration-200">
                <Link href="/profile" className="flex flex-row gap-2">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </button>
              <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-white hover:bg-white/10 transition-colors duration-200">
                <LogOut className="h-5 w-5" />
                <span>LogOut</span>
              </button>
            </div>
          </div> */}
          <div className="flex flex-col h-full">
            <div className="flex-1 space-y-1 p-4">
              <Link
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                href="/"
              >
                <House className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/series"
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
              >
                <Library className="h-5 w-5" />
                <span>Comics</span>
              </Link>
              <Link
                href="/bookmarks"
                className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200"
              >
                <Bookmark className="h-5 w-5" />
                <span>Bookmarks</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center space-x-2 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200">
                    <User className="h-5 w-5" />
                    <p>Crud</p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Models</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/admin">Admin</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/comics">Comics</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/chapters">Chapters</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/users">Users</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="border-t border-white/10 p-4">
              <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 px-4 py-2 w-full justify-start space-x-2 text-white hover:bg-white/10">
                <Link href="/auth" className="flex flex-row gap-2">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              </button>
            </div>
          </div>
          <button
            id="mobile-menu-close-button"
            type="button"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-open:bg-secondary"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
