'use client';
import Link from "next/link";
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
                console.log("🔥 Error fetching stats", err.response?.data || err);
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
    <div className="p-0 text-black">
       <div className={'grid grid-cols-4 min-h-screen '}>
           <aside className="col-span-1 bg-gray-800 text-white p-4">
                <ul className={'mt-10'}>
                    <li className={'mb-2'}><Link href={"#"} className={'hover:text-blue-400'}>OverView</Link></li>
                    <li className={'mb-2'}><Link href="/dashboard/admin/courses"  className={'hover:text-blue-400'}>View Course</Link></li>
                    <li className={'mb-2'}><a className={'hover:text-blue-400'}>Instructor</a></li>
                    <li className={'mb-2'}><a className={'hover:text-blue-400'}>Students</a></li>
                    <li className={'mb-2'}><a className={'hover:text-blue-400'}>Courses</a></li>
                    <li className={"mb-5"}><a  className={'hover:text-blue-400'} href="#">Settings</a></li>
                    <li className={"mb-5"}><a  className={'hover:text-blue-400'} href="#">Profile</a></li>

                </ul>
            </aside>
            <div className="col-span-3 p-4">
                 <h1 className="text-3xl text-center py-3 font-bold">Admin Dashboard</h1>
                <StatCard title="Total Departments" value={stats?stats.totalDepartments:0 } />
                <StatCard title="Total Instructors" value={stats?stats.totalInstructors :0} />
                <StatCard title="Total Courses" value={stats?stats.totalCourses:0} />
                <StatCard title="Total Students" value={stats?stats.totalStudents:0} />
            </div>
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
