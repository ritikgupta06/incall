"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

export default function Profile() {
  const router = useRouter();
  const Logout = async () => {
    try {
      const response = await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    }catch(error: any) {
      toast.error(error.response.data.message)
    }
  }
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

          <hr />
          <button 
          onClick={Logout}
          className="w-full bg-red-500 text-white p-2 rounded-md">LOGOUT</button>
        </div>
      </div>
    </div>
  );
}
