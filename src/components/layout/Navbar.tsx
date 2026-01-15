
import { useState } from "react";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {

  const { data } = useUserInfoQuery(undefined);
  const email = data?.data?.email;

  const [activeLink, setActiveLink] = useState("Home");

  return (
    <header className="border-b">
      <div className=" max-w-7xl mx-auto relative flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="text-primary hover:text-primary/90">
            <Logo />
          </a>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-md:hidden">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    active={activeLink === link.label}
                    className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right side Buttons */}
        <div className="ml-auto flex items-center gap-2">

          <ModeToggle />

          {email ? (
            <Button
              className="text-sm"
              size="sm"
              variant="destructive"

            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm" size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
          {/* <Button asChild className="text-sm" size="sm">
            <Link to="/signup">Get Started</Link>
          </Button> */}

          {/* Mobile Hamburger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden ml-2"
                size="icon"
                variant="ghost"
              >
                <svg
                  className="pointer-events-none"
                  fill="none"
                  height={16}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width={16}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 6H20" />
                  <path d="M4 12H20" />
                  <path d="M4 18H20" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-2">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem className="w-full" key={link.label}>
                      <NavigationMenuLink
                        active={activeLink === link.label}
                        className="py-1.5"
                        href={link.href}
                        onClick={() => setActiveLink(link.label)}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
