import React from "react";

const Loading = ({title = 'Dashboard'}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <div className="absolute inset-2 animate-pulse rounded-full bg-indigo-100"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            Loading {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Please wait...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;