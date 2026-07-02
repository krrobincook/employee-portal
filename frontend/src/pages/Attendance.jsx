import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
const Attendance = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500)
  },[])

  if(loading) return <Loading title='Attendance'/>
  return <div>Attendance</div>;
};

export default Attendance;
