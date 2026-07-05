import { LockIcon } from 'lucide-react'
import React, {useState} from 'react'
import { X } from 'lucide-react'
const ChangePasswordModal = ({open, onClose}) => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({type: "", text: ""})

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    if(!open) return null;

return (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
  >
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

    <div
      className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            <LockIcon className="h-5 w-5 text-indigo-600" />
            Change Password
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your account password.
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`mx-6 mt-5 rounded-xl border p-3 text-sm ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        {/* Current Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Current Password
          </label>

          <input
            type="password"
            placeholder="Enter current password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:shadow-xl disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <LockIcon className="h-4 w-4" />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default ChangePasswordModal
