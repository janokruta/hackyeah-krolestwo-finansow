"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Calculator, FileText, LayoutDashboard, BookOpen, Users } from "lucide-react"

const navItems = [
  {
    name: "Panel główny",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Formularz",
    href: "/formularz",
    icon: FileText,
  },
  {
    name: "Kalkulator Emerytalny",
    href: "/kalkulator",
    icon: Calculator,
  },
  {
    name: "Materiały edukacyjne",
    href: "/edukacja",
    icon: BookOpen,
  },
  {
    name: "Panel opiekuna",
    href: "/panel-opiekuna",
    icon: Users,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <Image
          src="/krolestwo-logo.png"
          alt="Królestwo Finansów"
          width={240}
          height={40}
          className="w-full h-auto"
          priority
        />
        <p className="text-xs text-gray-600 mt-2">Planowanie emerytury</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive ? "bg-[#009F3F] text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">© 2025 Finansowe królestwo</p>
      </div>
    </aside>
  )
}
