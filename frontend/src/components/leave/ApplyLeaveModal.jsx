import { useState } from "react";
import { CalendarDays, FileText, Send, X } from "lucide-react"; 
import { Loader2 } from "lucide-react"; 
import toast from "react-hot-toast";
import api from "../../api/axios";
const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "SICK",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];
  const handleChange = async (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    try {
      await api.post("/leave", data)
      toast.success("Leave applied successfully")
      onSuccess?.()
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
    } finally {
      setLoading(false)
    }
  };


  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Apply for leave
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Submit your leave request for approval
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400
            hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Leave Type */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-medium text-slate-700">
              <FileText className="w-4 h-4" />
              Leave Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center gap-2 mb-3 font-medium text-slate-700">
              <CalendarDays className="w-4 h-4" />
              Duration
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-sm text-slate-500">From</p>

                <input
                  type="date"
                  name="startDate"
                  min={minDate}
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">To</p>

                <input
                  type="date"
                  name="endDate"
                  min={formData.startDate || minDate}
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Reason
            </label>

            <textarea
              rows={4}
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Briefly describe why you need this leave..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-300 py-3 font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3 font-medium text-white shadow-lg transition hover:shadow-xl disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
