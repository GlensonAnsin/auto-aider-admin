import { useLoaderData } from 'react-router';

export default function Home() {
  const { res } = useLoaderData();

  return (
    <div>
      <h1 className="font-montserrat text-3xl text-[#000B58] font-bold">{`Welcome, ${res.firstname}`}</h1>
      <div className="stats shadow-lg bg-white mt-10">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block h-8 w-8">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z"
                  stroke="#000B58"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{' '}
              </g>
            </svg>
          </div>
          <div className="stat-title font-montserrat text-[#333] text-base font-bold">Car Owners</div>
          <div className="stat-value font-montserrat text-[#000B58] text-base">31K</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              fill="#000B58"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 256 253"
              enableBackground="new 0 0 256 253"
              xmlSpace="preserve"
              className="inline-block h-8 w-8"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path d="M2,69c0,13.678,9.625,25.302,22,29.576V233H2v18h252v-18h-22V98.554c12.89-3.945,21.699-15.396,22-29.554v-8H2V69z M65.29,68.346c0,6.477,6.755,31.47,31.727,31.47c21.689,0,31.202-19.615,31.202-31.47c0,11.052,7.41,31.447,31.464,31.447 c21.733,0,31.363-20.999,31.363-31.447c0,14.425,9.726,26.416,22.954,30.154V233H42V98.594C55.402,94.966,65.29,82.895,65.29,68.346 z M254,54H2l32-32V2h189v20h-0.168L254,54z M167.877,202.446c0.13,1.168,0,2.551-0.303,3.849l-11.027-10.162l-9.946,10.854 l11.157,10.119c-1.297,0.432-2.551,0.735-3.849,0.735c-3.849,0.13-7.135-1.038-9.946-3.589c-2.811-2.681-4.324-5.795-4.454-9.643 c0-1.341,0.13-2.854,0.432-4.151l-2.681-2.551l-16.043-14.66L94.06,213.17c-1.643,2.205-4.195,3.719-7.135,3.719 c-4.757,0-8.605-3.849-8.605-8.605c0-2.551,0.995-4.887,2.941-6.53l28.195-29.233L92.417,156.91 c-1.341,0.605-2.854,0.908-4.151,0.908c-3.849,0.13-7.135-1.038-9.946-3.589s-4.324-5.665-4.454-9.514 c-0.13-1.168,0-2.551,0.303-3.849l11.157,10.119l9.86-10.811l-11.157-10.119c1.168-0.432,2.551-0.735,3.849-0.735 c3.849-0.13,7.135,1.038,9.946,3.589c2.811,2.508,4.324,5.795,4.454,9.643c0.13,1.297,0,2.551-0.303,3.849l17.557,16.087 l12.843-13.881l-19.2-16.908l17.427-19.849l49.341,43.417l-17.427,19.849l-19.719-17.384l-12.411,14.66l19.287,17.643 c1.297-0.432,2.551-0.735,3.849-0.735c3.849-0.13,7.135,1.038,9.946,3.589C166.277,195.397,167.79,198.511,167.877,202.446z"></path>{' '}
              </g>
            </svg>
          </div>
          <div className="stat-title font-montserrat text-[#333] text-base font-bold">Registered Shop</div>
          <div className="stat-value font-montserrat text-[#000B58] text-base">4,200</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000B58" className="inline-block h-8 w-8">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <g>
                  {' '}
                  <path fill="none" d="M0 0h24v24H0z"></path>{' '}
                  <path d="M4.257 5.671l2.137 2.137a7 7 0 1 0 1.414-1.414L5.67 4.257A9.959 9.959 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-2.401.846-4.605 2.257-6.329zm3.571 3.572L12 13.414 13.414 12 9.243 7.828a5 5 0 1 1-1.414 1.414z"></path>{' '}
                </g>{' '}
              </g>
            </svg>
          </div>
          <div className="stat-title font-montserrat text-[#333] text-base font-bold">Scans Today</div>
          <div className="stat-value font-montserrat text-[#000B58] text-base">1,200</div>
        </div>
      </div>
    </div>
  );
}
