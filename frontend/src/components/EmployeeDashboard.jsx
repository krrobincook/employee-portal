import {
  ArrowRightIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const EmployeeDashboard = ({ data }) => {
  const emp = data?.employee;
  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
    },
  ];
  return (
    <div className="animate-fade-in space-y-7 w-full">
      {/* Header */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-8 shadow-sm md:flex-row md:items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Employee Dashboard
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Welcome back,{" "}
            <span className="text-indigo-600">{emp?.firstName}</span> 👋
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            {emp?.position} • {emp?.department || "No Department"}
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <div className="rounded-xl bg-white px-6 py-4 shadow">
            <p className="text-sm text-slate-600">Today</p>
            <p className="text-lg font-bold text-slate-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group flex min-h-30 items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl"
          >
            <div className="border-l-3 border-indigo-600 pl-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-800">
                {card.value}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
              <card.icon className="h-7 w-7" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to="/attendance"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
        >
          Mark Attendance
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <Link
          to="/leave"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600 hover:shadow-md"
        >
          Apply for Leave
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;