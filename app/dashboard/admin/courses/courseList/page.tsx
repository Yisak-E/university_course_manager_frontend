'use client';
import {useState, useEffect, JSX} from 'react';


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



// Accept props
interface CourseListProps {
  changeSize: () => void;
  setCounter: (value: number) => void;
  courses : Course[];

}



export default ({changeSize, setCounter, courses}: CourseListProps) => {
    const [index, setIndex] = useState(0);




    const handleChange = ({command}: {command: string})=>{
        if (command === "prev"){
            if (index - 10 > 0) {
                setIndex(index - 10);
            }
            else setIndex(0);
        }else{
            if(index + 10 < courses.length){
                setIndex(index + 10);
            }
            else{
                setIndex(courses.length-10);
            }
        }
    }



    return (
        <main className={'pt-10 h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600'}>

            <form action="" method={"PUT"}>
                <label htmlFor={'search'}>Search:</label>
                <input type="text" name={'search'}
                    className="p-2 text-gray-800 bg-white border-1 border-black-300 rounded-md text-sm font-medium leading-tight mb-4 ml-3 lg:w-[300px]"
                    />
            </form>
            <div className={' border-1 bg-white/50 rounded-lg w-6/7 mx-auto  '}>
                {
                    courses.length > 0 ? (
                        courses.slice(index, index + 10).map((course: Course, idx: number) => (
                            <div key={course.id} className={'mt-5 bg-amber-100 py-2 px-4 w-full grid grid-cols-12 ' } >
                                <p className={'col-span-1'}>{index + idx + 1} </p>
                                <p className={'font-semibold col-span-1'}>{course.code}</p>
                                <p className={'font-semibold col-span-5'}>{course.title}</p>
                                <p className={'font-semibold col-span-4'}> {course.department.name}</p>
                                <p className={'font-semibold col-span-1'}> {course.credit_hours}</p>
                            </div>
                        ))
                    ) : (
                        <div className={'w-1/2 mx-auto'}> No course for now</div>
                    )
                }
                <div  className={'mt-5 bg-gradient-to-br from-green-600 via-yellow-400 to-green-600 py-2 px-4 w-full  ' } >
                                <button className={"w-full text-center font-semibold"}
                                        onClick={()=>{
                                            changeSize();
                                            setCounter(2)
                                        }}
                                >Add Course</button>
                </div>
            </div>
            <div className={'mt-3'}>
                <button className={'bg-amber-800 rounded-lg text-white px-4 py-2 mr-3'}
                onClick={()=> (handleChange({command:"prev"}))}>prev</button>
                <button className={'bg-amber-800 rounded-lg text-white px-4 py-2'}
                 onClick={()=> (handleChange({command:"next"}))}>next</button>
            </div>
        </main>
    )
}



