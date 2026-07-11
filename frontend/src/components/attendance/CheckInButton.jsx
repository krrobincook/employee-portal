import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    try {
      await api.post("/attendance")
      toast.success("Attendance marked successfully")
      onAction()
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
    } finally {
      setLoading(false)
    }
  };
  if (todayRecord?.checkOut) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">Work Day Completed</h3>
        <p className="text-slate-500 text-sm mt-1">
          Great job! See you tommorow
        </p>
      </div>
    );
  }
  const isCheckedIn = !!todayRecord?.checkIn;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`group flex items-center gap-4 rounded-2xl px-6 py-4 min-w-[250px]
      shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
      disabled:cursor-not-allowed disabled:opacity-70
      ${
        isCheckedIn
          ? "bg-linear-to-r from-slate-700 to-slate-900"
          : "bg-linear-to-r from-indigo-600 to-violet-600"
      } text-white`}
      >
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
          {loading ? (
            <Loader2Icon className="h-6 w-6 animate-spin" />
          ) : isCheckedIn ? (
            <LogOutIcon className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          ) : (
            <LogInIcon className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 text-left">
          <h2 className="text-lg font-semibold leading-none">
            {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>

          <p className="mt-1 text-sm text-white/80">
            {isCheckedIn ? "Click to end your shift" : "Start your work day"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CheckInButton;
