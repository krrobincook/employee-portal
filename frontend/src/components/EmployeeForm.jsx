import { useState } from "react";
import { Loader2 } from "lucide-react";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const isEditMode = !!initialData;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    bio: initialData?.bio || "",

    department: initialData?.department || "",
    position: initialData?.position || "",
    employmentStatus: initialData?.employmentStatus || "ACTIVE",
    joinDate: initialData?.joinDate
      ? initialData.joinDate.substring(0, 10)
      : "",

    basicSalary: initialData?.basicSalary || "",
    allowances: initialData?.allowances || "",
    deductions: initialData?.deductions || "",

    role: initialData?.user?.role || "EMPLOYEE",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    console.log(formData);

    setTimeout(() => {
      setLoading(false);
      onSuccess?.();
    }, 1000);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* PERSONAL INFORMATION */}
      <section className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Personal Information
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              First Name
            </label>
            <input
              className={inputClass}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Last Name
            </label>
            <input
              className={inputClass}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              className={inputClass}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <input
              className={inputClass}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Bio
            </label>

            <textarea
              rows={4}
              className={inputClass}
              placeholder="Brief description..."
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* EMPLOYMENT DETAILS */}
      <section className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Employment Details
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Department
            </label>

            <input
              className={inputClass}
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Position
            </label>

            <input
              className={inputClass}
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Employment Status
            </label>

            <select
              className={inputClass}
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
            >
              <option>ACTIVE</option>
              <option>INACTIVE</option>
              <option>ON_LEAVE</option>
              <option>TERMINATED</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Join Date
            </label>

            <input
              type="date"
              className={inputClass}
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
            />
          </div>

        </div>
      </section>

      {/* SALARY DETAILS */}
      <section className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Salary Details
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Basic Salary
            </label>

            <input
              type="number"
              className={inputClass}
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Allowances
            </label>

            <input
              type="number"
              className={inputClass}
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Deductions
            </label>

            <input
              type="number"
              className={inputClass}
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
            />
          </div>

        </div>
      </section>

      {/* ACCOUNT SETUP */}
      <section className="rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Account Setup
        </h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">


          {!isEditMode && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  className={inputClass}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter you password"
                />
              </div>

              <div>
            <label className="mb-2 block text-sm font-medium">
              Role
            </label>

            <select
              className={inputClass}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option>EMPLOYEE</option>
              <option>ADMIN</option>
            </select>
          </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  className={inputClass}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>
            </>
          )}

        {isEditMode && (
            <>
            <div>
            <label className="mb-2 block text-sm font-medium">
              Update Role
            </label>

            <select
              className={inputClass}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option>EMPLOYEE</option>
              <option>ADMIN</option>
            </select>
          </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Update Password
                </label>

                <input
                  type="password"
                  className={inputClass}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Update employee password"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* BUTTONS */}
      <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;