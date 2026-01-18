import { useState } from "react";
import { useNavigate } from "react-router";


export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [faculty, setFaculty] = useState("");
  const faculties = [
  "Elektrotehnički fakultet",
  "Mašinski fakultet",
  "Građevinski fakultet",
  "Medicinski fakultet",
  "Pravni fakultet",
  "Ekonomski fakultet",
];
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Molim vas popunite sva polja");
      return;
    }
   
    console.log("Login sa:", { email, password });
   
    navigate("/home");
  };

 const handleSignUp = (e: React.FormEvent) => {
  e.preventDefault();

  if (!firstName || !lastName || !email || !password || !faculty) {
    alert("Molim vas popunite sva polja");
    return;
  }

  console.log("Sign up sa:", {
    firstName,
    lastName,
    email,
    password,
    faculty,
  });

  setIsLogin(true);
  setFirstName("");
  setLastName("");
  setEmail("");
  setPassword("");
  setFaculty("");
  alert("Nalog je uspešno kreiran! Molim vas prijavite se.");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isLogin ? (
          <>
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#AF255B]">
              Prijava
            </h2>
              <div className="flex justify-center mt-4">
              <img
               src="/img/logo.png"
               alt="Čitaonica Trenutly logo"
               className="h-64 w-auto"
               />
              </div>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Studentski mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
               <hr></hr>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Šifra
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Lozinka"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
               <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#AF255B] hover:bg-[#9A1F50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF255B]"
               >
                Prijavite se
              </button>
              </div>

              <div className="space-y-2">
              <p className="text-center text-sm font-medium text-[#AF255B]">
               Nemate nalog?
              </p>

               <button
                type="button"
                onClick={() => {
                setIsLogin(false);
                setEmail("");
              setPassword("");
              }}
    className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Registrujte se
  </button>
</div>
            </form>
          </>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Kreiraj nalog
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    Ime
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Unesite ime"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Prezime
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Unesite prezime"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                 <div>
                <label htmlFor="faculty" className="sr-only">
                Fakultet
                </label>
                <select
                id="faculty"
                name="faculty"
                required
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                <option value="">Izaberite fakultet</option>
                {faculties.map((fakultet) => (
                <option key={fakultet} value={fakultet}>
                {fakultet}
                </option>
                ))}
                </select>
                </div>
                <div>
                  <label htmlFor="signupEmail" className="sr-only">
                    Studentski email
                  </label>
                  <input
                    id="signupEmail"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Unesite studentski email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="signupPassword" className="sr-only">
                    Šifra
                  </label>
                  <input
                    id="signupPassword"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Unesite šifru"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Kreiraj nalog
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setFaculty("");
                  }}
                  className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Nazad na Login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
