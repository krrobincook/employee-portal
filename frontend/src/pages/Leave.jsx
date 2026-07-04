import React, { useState, useEffect, useCallback } from "react";
import { dummyLeaveData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  PalmtreeIcon,
  UmbrellaIcon,
  ThermometerIcon,
  Plus,
} from "lucide-react";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";
const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const isAdmin = false; // Replace with actual logic to determine if the user is an admin

  const fetchLeaves = useCallback(async () => {
    setLoading(true);
    setLeaves(dummyLeaveData);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading title="Leave" />;

  const approvedLeaves = leaves.filter((leave) => leave.status === "APPROVED");
  const sickCount = approvedLeaves.filter(
    (leave) => leave.type === "SICK",
  ).length;
  const casualCount = approvedLeaves.filter(
    (leave) => leave.type === "CASUAL",
  ).length;
  const annualCount = approvedLeaves.filter(
    (leave) => leave.type === "ANNUAL",
  ).length;

  const leaveStats = [
    {
      label: "Sick Leaves",
      value: sickCount,
      icon: ThermometerIcon,
      color: "border-l-rose-500",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
    {
      label: "Casual Leaves",
      value: casualCount,
      icon: UmbrellaIcon,
      color: "border-l-blue-500",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Annual Leaves",
      value: annualCount,
      icon: PalmtreeIcon,
      color: "border-l-green-500",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="px-8 pt-4 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Leave Management
          </h1>

          <p className="mt-1 text-slate-500">
            {isAdmin
              ? "Manage leave applications"
              : "Your leave history and requests"}
          </p>
        </div>

        {!isAdmin && (
          <button
            onClick={() => setShowModal(true) }
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white font-medium shadow-md transition hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Leave Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaveStats.map((stat) => {
          const Icon = stat.icon;

          return ( 
            <div
              key={stat.label}
              className={`flex items-center gap-5 rounded-2xl border border-slate-200 border-l-4 ${stat.color} bg-white p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className={`h-7 w-7 ${stat.iconColor}`} />
              </div>

              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <h2 className="text-4xl font-bold text-slate-900">
                  {stat.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />
      <ApplyLeaveModal open={showModal} onClose={() => setShowModal(false)} onSuccess={fetchLeaves}/>
    </div>
  );
};

export default Leave;
