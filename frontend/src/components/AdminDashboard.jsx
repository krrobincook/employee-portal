import React from "react";
import { Building2Icon, UsersIcon } from "lucide-react";
import { CalendarIcon, FileTextIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { dummyAdminDashboardData } from "../assets/assets";
const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UsersIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Total Departments",
      description: "Organizational structure",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Total Attendance",
      description: "Checked in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting approval",
    },
  ];
  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-linear-to-r from-indigo-50 via-white to-purple-50 p-8 shadow-sm lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Admin Dashboard
          </span>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
            Welcome back,
            <span className="text-indigo-600"> Admin</span> 👋
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            Manage employees, departments, attendance and leave requests.
          </p>
        </div>

        <div className="mt-6 lg:mt-0">
          <div className="rounded-xl bg-white px-6 py-4 shadow">
            <p className="text-sm text-slate-500">Today</p>
            <p className="text-lg font-bold text-slate-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 md:grid-cols-2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl"
          >
            <div className="border-l-3 border-indigo-600 pl-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-800">
                {stat.value}
              </h2>

              <p className="mt-1 text-sm text-slate-500">{stat.description}</p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
              <stat.icon className="h-7 w-7" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
