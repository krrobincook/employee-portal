import { Plus } from "lucide-react";
import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";
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
    setLoading(true)
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await api.post("/payslips", data)
      toast.success("Payslip generated successfully")
      onSuccess()
      setIsOpen(false)
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    } finally {
      setLoading(false)
    }
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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Employee */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Employee
            </label>

            <select name="employeeId" required className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
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

              <select name="month" required className="w-full rounded-xl border border-slate-200 px-4 py-3">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Year
              </label>

              <input
                type="number"
                name="year"
                required
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
                name="allowances"
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
