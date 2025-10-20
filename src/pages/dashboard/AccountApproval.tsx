/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from 'react-router';

export default function AccountApproval() {
  const { res } = useLoaderData();

  return (
    <div>
      <h1 className="font-montserrat text-3xl text-[#000B58] font-bold">Account Approval</h1>
      <ul className="list bg-white rounded-box shadow-lg mt-10">
        <li className="font-montserrat p-4 pb-2 text-xs opacity-60 tracking-wide text-[#555]">
          Waiting for admin approval
        </li>

        {res.map((item: any) => (
          <li key={item.repair_shop_id} className="list-row">
            <div>
              <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
            </div>
            <div>
              <div className="font-montserrat text-[#333]">Dio Lupa</div>
              <div className="font-montserrat text-xs uppercase font-semibold opacity-60 text-[#555]">
                Remaining Reason
              </div>
            </div>
            <button className="btn bg-[#000B58] hover:bg-[#000B58]/75 border-none">View</button>
          </li>
        ))}

        <li className="list-row">
          <div>
            <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp" />
          </div>
          <div>
            <div className="font-montserrat text-[#333]">Ellie Beilish</div>
            <div className="font-montserrat text-xs uppercase font-semibold opacity-60 text-[#555]">
              Bears of a fever
            </div>
          </div>
          <button className="btn bg-[#000B58] hover:bg-[#000B58]/75 border-none">View</button>
        </li>

        <li className="list-row">
          <div>
            <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp" />
          </div>
          <div>
            <div className="font-montserrat text-[#333]">Sabrino Gardener</div>
            <div className="font-montserrat text-xs uppercase font-semibold opacity-60 text-[#555]">Cappuccino</div>
          </div>
          <button className="btn bg-[#000B58] hover:bg-[#000B58]/75 border-none">View</button>
        </li>
      </ul>
    </div>
  );
}
