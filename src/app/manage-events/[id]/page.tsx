
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface EventItem {
  _id: string;
  title: string;
  image: string;
  eventType: string;
  location: string;
  eventDate: string;
  description: string;
  organizer: string;
}

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/manage-events/${id}`
        );

        if (!res.ok) {
          throw new Error("Event not found");
        }

        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f8f5]">
        <Loader2 size={40} className="animate-spin text-green-700" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f5f8f5] px-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Event Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          {error || "This event does not exist."}
        </p>

        <button
          onClick={() => router.back()}
          className="mt-5 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/manage-events"
          className="mb-7 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-50"
        >
          <ArrowLeft size={18} />
          Back to Manage Events
        </Link>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

          <div className="relative h-64 bg-green-50 md:h-96">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            <span className="absolute left-5 top-5 rounded-full bg-green-700 px-4 py-2 text-sm font-bold text-white">
              {event.eventType}
            </span>
          </div>

          <div className="p-6 md:p-10">

            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
              Event Details
            </p>

            <h1 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
              {event.title}
            </h1>

            <div className="mt-7 grid gap-4 border-y border-gray-100 py-6 sm:grid-cols-2">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-50 p-3 text-green-700">
                  <CalendarDays size={22} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Event Date</p>
                  <p className="font-semibold text-gray-800">
                    {event.eventDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-50 p-3 text-green-700">
                  <MapPin size={22} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-semibold text-gray-800">
                    {event.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <div className="rounded-xl bg-green-50 p-3 text-green-700">
                  <Users size={22} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Organizer</p>
                  <p className="font-semibold text-gray-800">
                    {event.organizer}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-7">
              <h2 className="text-xl font-bold text-gray-900">
                About This Event
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-8 text-gray-600">
                {event.description}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <Link
                href="/manage-events"
                className="inline-flex rounded-xl bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Back to Events
              </Link>
            </div>

          </div>
        </div>

        <div className="mt-8 py-5 text-center">
          <p className="text-xs text-gray-400">
            © 2026 SocialBridge. Together for a Better Tomorrow.
          </p>
        </div>

      </div>
    </main>
  );
}
