import { Pencil, Trash2 } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const initials = `${employee.firstName[0]}${employee.lastName[0]}`;

  const handleDelete = async () => {
    if (employee.isDeleted) {
      return toast.error("Employee already deleted");
    }
    
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      await api.delete(`/employees/${employee.id}`)
      onDelete()
      toast.success("Employee deleted successfully")
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top Section */}
      <div className="relative flex h-64 flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-indigo-50">
        {/* Department Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow">
          {employee.department || "General"}
        </span>

        {/* Avatar */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600 transition-transform duration-300 group-hover:scale-110">
          {initials}
        </div>

        {/* Hover Buttons */}
        <div className="absolute bottom-5 left-5 flex gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button
            onClick={() => onEdit(employee)}
            className="rounded-xl bg-white p-3 shadow-md transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil className="h-5 w-5" />
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-white p-3 shadow-md transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-100 bg-white p-6">
        <h3 className="truncate text-lg font-semibold text-slate-900 flex items-center gap-2">
          {employee.firstName} {employee.lastName}
          {employee.isDeleted && <span className="text-sm font-bold text-red-500">(Deleted)</span>}
        </h3>

        <p className="mt-1 text-base text-slate-500">
          {employee.position}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;