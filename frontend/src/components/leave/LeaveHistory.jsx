import React, { useState } from "react";
import { format } from "date-fns";
import { CheckIcon, Loader2, X } from "lucide-react";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(false);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(true);

    try {
      if (onUpdate) {
        await onUpdate(id, status);
      }
    } finally {
      setProcessing(false);
    }
  };

  const statusClasses = {
    APPROVED: "bg-emerald-100 text-emerald-700",
    REJECTED: "bg-rose-100 text-rose-700",
    PENDING: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-slate-50">
            <tr className="text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-7 py-5">Type</th>
              <th className="px-7 py-5">Dates</th>
              <th className="px-7 py-5">Reason</th>
              <th className="px-7 py-5">Status</th>

              {isAdmin && <th className="px-7 py-5 text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr
                  key={leave._id || leave.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  {/* Type */}
                  <td className="px-7 py-5">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {leave.type}
                    </span>
                  </td>

                  {/* Dates */}
                  <td className="px-7 py-5 text-slate-600">
                    {format(new Date(leave.startDate), "MMM dd")} –{" "}
                    {format(new Date(leave.endDate), "MMM dd, yyyy")}
                  </td>

                  {/* Reason */}
                  <td className="px-7 py-5 text-slate-700">{leave.reason}</td>

                  {/* Status */}
                  <td className="px-7 py-5">
                    <span
                      className={`rounded-lg px-3 py-1 text-sm font-medium ${
                        statusClasses[leave.status]
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  {/* Admin Actions */}
                  {isAdmin && (
                    <td className="px-7 py-5">
                      {leave.status === "PENDING" ? (
                        <div className="flex justify-center gap-2">
                          <button
                            disabled={processing}
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id || leave.id,
                                "APPROVED",
                              )
                            }
                            className="rounded-lg bg-emerald-500 p-2 text-white transition hover:bg-emerald-600"
                          >
                            {processing ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckIcon className="h-4 w-4" />
                            )}
                          </button>

                          <button
                            disabled={processing}
                            onClick={() =>
                              handleStatusUpdate(
                                leave._id || leave.id,
                                "REJECTED",
                              )
                            }
                            className="rounded-lg bg-rose-500 p-2 text-white transition hover:bg-rose-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">
                          Completed
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="py-10 text-center text-slate-500"
                >
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
