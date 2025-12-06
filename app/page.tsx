// app/page.tsx
'use client'


export default function HomePage() {


    return (
        <main className=" bg-img-uv flex flex-col items-center justify-center h-screen bg-gray-100">
            <article>
                <section className="flex flex-col items-center justify-center ">
            <h1 className="text-4xl text-black font-bold mb-6 ">University Management System</h1>

            <p className="text-lg text-black text-shadow-blue-600 text-shadow-2xs mb-8">
            Manage courses, students, instructors and more.
            </p>

            <a
                href="/auth/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                Login
            </a>
        </section>
     </article>


    </main>
  );
}
