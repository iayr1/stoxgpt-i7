"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/login", label: "Login", icon: "🔐" },
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="glassmorphic px-6 py-3 rounded-full border border-cyan-400/30">
          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className={
                    pathname === item.href
                      ? "bg-cyan-400 text-black hover:bg-cyan-300"
                      : "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                  }
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="glassmorphic border border-cyan-400/30 bg-black/50 text-cyan-400 hover:bg-cyan-400/10 p-3"
        >
          <div className="flex flex-col gap-1">
            <div
              className={`w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <div
              className={`w-5 h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </div>
        </Button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-0 glassmorphic border border-cyan-400/30 rounded-lg p-4 min-w-48">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start ${
                      pathname === item.href
                        ? "bg-cyan-400 text-black hover:bg-cyan-300"
                        : "text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
