import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { Lock } from "lucide-react";
import { ChevronRight } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

const Settings = () => {
  const {user} = useAuth()
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      const profile = res.data;
      if(profile) setProfile(profile);
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <Loading title="Settings" />;
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      {profile && <h2 className="text-md font-medium "> <ProfileForm initialData={profile} onSuccess={fetchProfile}/> </h2>}

      {/* change password triggered */}
      <div className="card group flex items-center justify-between rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-indigo-50 p-3 transition-colors group-hover:bg-indigo-100">
            <Lock className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Password</h3>

            <p className="mt-1 text-sm text-slate-500">
              Update your account password to keep your account secure.
            </p>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
        >
          Change Password
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <ChangePasswordModal open={showPasswordModal} onClose={() => setShowPasswordModal(false)}/>
    </div>
  );
};

export default Settings;