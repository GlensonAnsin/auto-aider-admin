import { useState, useEffect } from 'react';
import { loginAdmin } from '../../services/backendApi';
import { useNavigate } from 'react-router';
import { getAccessToken } from '../../utils/tokenStorage';
import Logo from '../../assets/auto-aider-logo-dark-blue.png';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) {
        navigate('/');
      }
    })();
  }, [navigate]);

  const toggleCheckbox = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      setLoginLoading(true);
      const res = await loginAdmin(username.trim(), password.trim());

      if (res === '401') {
        setError('Invalid credentials.');
        return;
      }

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen">
      <div className="w-full h-1/10 bg-[#000B58]"></div>
      <div className="h-4/5 w-full bg-[#f2f4f7] flex items-center justify-center flex-col">
        <div className="bg-white rounded-xl p-5 shadow-lg">
          <img src={Logo} alt="logo" width={100} height={100} className="justify-self-center" />
          <h1 className="font-montserrat text-[#000B58] font-bold text-2xl text-center m-3">Auto AIDER</h1>
          <div className="flex flex-col mb-5">
            <label className="input validator bg-[#f2f4f7]">
              <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
                placeholder="Username"
                className="font-montserrat text-black text-base outline-none"
                onKeyDown={(e) => (e.key === 'Enter' ? handleLogin() : null)}
              />
            </label>
          </div>

          <div className="flex flex-col mb-2">
            <label className="input validator bg-[#f2f4f7]">
              <svg className="h-[1em] opacity-50 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={passwordVisible ? 'text' : 'password'}
                required
                placeholder="Password"
                className="font-montserrat text-black text-base outline-none"
                onKeyDown={(e) => (e.key === 'Enter' ? handleLogin() : null)}
              />
            </label>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox checkbox-sm bg-[#f2f4f7] checked:bg-[#000B58]"
              onClick={toggleCheckbox}
            />
            <label htmlFor="checkbox" className="font-montserrat text-sm text-[#333]">
              Show password
            </label>
          </div>

          {error && (
            <div className="bg-[#f2f4f7] p-3 w-full mb-5 rounded-sm">
              <p className="font-montserrat text-sm text-[#FF0000] text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-md bg-[#000B58] hover:bg-[#2A3A8E] border-none w-full font-montserrat text-base text-white"
            onClick={handleLogin}
          >
            {loginLoading ? <span className="loading loading-dots loading-sm"></span> : <p>Log In</p>}
          </button>
        </div>
      </div>
      <div className="w-full h-1/10 bg-[#000B58]"></div>
    </main>
  );
}
