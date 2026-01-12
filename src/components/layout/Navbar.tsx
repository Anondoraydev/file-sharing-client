import { Button } from "../ui/button";
import {
  Upload,
  Home,
  FolderOpen,
  Settings,
  Bell,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h1 className="hidden sm:block text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              File Manager Pro
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-blue-600 font-medium">
              <Home className="w-4 h-4" />
              Home
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <FolderOpen className="w-4 h-4" />
              My Files
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <Button className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm">
                      U
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="hidden sm:flex border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden py-4 border-t">
          <div className="space-y-2">
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-blue-600 font-medium">
              <Home className="w-4 h-4" />
              Home
            </button>
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100">
              <FolderOpen className="w-4 h-4" />
              My Files
            </button>
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100">
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login / Register
            </Button>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
