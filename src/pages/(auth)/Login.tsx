export default function Login() {
  return (
    <main className="bg-[url('/login-bg.jpg')] bg-cover bg-center h-screen w-screen bg-no-repeat">
      <div className="h-full w-full backdrop-blur-xs bg-black/30 flex items-center justify-center flex-col">
        <h1 className="font-montserrat font-bold text-3xl text-white mb-10">Auto AIDER Admin</h1>
        <div className="bg-white/50 rounded-xl p-5">
          <h2 className="font-montserrat font-bold text-2xl text-center mb-5">Login</h2>
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
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength={3}
                  maxLength={30}
                  title="Only letters, numbers or dash"
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
                  type="password"
                  required
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  className="font-montserrat text-black text-base outline-none"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="checkbox" className="checkbox checkbox-sm checked:bg-blue-800" />
              <label htmlFor="checkbox" className="font-montserrat text-sm">
                Show password
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
