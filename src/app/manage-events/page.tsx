
"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Users,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import EditEvent from "@/componentss/EditEvents";

interface EventItem {
  _id: string;
  title: string;
  image: string;
  eventType: string;
  location: string;
  eventDate: string;
  description: string;
  organizer: string;
  createdAt?: string;
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/manage-events");

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!editingEvent) return;

    const { name, value } = e.target;

    setEditingEvent({
      ...editingEvent,
      [name]: value,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingEvent) return;

    setSaving(true);

    try {
      const res = await fetch(
        `http://localhost:5000/manage-events/${editingEvent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editingEvent.title,
            image: editingEvent.image,
            eventType: editingEvent.eventType,
            location: editingEvent.location,
            eventDate: editingEvent.eventDate,
            organizer: editingEvent.organizer,
            description: editingEvent.description,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === editingEvent._id ? editingEvent : event
        )
      );

      toast.success("Event updated successfully!");
      setEditingEvent(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-green-700">
            Your Community Activities
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Manage Events
          </h1>

          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Manage and keep track of your created events.
          </p>
        </div>

        {/* Event Count */}
        <div className="mb-7 flex items-center justify-between rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Total Events</p>
            <h2 className="mt-1 text-3xl font-extrabold text-green-700">
              {events.length}
            </h2>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <CalendarDays size={26} />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-green-700" size={40} />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty Events */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-3xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">
            <CalendarDays
              size={50}
              className="mx-auto mb-4 text-green-600"
            />

            <h2 className="text-xl font-bold text-gray-900">
              No Events Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You haven't created any events yet.
            </p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-green-50">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-green-700 px-3 py-1.5 text-xs font-bold text-white">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={17} className="text-green-700" />
                      {event.location}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays size={17} className="text-green-700" />
                      {event.eventDate}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={17} className="text-green-700" />
                      {event.organizer}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                    <button
                      type="button"
                      disabled
                      className="flex items-center justify-center gap-1 rounded-lg bg-green-50 px-2 py-2.5 text-xs font-semibold text-green-700 opacity-70"
                    >
                      <Eye size={15} />
                      View
                    </button>

               
<EditEvent
  event={event}
  onUpdate={(updatedEvent) => {
    setEvents((prev) =>
      prev.map((item) =>
        item._id === updatedEvent._id ? updatedEvent : item
      )
    );
  }}
/>
                    <button
                      type="button"
                      disabled
                      className="flex items-center justify-center gap-1 rounded-lg bg-red-50 px-2 py-2.5 text-xs font-semibold text-red-600 opacity-70"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

              {/* Dialog Header */}
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Edit Event
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your event information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleUpdate} className="space-y-4">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Title
                  </label>
                  <input
                    required
                    name="title"
                    value={editingEvent.title}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Image URL
                  </label>
                  <input
                    required
                    name="image"
                    value={editingEvent.image}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Type
                  </label>
                  <select
                    required
                    name="eventType"
                    value={editingEvent.eventType}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  >
                    <option value="">Select Event Type</option>
                    <option value="Charity">Charity</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Health & Medical">Health & Medical</option>
                    <option value="Blood Donation">Blood Donation</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Community Support">Community Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Location
                  </label>
                  <input
                    required
                    name="location"
                    value={editingEvent.location}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Date
                  </label>
                  <input
                    required
                    type="date"
                    name="eventDate"
                    value={editingEvent.eventDate?.slice(0, 10)}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Organizer Name
                  </label>
                  <input
                    required
                    name="organizer"
                    value={editingEvent.organizer}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="description"
                    value={editingEvent.description}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
                  />
                </div>

                {/* Dialog Buttons */}
                <div className="flex justify-end gap-3 border-t pt-5">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setEditingEvent(null)}
                    className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
                  >
                    {saving && (
                      <Loader2 size={17} className="animate-spin" />
                    )}
                    {saving ? "Updating..." : "Update Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 border-t border-gray-200 py-6 text-center">
          <p className="text-xs text-gray-400">
            © 2026 SocialBridge. Together for a Better Tomorrow.
          </p>
        </div>
      </div>
    </main>
  );
}
