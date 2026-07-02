import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import Loading from "../components/Loading";
import { Plus, Search, X } from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setEmployees(
      dummyEmployeeData.filter((emp) =>
        selectedDept ? emp.department === selectedDept : emp,
      ),
    );
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [selectedDept]);

  useEffect(() => {
    fetchEmployees();
  }, [selectedDept]);

  const filterd = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  if (loading) return <Loading title="Employees" />;
  //if(!data) return <p className="text-center text-slate-500 py-12">Failed to load dashboard</p>

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Employees</h1>
          <p className="mt-1 text-slate-500">Manage your team members</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-700"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Departments</option>

          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {/* Employee List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {filterd.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
            <p className="text-slate-500 text-lg">No employees found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filterd.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))}
          </div>
        )}

        {/* Create Employee Modal */}
        {showCreateModal && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="relative my-8 w-full max-w-3xl rounded-2xl bg-white shadow-2xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Add New Employee
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Create a user account and employee profile
                  </p>
                </div>

                <button
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Form goes here */}
                <EmployeeForm
                  onSuccess={() => {
                    setShowCreateModal(false);
                    fetchEmployees();
                  }}
                  onCancel={() => setShowCreateModal(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* edit employee modal */}
        {editEmployee && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto
           bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setEditEmployee(null)}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 pb-0">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Edit Employee
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update employee details
                  </p>
                </div>

                <button
                  onClick={() => setEditEmployee(null)}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <EmployeeForm
                  initialData={editEmployee}
                  onSuccess={() => {
                    setEditEmployee(null);
                    fetchEmployees();
                  }}
                  onCancel={() => setEditEmployee(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
