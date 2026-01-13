import { Button } from "../ui/button"
import {
  Upload,
  Home,
  FolderOpen,
  Settings,
  User,
  LogOut,
  LogIn,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Logo from "@/assets/icons/Logo"
import { ModeToggle } from "./ModeToggler"

export function Navbar() {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 w-12 md:mr-50">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-primary hover:bg-accent hover:text-accent-foreground font-medium">
              <Home className="w-4 h-4" />
              Home
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <FolderOpen className="w-4 h-4" />
              My Files
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-accent">
              <ModeToggle />
            </button>

            <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      U
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-foreground hover:bg-accent">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="text-foreground hover:bg-accent">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="hidden sm:flex border-primary text-primary hover:bg-accent"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden py-4 border-t border-border">
          <div className="space-y-2">
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-primary hover:bg-accent font-medium">
              <Home className="w-4 h-4" />
              Home
            </button>

            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent">
              <FolderOpen className="w-4 h-4" />
              My Files
            </button>

            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent">
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <Button
              variant="outline"
              className="w-full border-primary text-primary hover:bg-accent"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login / Register
            </Button>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
