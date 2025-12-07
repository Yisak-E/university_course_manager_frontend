'use client'

import Link from "next/link";
import {useEffect, useState} from "react";
import CourseList from "@/app/dashboard/admin/courses/courseList/page";
import NewCourse from "@/app/dashboard/admin/courses/newCourseForm/page";
import UpdateCourse from "@/app/dashboard/admin/courses/editCourse/page";

const Settings = ()=>{
    return (
        <main>
            this is the setting page and will be implemented in future
        </main>
    )
}



import api from "@/lib/api/axios";


interface Course {
id: number;
code: string;
title: string;
credit_hours: number;
department: {
    id: number;
    name: string;
  };
}


export default function MangeCourse(){
    const [showForm, setShowForm] = useState(false);
    const [counter, setCounter] = useState(0);
     const [courses, setCourses] = useState<Course[]>([]);
     const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


      useEffect(()=>{
        const fetchCourses = async () =>{
            try{
                const res = await api.get('/api/courses/coursesList');
                console.log("Response", res.data);
                setCourses(res.data??[]);
            }catch(err: any){
                console.log(err);
                setError("fail to load courses");
            }finally{
                setLoading(false);
            }
        }
        fetchCourses()
    }, []);

    const changeSize = ()=>{
       setShowForm(!showForm);
    }



    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
           <article className={"grid grid-cols-8 min-h-screen bg-gray-300 w-full"}>

               <section className={showForm? 'col-span-4':'col-span-8'}>
                   <CourseList changeSize={changeSize} setCounter={setCounter} courses={courses} />
               </section>
               <section className={showForm && counter === 1? 'col-span-4':'hidden'}>
                   <NewCourse />
               </section>
               <section className={showForm && counter === 2? 'col-span-4':'hidden'}>
                   <UpdateCourse />
               </section>
               <section className={showForm && counter === 3? 'col-span-4':'hidden'}>
                   {}
               </section>

           </article>
        </main>
    )
}