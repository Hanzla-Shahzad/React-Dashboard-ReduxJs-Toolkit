import { IoLogoGithub } from "react-icons/io";
export default function Header() {
  return (
    <>
      <div className="bg-[#008080] h-13 ps-2 pt-2 w-full flex justify-between">
        <p className="text-3xl font-semibold text-white">Dashboard</p>
        <div className="flex gap-5 items-center pe-7 pb-1">
          <p className="text-white font-[sans-serif]">About</p>
          <h1>
            <IoLogoGithub className="text-white text-2xl" />
          </h1>
        </div>
      </div>
    </>
  );
}
