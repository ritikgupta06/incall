export default function Profile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Profile
        </h1>
        <p className="text-center text-gray-600">
          This is your profile page. You can view and edit your profile
          information here.
        </p>
        <div className="mt-6">
          <p className="text-gray-700">Username: JohnDoe</p>
          <p className="text-gray-700">Email:</p>
        </div>
      </div>
    </div>
  );
}
