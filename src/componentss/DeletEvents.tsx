
"use client";

import { useState } from "react";
import { Trash2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteEventsProps {
  eventId: string;
  onDelete: (id: string) => void;
}

export default function DeletEvents({
  eventId,
  onDelete,
}: DeleteEventsProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const res = await fetch(
        `http://localhost:5000/manage-events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Event deleted successfully!");
      onDelete(eventId);
      setShowDialog(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete event!");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDialog(true)}
        className="flex items-center justify-center gap-1 rounded-lg bg-red-50 px-2 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={15} />
        Delete
      </button>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                <Trash2 className="text-red-600" size={22} />
              </div>

              <button
                type="button"
                onClick={() => setShowDialog(false)}
                disabled={deleting}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              Delete Event?
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
