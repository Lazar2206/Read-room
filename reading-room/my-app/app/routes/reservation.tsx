import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import type { Route } from "../+types/root";

export const meta: Route.MetaFunction = () => [
  { title: "Rezervacija" },
  { name: "description", content: "Kreiraj rezervaciju" },
];

interface LocationDetails {
  id: number;
  name: string;
  address: string;
  distance: string;
  totalSpots: number;
  availableSpots: number;
  description: string;
  hours: string;
}

const mockLocationDetails: Record<number, LocationDetails> = {
  1: {
    id: 1,
    name: "Fakultet organizacionih nauka",
    address: "Jove Ilića 154, Beograd",
    distance: "300 m",
    totalSpots: 50,
    availableSpots: 20,
    description: "Fakultet organizacionih nauka - studentska čitaonica",
    hours: "08:00 - 22:00",
  },
  2: {
    id: 2,
    name: "ETF",
    address: "Bulevar Kralja Aleksandra 73, Beograd",
    distance: "100 m",
    totalSpots: 80,
    availableSpots: 11,
    description: "Elektrotehnički fakultet - biblioteka",
    hours: "08:00 - 20:00",
  },
  3: {
    id: 3,
    name: "Univerzitetska biblioteka",
    address: "Birčaninova 1, Beograd",
    distance: "200 m",
    totalSpots: 200,
    availableSpots: 78,
    description: "Univerzitetska biblioteka - glavna soba za učenje",
    hours: "07:00 - 23:00",
  },
  4: {
    id: 4,
    name: "Masinski fakultet",
    address: "Kraljice Marije 16, Beograd",
    distance: "300 m",
    totalSpots: 60,
    availableSpots: 17,
    description: "Mašinski fakultet - čitaonica",
    hours: "08:00 - 21:00",
  },
  5: {
    id: 5,
    name: "Pravni fakultet",
    address: "Bulevar Kralja Aleksandra 67, Beograd",
    distance: "450 m",
    totalSpots: 45,
    availableSpots: 25,
    description: "Pravni fakultet - biblioteka",
    hours: "08:00 - 20:00",
  },
  6: {
    id: 6,
    name: "Medicinski fakultet",
    address: "Dr Subotica 8, Beograd",
    distance: "500 m",
    totalSpots: 70,
    availableSpots: 35,
    description: "Medicinski fakultet - čitaonica",
    hours: "08:00 - 22:00",
  },
};

export default function Reservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("1");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationId = parseInt(id || "1");
  const location = mockLocationDetails[locationId];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Molim vas popunite datum i vrijeme");
      return;
    }

    setIsSubmitting(true);

    // Simulacija slanja na backend
    setTimeout(() => {
      console.log("Rezervacija poslana:", {
        locationId,
        date: selectedDate,
        time: selectedTime,
        duration,
        notes,
      });

      alert("Rezervacija je uspješno kreirana!");
      navigate("/home");
    }, 1000);
  };

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Lokacija nije pronađena</p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Nazad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
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
        <h1 className="text-lg font-bold text-gray-900">Rezervacija</h1>
        <div className="w-10"></div>
      </div>

      {/* Location Info */}
      <div className="bg-white shadow-sm m-4 rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{location.name}</h2>
          <p className="text-gray-600 text-sm mt-1">📍 {location.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
          <div>
            <p className="text-gray-600 text-sm">Dostupna mjesta</p>
            <p className="text-2xl font-bold text-green-600">
              {location.availableSpots}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Radno vrijeme</p>
            <p className="text-sm font-semibold text-gray-900">
              {location.hours}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
          {location.description}
        </div>
      </div>

      {/* Reservation Form */}
      <div className="bg-white shadow-sm m-4 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Odaberi vrijeme</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Datum
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vrijeme početka
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Odaberite vrijeme</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trajanje (sati)
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">1 sat</option>
              <option value="2">2 sata</option>
              <option value="3">3 sata</option>
              <option value="4">4 sata</option>
              <option value="5">5 sati</option>
              <option value="6">6 sati</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Napomena (opciono)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Dodaj napomenu..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Slanje..." : "Kreiraj rezervaciju"}
          </button>
        </form>
      </div>
    </div>
  );
}
