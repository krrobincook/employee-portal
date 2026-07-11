import { Download } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
const PayslipList = ({payslips, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr className="text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
              {isAdmin && <th className="px-6 py-5">Employee</th>}

              <th className="px-6 py-5">Month</th>
              <th className="px-6 py-5">Basic Salary</th>
              <th className="px-6 py-5">Bonus</th>
              <th className="px-6 py-5">Deductions</th>
              <th className="px-6 py-5">Net Salary</th>
              <th className="px-6 py-5 text-center">Download</th>
            </tr>
          </thead>

          <tbody>
            {payslips.length > 0 ? (
              payslips.map((payslip) => (
                <tr
                  key={payslip._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  {isAdmin && (
                    <td className="px-6 py-5 font-medium text-slate-900">
                      {payslip.employee.firstName} {payslip.employee.lastName}
                    </td>
                  )}

                  <td className="px-6 py-5 text-slate-700">
                    {format(new Date(payslip.month), "MMMM yyyy")}
                  </td>

                  <td className="px-6 py-5">
                    ${payslip.basicSalary}
                  </td>

                  <td className="px-6 py-5 text-emerald-600 font-medium">
                    ${payslip.bonus}
                  </td>

                  <td className="px-6 py-5 text-rose-600 font-medium">
                    ${payslip.deductions}
                  </td>

                  <td className="px-6 py-5 font-semibold text-slate-900">
                    ${payslip.netSalary}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button onClick={() => navigate(`/print/payslips/${payslip._id}`)} className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-600 transition hover:bg-indigo-100">
                      <Download className="h-4 w-4" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isAdmin ? 7 : 6}
                  className="py-10 text-center text-slate-500"
                >
                  No payslips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipList;