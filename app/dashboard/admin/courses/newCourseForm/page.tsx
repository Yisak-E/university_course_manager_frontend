'use client';
import {useState} from "react";

const fake =[{title:"A"}, {title:"B"}, {title:"C"}]
export default function NewCourse(){
    const [departments, setDepartments] = useState(fake);



    return(
        <main className={"flex flex-col justify-center align-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 min-h-screen p-10 w-full "}>
            <form action="" method="POST" >
                <fieldset className={"w-full lg:w-auto "}>

                          <table className={'flex flex-col items-center justify-center '}>
                              <tbody className={"bg-yellow-100/50 rounded-lg p-4"}>
                              <tr>
                                  <td colSpan={2} className={"col-span-1"}>
                                      <legend className={'text-center text-3xl italic  '}>Add Course</legend>
                                  </td>
                              </tr>
                              <tr >
                                 <td><label htmlFor="code" className="font-semibold text-lg ">Course code:</label></td>
                                  <td><input type="text" name={'code'} className={' border-1 border-black bg-white/50 h-10 rounded-lg w-140 my-2'}/></td>
                              </tr>

                               <tr>
                                   <td><label htmlFor={'title'} className="font-semibold text-lg ">Course: </label></td>
                                   <td><input type="text" name={'title'} className={' border-1 border-black bg-white/50 h-10 rounded-lg w-140 my-2'}/></td>
                               </tr>

                               <tr>
                                   <td className={''}><label htmlFor="department" className=" font-semibold text-lg  mr-5">Departments: </label></td>
                                   <td><select  name={'departments'} className={'border-1 border-black bg-white/70 h-10 rounded-lg  my-2 w-140'}>
                                    {
                                        departments.map((department, id) => (
                                            <option key={id} value={id}>{department.title}</option>
                                        ))
                                    }
                                </select></td>
                               </tr>

                              <tr>
                                   <td><label htmlFor={'credit'} className="font-semibold text-lg ">Credit Hours: </label></td>
                                   <td><input type="number" name={'credit'} className={' border-1 border-black bg-white/50 h-10 rounded-lg w-140 my-2'}/></td>
                               </tr>

                              <tr>
                                  <td colSpan={2} className={'w-1/2 text-center pt-3'}>
                                      <button type={'submit'} className={"bg-blue-500/40 font-semibold py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-blue-500"}>create course</button>
                                  </td>
                              </tr>

                              </tbody>
                          </table>

                </fieldset>
            </form>
        </main>
    )
}