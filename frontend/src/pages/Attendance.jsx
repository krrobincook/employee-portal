import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import AttendanceStats from "../components/attendance/AttendanceStats";
import CheckInButton from "../components/attendance/CheckInButton";
import { dummyAttendanceData } from "../assets/assets";
import AttendanceHistory from "../components/attendance/AttendanceHistory";
const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setHistory(dummyAttendanceData);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading title="Attendance" />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );

  return (
    <div className="px-4 pt-1 pb-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <p className="text-gray-700 mt-1">
          Track your work hours and daily check-ins
        </p>
      </div>

      {/* Stats */}
      <AttendanceStats history={history} />

      {/* History */}
      <div className="w-full mt-5">
        <AttendanceHistory history={history} />
      </div>
      {/* Floating Check In Button */}
      <div className="fixed bottom-8 right-8">
        <CheckInButton todayRecord={todayRecord} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default Attendance;
