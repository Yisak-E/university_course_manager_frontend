'use client'

import Link from "next/link";
import {useState} from "react";
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

const componentsMap = {
  courseList: <CourseList />,
  newCourse: <NewCourse />,
  updateCourse: <UpdateCourse />,
  settings: <Settings />
};


export default function MangeCourse(){
    const [selectedCompo, setSelectedCompo] = useState(componentsMap.courseList);



    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
           <article className={"grid grid-cols-8 min-h-screen bg-gray-300 w-full"}>
               <section className={' lg:col-span-1 p-5 bg-gray-400'}>
                   <h3 className={'text-2xl font-semibold mb-5'}>Manage course</h3>
                   <ul>
                       <li >
                           <button
                               className={'border-1 border-black p-4 mb-2 w-full hover:cursor-pointer'}
                               onClick={()=>{
                                setSelectedCompo(componentsMap.courseList)
                           }}>View Course</button>
                       </li>

                       <li >
                            <button
                                className={'border-1 border-black p-4 mb-2 w-full hover:cursor-pointer'}
                                onClick={()=>{
                                setSelectedCompo(componentsMap.newCourse)
                            }}
                                >New Course</button>
                       </li>

                       <li >
                        <button
                            className={'border-1 border-black p-4 mb-2 w-full hover:cursor-pointer'}
                            onClick={()=>{
                                setSelectedCompo(componentsMap.updateCourse)
                            }}
                        >Edit Course</button></li>

                       <li >
                        <button
                            className={'border-1 border-black p-4 mb-2 w-full hover:cursor-pointer'}
                            onClick={()=>{
                                setSelectedCompo(componentsMap.settings)
                            }}
                        >Setting</button></li>
                   </ul>

               </section>
               <section className={'lg:col-span-5'}>
                   {selectedCompo}

               </section>
           </article>
        </main>
    )
}