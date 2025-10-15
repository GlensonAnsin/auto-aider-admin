import { useState } from 'react';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const toggleCheckbox = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <main className="bg-[url('/login-bg.jpg')] bg-cover bg-center h-screen w-screen bg-no-repeat">
      <div className="h-full w-full backdrop-blur-sm bg-black/20 flex items-center justify-center flex-col">
        <div className="bg-white/50 rounded-xl p-5">
          <h2 className="font-montserrat font-bold text-2xl text-center mb-5 text-white">Log In</h2>
          <form>
            <div className="flex flex-col mb-5">
              <label className="input validator bg-white">
                <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  className="font-montserrat text-black text-base outline-none"
                />
              </label>
            </div>
            <div className="flex flex-col mb-2">
              <label className="input validator bg-white">
                <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  className="font-montserrat text-black text-base outline-none"
                />
              </label>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox checkbox-sm checked:bg-[#000B58]"
                onClick={() => toggleCheckbox()}
              />
              <label htmlFor="checkbox" className="font-montserrat text-sm text-white">
                Show password
              </label>
            </div>
            <button className="btn btn-md bg-[#000B58] hover:bg-[#2A3A8E] border-none w-full font-montserrat text-base text-white">
              Log In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
