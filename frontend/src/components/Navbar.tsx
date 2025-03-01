"use client"

import * as React from "react"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavbarProps } from "./Navbar.types"
import { useTheme } from "@/components/theme-provider"
import { Link } from "react-router-dom"

// type Theme = "dark" | "light" | "system"

function isSystemDark() {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const isDarkMode =
        theme === "dark" || (theme === "system" && isSystemDark())

    function toggleTheme() {
        if (isDarkMode) {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

const MenuListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors",
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    {children ? (
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    ) : null}
                </a>
            </NavigationMenuLink>
        </li>
    )
})

MenuListItem.displayName = "MenuListItem"

export function Navbar({
    logo = "HELPERHUB",
    menuItems,
    showThemeToggle = true,
    showLoginButton = true,
    onLoginClick,
}: NavbarProps) {
    return (
        <nav className="container flex items-center justify-between px-14 py-5 w-full absolute top-0 left-0 z-50">
            {/* Left: Logo */}
            <Link to="/" className="cursor-pointer">
                <div className="text-3xl font-bold italic font-[cursive] tracking-wide">
                    {logo}
                </div>
            </Link>

            <NavigationMenu className="mx-6 flex-1">
                <NavigationMenuList>
                    {menuItems.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            {item.subItems ? (
                                <>
                                    <NavigationMenuTrigger className="text-md">
                                        {item.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="flex flex-col space-y-1 p-2 min-w-[220px]">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <MenuListItem
                                                    key={subIndex}
                                                    title={subItem.title}
                                                    href={subItem.href}
                                                >
                                                    {subItem.description}
                                                </MenuListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <NavigationMenuLink
                                    className="cursor-pointer"
                                    href={item.href || "#"}
                                >
                                    {item.title}
                                </NavigationMenuLink>
                            )}
                        </NavigationMenuItem>
                    ))}
                    <NavigationMenuIndicator />
                </NavigationMenuList>
                <NavigationMenuViewport />
            </NavigationMenu>

            {/* Right side: Theme Switcher + Login button */}
            <div className="flex items-center space-x-2">
                {showThemeToggle && <ModeToggle />}
                {showLoginButton && (
                    <Button onClick={onLoginClick} className="cursor-pointer">Login</Button>
                )}
            </div>
        </nav>
    )
}