import { AlertCircle, CalendarIcon, ClockIcon } from "lucide-react";
import React from "react";

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter(
    (h) => h.status === "PRESENT" || h.status === "LATE"
  ).length;

  const totalLate = history.filter((h) => h.status === "LATE").length;

  // Calculate Average Work Hours
  const avgHours =
    history.length > 0
      ? (
          history.reduce((sum, item) => sum + (item.workHours || 0), 0) /
          history.length
        ).toFixed(1)
      : "0.0";

  const stats = [
    {
      label: "Days Present",
      value: totalPresent,
      icon: CalendarIcon,
      color: "border-l-slate-400",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Late Arrivals",
      value: totalLate,
      icon: AlertCircle,
      color: "border-l-slate-400",
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Avg. Work Hrs",
      value: `${avgHours} Hrs`,
      icon: ClockIcon,
      color: "border-l-indigo-500",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      {stats.map((s) => {
        const Icon = s.icon;

        return (
          <div
            key={s.label}
            className={`flex items-center gap-4 rounded-xl border ${s.color} border-l-4 bg-white p-6 shadow-sm`}
          >
            <div className={`${s.iconBg} rounded-lg p-3`}>
              <Icon className={`h-6 w-6 ${s.iconColor}`} />
            </div>

            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <h2 className="text-3xl font-bold">{s.value}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;