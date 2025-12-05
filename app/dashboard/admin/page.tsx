'use client';

import { useEffect, useState} from "react";
import api from "@/lib/api/axios";

interface AdminStats{
    totalDepartments: number;
    totalStudents: number;
    totalInstructors: number;
    totalCourses: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats| null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchStats = async () =>{
            try{
                const resp = await api.get("/api/admin/stats");
                console.log("🔥 RAW RESPONSE:", resp.data);
                setStats(resp.data.stats);
            }catch(err: any){
                console.error("🔥 Error fetching stats", err.response?.data || err);
                setError("Failed to load admin stats");
            }finally{
                setLoading(false);
            }
        }
        fetchStats();

    }, []);

    if(loading){
        return <p className={'p-10 text-gray-500'}>Loading...</p>;
    }
    if(error){
        return <p className={'text-red-600 bg-red-100 p-2 rounded text-center'}>{error}</p>
    }


  return (
    <div className="p-10 text-black">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div>
            <StatCard title="Total Departments" value={stats.totalDepartments } />
            <StatCard title="Total Instructors" value={stats.totalInstructors } />
            <StatCard title="Total Courses" value={stats.totalCourses} />
            <StatCard title="Total Students" value={stats.totalStudents} />
        </div>
    </div>
  );
}

function StatCard({title, value}: {title: string, value: number}) {
        return (
            <div className="bg-white shadow p-6 rounded-lg border">
                <h2 className={'text-xl font-semibold'}>{title}</h2>
                <p className={'text-3xl font-bold mt-2'}>{value}</p>
            </div>
        )
}
