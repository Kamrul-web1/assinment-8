
"use client";

import { useState, useEffect } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface EditEventProps {
  event?: EventItem;
  onUpdate: (updatedEvent: EventItem) => void;
}

export default function EditEvent({
  event,
  onUpdate,
}: EditEventProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<EventItem>({
    _id: "",
    title: "",
    image: "",
    eventType: "",
    location: "",
    eventDate: "",
    description: "",
    organizer: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({ ...event });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!event?._id) {
      toast.error("Event not found!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/manage-events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            image: formData.image,
            eventType: formData.eventType,
            location: formData.location,
            eventDate: formData.eventDate,
            description: formData.description,
            organizer: formData.organizer,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      onUpdate(formData);

      toast.success("Event updated successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event!");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setFormData({ ...event });
          setIsOpen(true);
        }}
        className="flex items-center justify-center gap-1 rounded-lg bg-blue-50 px-2 py-2.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
      >
        <Pencil size={15} />
        Edit
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl border border-green-100 bg-white p-6 shadow-2xl sm:max-w-[550px]">

          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update your event information below.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Event Title
              </label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                value={formData.image}
                onChange={handleChange}
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
                value={formData.eventType}
                onChange={handleChange}
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
                value={formData.location}
                onChange={handleChange}
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
                value={formData.eventDate?.slice(0, 10) || ""}
                onChange={handleChange}
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
                value={formData.organizer}
                onChange={handleChange}
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
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
              />
            </div>

            <div className="flex justify-end gap-3 border-t pt-5">
              <button
                type="button"
                disabled={loading}
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
              >
                {loading && (
                  <Loader2 size={17} className="animate-spin" />
                )}

                {loading ? "Updating..." : "Update Event"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
