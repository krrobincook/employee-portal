import React from "react";
import {
  Users,
  CalendarCheck,
  ShieldCheck,
  BadgeDollarSign,
} from "lucide-react";

const features = [
  {
    icon: <Users size={20} />,
    title: "Employees",
  },
  {
    icon: <CalendarCheck size={20} />,
    title: "Attendance",
  },
  {
    icon: <BadgeDollarSign size={20} />,
    title: "Payroll",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Security",
  },
];

const LoginLeftSide = () => {
  return (
    <div className="relative hidden lg:flex h-screen w-1/2 overflow-hidden bg-gradient-to-br from-indigo-950 via-violet-900 to-purple-800 text-white">
      {/* Background Blur */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative z-10 flex h-full flex-col justify-center px-16">
        <span className="mb-6 w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
          Smart Management Platform
        </span>

        <h1 className="text-5xl font-extrabold leading-tight">
          Employee Management
          <br />
          System
        </h1>

        <p className="mt-6 max-w-md text-base leading-7 text-gray-300">
          Manage employees, attendance, payroll and leave requests from one
          secure and modern dashboard.
        </p>

        {/* Features */}

        <div className="mt-12 grid grid-cols-2 gap-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                {item.icon}
              </div>

              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}

        <div className="mt-10 flex gap-18">
          <div>
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="text-sm text-gray-300">Employees</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">99.9%</h2>
            <p className="text-sm text-gray-300">Uptime</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">24/7</h2>
            <p className="text-sm text-gray-300">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLeftSide;
