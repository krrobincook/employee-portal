import React from "react";
import { useCallback, useState, useEffect } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import { Plus } from "lucide-react";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePaySlipForm from "../components/payslip/GeneratePaySlipForm";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const { user } = useAuth()
  const isAdmin = user?.role === "ADMIN";
  const fetchPayslips = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/payslips")
      setPayslips(res.data.data || [])
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if(isAdmin) api.get("/employees").then((res)=> setEmployees(res.data.filter((e)=> !e.isDeleted)))
    .catch((err)=> toast.error(err.response?.data?.error || err?.message))
  }, [isAdmin]);

  if (loading) return <Loading title="Payslips" />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div>
        {isAdmin && <GeneratePaySlipForm employees={employees} onSuccess={fetchPayslips} />}
      </div>
      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;
