import { Save, User } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: `${initialData.firstName || ""} ${initialData.lastName || ""}`.trim(),
    email: initialData?.email || "",
    position: initialData?.position || "",
    bio: initialData?.bio || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const formData = new FormData(e.currentTarget);
    try {
      await api.post("/profile", formData);
      setMessage("Profile updated successfully");
      onSuccess?.();
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 mb-8">
      {/* Header */}
      <h2 className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 text-lg font-semibold text-slate-900">
        <User className="h-5 w-5 text-slate-500" />
        Public Profile
      </h2>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Success */}
      {message && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {message}
        </div>
      )}

      {/* Name & Email */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Name
          </label>

          <input
            type="text"
            value={formData.name}
            readOnly
            className="text-md w-half rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-slate-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            value={formData.email}
            readOnly
            className="text-md w-half rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-500 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Position */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Position
        </label>

        <input
          type="text"
          value={formData.position}
          readOnly
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-md text-slate-500 cursor-not-allowed"
        />
      </div>

      {/* Bio */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Bio
        </label>

        <textarea
          rows={3}
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <p className="mt-2 text-sm text-slate-400">
          This will be displayed on your profile.
        </p>
      </div>

      {/* Save Button */}
      <div className="mt-1 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:shadow-lg disabled:opacity-70"
        >
          <Save className="h-5 w-5" />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;