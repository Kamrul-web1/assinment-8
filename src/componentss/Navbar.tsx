
import Link from "next/link"
import { CalendarHeart } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="grid grid-cols-3 items-center">

          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-emerald-700 p-2 rounded-xl">
              <CalendarHeart size={25} className="text-white" />
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                EventSphere
              </h1>
              <p className="hidden sm:block text-xs text-slate-500">
                Community Together
              </p>
            </div>
          </Link>

          {/* Upcoming Events - Center */}
          <div className="flex justify-center">
            <Link
              href="/upcoming-events"
              className="text-xs sm:text-base font-semibold text-slate-700 hover:text-emerald-700 transition-colors whitespace-nowrap"
            >
              Upcoming Events
            </Link>
          </div>

          {/* Login - Right */}
          <div className="flex justify-end">
            <Link
              href="/login"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
