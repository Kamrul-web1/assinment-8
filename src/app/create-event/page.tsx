
"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    eventType: "",
    location: "",
    eventDate: "",
    description: "",
    organizer: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      

      if (res.ok) {
        toast.success("Event created successfully!");

        setFormData({
          title: "",
          image: "",
          location: "",
          eventType: "",
          eventDate: "",
          description: "",
          organizer: "",
        });
      } else {
        toast.error(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10";

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-700/20">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                className="h-8 w-8"
              >
                <path
                  d="M24 38V19M24 29C12 29 8 20 9 10C19 9 27 14 24 29Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 24C24 14 32 8 41 9C41 20 35 27 24 24Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                Social<span className="text-green-700">Bridge</span>
              </h1>
              <p className="text-xs text-gray-500">
                Together for a better tomorrow
              </p>
            </div>
          </div>

          <div className="rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-semibold text-green-800">
            Community Event Portal
          </div>
        </div>

        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-green-700">
            Make a difference
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Create a New Event
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
            Bring people together, organize meaningful activities and
            create a positive impact in your community.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">

          {/* Form */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-8">

            <div className="mb-7 flex items-center gap-3 border-b border-gray-100 pb-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl text-green-700">
                ✦
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Event Information
                </h3>
                <p className="text-xs text-gray-500">
                  Fill in the details below
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Event Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Event Title <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Winter Clothes Distribution"
                  className={inputStyle}
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Event Image URL <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/event-image.jpg"
                  className={inputStyle}
                />
              </div>

              {/* Location & Date */}
             
{/* Event Type */}
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Event Type <span className="text-red-500">*</span>
  </label>

  <select
    required
    name="eventType"
    value={formData.eventType}
    onChange={handleChange}
    className={inputStyle}
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

{/* Location */}
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Event Location <span className="text-red-500">*</span>
  </label>

  <input
    required
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder="e.g. Mirpur 10, Dhaka"
    className={inputStyle}
  />
</div>

{/* Event Date */}
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Event Date <span className="text-red-500">*</span>
  </label>

  <input
    required
    type="date"
    min={new Date().toISOString().split("T")[0]}
    name="eventDate"
    value={formData.eventDate}
    onChange={handleChange}
    className={inputStyle}
  />
</div>
uuuu

              {/* Organizer */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Organizer Name <span className="text-red-500">*</span>
                </label>

                <input
                  required
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleChange}
                  placeholder="Enter organizer name"
                  className={inputStyle}
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Event Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  required
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event, its purpose and activities..."
                  className={`${inputStyle} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="border-t border-gray-100 pt-6">
                <Link href={'/manage-events'}
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating Event..." : "Create Event"}

                  {!loading && <span className="text-lg">→</span>}
                </Link>

                <p className="mt-3 text-center text-xs text-gray-400">
                  Let's work together to make our community better.
                </p>
              </div>

            </form>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">

            {/* Preview Card */}
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

              <div className="bg-green-800 px-5 py-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
                  Event Preview
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  Your Event Card
                </h3>

                <p className="mt-1 text-xs text-green-100">
                  A quick preview of your event
                </p>
              </div>

              <div className="p-4">

                <div className="flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-green-50">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Event preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-green-700">
                      <div className="mb-2 text-5xl">🌱</div>
                      <p className="text-xs font-medium">
                        Your event image will appear here
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700">
                    Upcoming Event
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-gray-900">
                    {formData.title || "Your Event Title"}
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <span className="text-green-700">⌖</span>
                      {formData.location || "Event Location"}
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-green-700">▦</span>
                      {formData.eventDate || "Event Date"}
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-green-700">♙</span>
                      {formData.organizer || "Organizer Name"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Community Card */}
            <div className="relative overflow-hidden rounded-3xl bg-[#e8f5e9] p-6">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-200/60" />

              <div className="relative">
                <div className="mb-4 text-3xl">🤝</div>

                <h3 className="text-xl font-extrabold text-green-900">
                  Small Actions,
                  <br />
                  Big Impact.
                </h3>

                <p className="mt-3 text-sm leading-6 text-green-800/80">
                  Every community event is an opportunity to change
                  s life. Start making a difference today.
                </p>

                <div className="mt-5 h-1.5 w-16 rounded-full bg-green-600" />
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-3xl border border-gray-100 bg-white p-5">
              <h3 className="font-bold text-gray-900">
                <span className="mr-2 text-green-700">✦</span>
                Event Tips
              </h3>

              <ul className="mt-4 space-y-3 text-xs leading-5 text-gray-500">
                <li>✓ Choose a clear and meaningful title.</li>
                <li>✓ Add a relevant event image.</li>
                <li>✓ Provide an accurate location.</li>
                <li>✓ Write a detailed description.</li>
              </ul>
            </div>

          </aside>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200 py-6 text-center">
          <p className="text-xs text-gray-400">
            © 2026 SocialBridge. Together for a Better Tomorrow.
          </p>
        </div>

      </div>
    </main>
  );
}
