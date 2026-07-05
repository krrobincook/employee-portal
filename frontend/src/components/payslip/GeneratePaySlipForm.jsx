import { Plus } from "lucide-react";
import React, { useState } from "react";
import { X } from "lucide-react";
const GeneratePaySlipForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white font-medium shadow-md transition hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4" />
        Generate Payslip
      </button>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Generate Payslip
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select an employee and payroll period.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Employee */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Employee
            </label>

            <select className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <option>Select Employee</option>

              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} ({employee.position})
                </option>
              ))}
            </select>
          </div>

          {/* Month & Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Month
              </label>

              <select className="w-full rounded-xl border border-slate-200 px-4 py-3">
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Year
              </label>

              <input
                type="number"
                defaultValue={new Date().getFullYear()}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* basic salary*/}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              required placeholder="Enter basic salary"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          
          {/* Allowance and Deductions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Allowance</label>
              <input
                type="number"
                name="allowance"
                placeholder="Enter allowance"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>Deductions</label>
              <input
                type="number"
                name="deductions"
                placeholder="Enter deductions"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-slate-200 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl"
            >
              Generate Payslip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePaySlipForm;
