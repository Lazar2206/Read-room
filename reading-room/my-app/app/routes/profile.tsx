import { useNavigate } from "react-router";
import type { Route } from "../+types/root";

export const meta: Route.MetaFunction = () => [
  { title: "Moj Profil" },
  { name: "description", content: "Moj profil" },
];

export default function Profile() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  const userProfile = storedUser ? JSON.parse(storedUser) : null;

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#FFF2E6] flex flex-col pb-20">
        <div className="bg-[#ece0d1] shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Moj Profil</h1>
          <div className="w-10"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Niste prijavljeni. Molim vas prijavite se.</p>
        </div>
      </div>
    );
  }

  const reservations = [
    {
      id: 1,
      location: "Fakultet organizacionih nauka",
      date: "2026-01-20",
      time: "14:00",
    },
    {
      id: 2,
      location: "Univerzitetska biblioteka",
      date: "2026-01-22",
      time: "10:00",
    },
  ];

  return (
   <div className="min-h-screen bg-[#FFF2E6] flex flex-col pb-20">
      {/* Header */}
      <div className="bg-[#ece0d1] shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Moj Profil</h1>
        <div className="w-10"></div>
      </div>

      {/* Profile Info */}
      <div className="bg-[#ece0d1] shadow-sm m-4 rounded-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userProfile.firstName.charAt(0)}
            {userProfile.lastName.charAt(0)}
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {userProfile.firstName} {userProfile.lastName}
          </h2>
          <p className="text-gray-600">{userProfile.email}</p>
        </div>

        <div className="space-y-4 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fakultet:</span>
            <span className="font-semibold text-gray-900">
              {userProfile.faculty}
            </span>
          </div>
        </div>
      </div>

      {/* Reservations */}
      <div className="m-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Moje Rezervacije
        </h3>

        {reservations.length > 0 ? (
          <div className="space-y-3">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-[#ece0d1] rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="font-semibold text-gray-900">
                  {reservation.location}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  📅 {new Date(reservation.date).toLocaleDateString("sr-RS")}
                </div>
                <div className="text-sm text-gray-600">
                  🕐 {reservation.time}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 text-center text-gray-500">
            Nema rezervacija
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="m-4 mt-6">
        <button
          onClick={() => {
            navigate("/");
          }}
         className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#AF255B] hover:bg-[#9A1F50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF255B]"

        >
          Odjava
        </button>
      </div>
    </div>
  );
}
