import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command"
import {
  CreditCard,
  Folders,
  LayoutDashboard,
  Newspaper,
  Settings,
  User
} from "lucide-react"
import Link from "next/link"

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LayoutDashboard />
            <Link href="/dashboard">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper />
            <Link href="/comics">Comics</Link>
          </CommandItem>
          <CommandItem>
            <Folders />
            <Link href="/chapters">Chapters</Link>
          </CommandItem>
          <CommandItem>
            <User />
            <Link href="/users">Users</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default Sidebar
