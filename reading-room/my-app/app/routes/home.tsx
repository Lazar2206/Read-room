import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "../+types/root";

export const meta: Route.MetaFunction = () => [
  { title: "Početna" },
  { name: "description", content: "Pretraga lokacija" },
];

interface Location {
  id: number;
  name: string;
  address: string;
  distance: string;
  isFavorite?: boolean;
}

const mockLocations: Location[] = [
  {
    id: 1,
    name: "Fakultet organizacionih nauka",
    address: "20 slobodnih mesta",
    distance: "300 m",
    isFavorite: true,
  },
  {
    id: 2,
    name: "ETF",
    address: "11 slobodnih mesta",
    distance: "100 m",
  },
  {
    id: 3,
    name: "Univerzitetska biblioteka",
    address: "78 slobodnih mesta",
    distance: "200 m",
  },
  {
    id: 4,
    name: "Masinski fakultet",
    address: "17 slobodnih mesta",
    distance: "300 m",
  },
  {
    id: 5,
    name: "Pravni fakultet",
    address: "25 slobodnih mesta",
    distance: "450 m",
  },
  {
    id: 6,
    name: "Medicinski fakultet",
    address: "35 slobodnih mesta",
    distance: "500 m",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>(
    mockLocations
      .filter((loc) => loc.isFavorite)
      .map((loc) => loc.id)
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleLocationClick = (locationId: number) => {
    navigate(`/reservation/${locationId}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent, locationId: number) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const filteredLocations = mockLocations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteLocations = filteredLocations.filter((loc) =>
    favorites.includes(loc.id)
  );
  const otherLocations = filteredLocations.filter(
    (loc) => !favorites.includes(loc.id)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Search Bar */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-2 bg-gray-200 rounded-full px-4 py-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Pretraži lokacije..."
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20 p-4">
        {/* Favoriti */}
        {favoriteLocations.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-600 mb-2 px-2">
              FAVORITI
            </h2>
            {favoriteLocations.map((location) => (
              <div
                key={location.id}
                onClick={() => handleLocationClick(location.id)}
                className="bg-purple-100 rounded-lg p-4 mb-3 cursor-pointer hover:bg-purple-200 transition flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {location.address}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold text-gray-700">
                    {location.distance}
                  </div>
                  <button
                    onClick={(e) => handleToggleFavorite(e, location.id)}
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* U blizini - Ostale lokacije */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-2 px-2">
            U BLIZINI
          </h2>
          {otherLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationClick(location.id)}
              className="bg-white rounded-lg p-4 mb-3 cursor-pointer hover:bg-gray-50 transition flex items-center justify-between shadow-sm"
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {location.name}
                </div>
                <div className="text-sm text-gray-600">{location.address}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold text-gray-700">
                  {location.distance}
                </div>
               <button
                onClick={(e) => handleToggleFavorite(e, location.id)}
                className="hover:opacity-80 transition"
                >
                <img
                src="/img/favorite.svg"
                alt="Favorit"
                className="w-6 h-6"
                />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Nema pronađenih lokacija
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center p-4">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          title="Odjava"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>

        {/* Location Button */}
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          title="Lokacija"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
          </svg>
        </button>

        {/* Profile Button */}
        <button
          onClick={handleProfileClick}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
          title="Profil"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
