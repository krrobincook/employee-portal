import React, { useState } from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-700 text-sm mb-10 transition-colors"
          >
            <ArrowLeftIcon size={16} />
            Back to portals
          </Link>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-zinc-800">
              {title}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              {subtitle}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition-all duration-200
               focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="************"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition-all duration-200
                 focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600
            text-white font-semibold shadow-lg hover:shadow-xl
              hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2" />}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
