'use client';
import {useState, useEffect} from 'react';
import api from "@/lib/api/axios";

interface Course {
id: number;
code: string;
title: string;
credits: number;
departmentName: string;
}

export default function CourseList() {
    const [index, setIndex] = useState(0);
    const [loding, setLoading] = useState(true);
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState("");

    useEffect(()=>{
        const fetchCourses = async () =>{
            try{
                const res = await api.get('api/courses');
                console.log("Response", res.data);
                setCourses(res.data);
            }catch(err: any){
                console.log(err);
                setError("fail to load courses");
            }finally{
                setLoading(false);
            }
        }
        fetchCourses()
    }, []);

    if(loding){
        return(
            <div className={'flex flex-col justify-center items-center'}>
                <p className={'loading '}>
                    Loading...
                </p>
            </div>
        )
    }
    return (
        <main className={'mt-10'}>
            <div className={'flex flex-col justify-center items-center'}>
                {
                    courses.length > 0 ? (
                        courses.slice(index, index + 10).map((course: Course, idx: number) => (
                            <p key={course.id}>
                                {idx + 1}. {course.title} - {course.departmentName} - {course.credits}
                            </p>
                        ))
                    ) : (
                        <div className={'w-1/2 mx-auto'}> No course for now</div>
                    )
                }
            </div>

        </main>
    )
}

function CourseCard({id, code, title, credits, departmentName}: {id: number, code: string, title: string, credits: number, departmentName: string }) {
    return (
        <div className={'inline'}>
            <p>{id}. {code} {title} {credits} {departmentName}</p>
        </div>
    )
}