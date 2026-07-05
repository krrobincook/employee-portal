import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import { format } from "date-fns";
import { Printer, X } from "lucide-react";
const PrintPayslip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slip = dummyPayslipData.find((item) => item._id === id);
    setPayslip(slip);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <Loading title="Loading Payslip" />;

  if (!payslip)
    return (
      <div className="py-20 text-center text-slate-500">Payslip not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-300 py-8 print:bg-white print:py-0">
      <div className="relative mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow-2xl print:max-w-full print:rounded-none print:shadow-none">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 print:hidden flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <X className="h-5 w-5" />
        </button>
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 text-center">
          <h1 className="text-3xl font-bold tracking-wide text-slate-900">
            PAYSLIP
          </h1>

          <p className="mt-2 text-md text-slate-500">
            {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
          </p>
        </div>

        {/* Employee Details */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="px-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Employee Name
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {payslip.employee.firstName} {payslip.employee.lastName}
            </h3>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Position
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {payslip.employee.position}
            </h3>
          </div>

          <div className="mx-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Email
            </p>

            <h3 className="mt-2 text-lg font-medium">
              {payslip.employee.email}
            </h3>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Period
            </p>

            <h3 className="mt-2 text-lg font-medium">
              {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
            </h3>
          </div>
        </div>

        {/* Salary Table */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold uppercase text-slate-600">
                  Description
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold uppercase text-slate-600">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="px-5 py-3">Basic Salary</td>
                <td className="px-5 py-3 text-right font-medium">
                  ${payslip.basicSalary.toLocaleString()}
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-5 py-3">Allowances</td>
                <td className="px-5 py-3 text-right font-medium text-emerald-600">
                  +${payslip.allowances.toLocaleString()}
                </td>
              </tr>

              <tr className="border-t">
                <td className="px-5 py-3">Deductions</td>
                <td className="px-5 py-3 text-right font-medium text-red-600">
                  -${payslip.deductions.toLocaleString()}
                </td>
              </tr>
            </tbody>

            <tfoot className="border-t-2 bg-slate-50">
              <tr>
                <td className="px-6 py-5 text-xl font-bold">Net Salary</td>

                <td className="px-6 py-5 text-right text-3xl font-bold">
                  ${payslip.netSalary.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Print Button */}
        <div className="mt-10 flex justify-center print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 text-white shadow-lg transition hover:shadow-xl"
          >
            <Printer className="h-5 w-5" />
            Print Payslip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintPayslip;
