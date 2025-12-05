// app/page.tsx
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">University Management System</h1>

      <p className="text-lg text-gray-700 mb-8">
        Manage courses, students, instructors and more.
      </p>

      <a
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Login
      </a>
    </main>
  );
}
