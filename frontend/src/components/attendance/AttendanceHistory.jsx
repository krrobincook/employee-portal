import { format } from "date-fns";
import { getWorkingHoursDisplay } from "../../assets/assets";
const AttendanceHistory = ({ history }) => {
  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-900">Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Check In</th>
              <th className="px-6 py-4 text-left">Check Out</th>
              <th className="px-6 py-4 text-left">Working Hours</th>
              <th className="px-6 py-4 text-left">Day Type</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((record) => (
                <tr
                  key={record._id || record.date}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-5 font-medium text-slate-900">
                    {format(new Date(record.date), "MMM dd, yyyy")}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {record.checkIn
                      ? format(new Date(record.checkIn), "hh:mm a")
                      : "--"}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {record.checkOut
                      ? format(new Date(record.checkOut), "hh:mm a")
                      : "--"}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {getWorkingHoursDisplay(record)}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
              ${
                record.dayType === "FULL_DAY"
                  ? "bg-emerald-100 text-emerald-700"
                  : record.dayType === "HALF_DAY"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-700"
              }`}
                    >
                      {record.dayType === "FULL_DAY"
                        ? "Full Day"
                        : record.dayType === "HALF_DAY"
                          ? "Half Day"
                          : record.dayType}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`font-medium
              ${
                record.status === "PRESENT"
                  ? "text-emerald-600"
                  : record.status === "LATE"
                    ? "text-amber-600"
                    : record.status === "ABSENT"
                      ? "text-red-600"
                      : "text-slate-600"
              }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;