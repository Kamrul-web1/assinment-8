"use client";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarHeart,
  PlusCircle,
  CalendarCheck,
  Users,
  LogOut,
  ChevronDown,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  // Logout Function
  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
    toast.success('Logout successfull')
    router.push("/login");
    router.refresh();
  };

  const user = session?.user;

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

          {/* Login / Profile - Right */}
          <div className="flex justify-end relative">

            {!isPending && !user && (
              <Link
                href="/login"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Login
              </Link>
            )}

            {!isPending && user && (
              <div className="relative">

                {/* Profile Button */}
                <button
                  onClick={() => setOpen(!open)}
                  title={user.name || "User"}
                  className="flex items-center gap-2 rounded-xl hover:bg-gray-50 p-1.5 transition-colors"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <UserRound className="text-emerald-700" size={23} />
                    </div>
                  )}

                  <ChevronDown
                    size={17}
                    className="text-slate-600"
                  />
                </button>

                {/* Profile Dropdown */}
                {open && (
                  <div className="absolute right-0 top-14 w-60 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">

                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-slate-800 text-sm">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Dropdown Links */}
                    <div className="p-2">

                      <Link
                        href="/create-event"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
                      >
                        <PlusCircle size={18} />
                        Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
                      >
                        <CalendarCheck size={18} />
                        Manage Events
                      </Link>

                      <Link
                        href="/joined-events"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
                      >
                        <Users size={18} />
                        Joined Events
                      </Link>

                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;