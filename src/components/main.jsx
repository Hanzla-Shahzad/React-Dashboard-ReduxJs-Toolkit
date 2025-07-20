import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Thunks/userThunk";
import { NavLink } from "react-router-dom";

export default function Main() {
  const { data, error, pending } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <div className="pt-5 px-4 md:px-10">
      <p className="text-2xl font-semibold border-b border-gray-300 mb-5 py-2">
        User
      </p>

      {/* Table View for lg and up */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-[600px] w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-sm text-left">
                ID
              </th>
              <th className="border border-gray-300 p-3 text-sm text-left">
                Username
              </th>
              <th className="border border-gray-300 p-3 text-sm text-left">
                Name
              </th>
              <th className="border border-gray-300 p-3 text-sm text-left">
                Email Address
              </th>
              <th className="border border-gray-300 p-3 text-sm text-left">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((curElem) => (
                <tr key={curElem.id} className="text-sm">
                  <td className="border border-gray-300 px-2 py-3">
                    {curElem.id}
                  </td>
                  <td className="border border-gray-300 px-2 text-blue-500 hover:underline">
                    <NavLink to={`/posts/${curElem.id}`}>
                      {curElem.username}
                    </NavLink>
                  </td>
                  <td className="border border-gray-300 px-2">
                    {curElem.name}
                  </td>
                  <td className="border border-gray-300 px-2">
                    {curElem.email}
                  </td>
                  <td className="border border-gray-300 px-2">
                    {curElem.phone}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Card View for md and below */}
      <div className="lg:hidden space-y-4">
        {data &&
          data.map((curElem) => (
            <div
              key={curElem.id}
              className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white"
            >
              <p className="text-sm">
                <span className="font-semibold">ID:</span> {curElem.id}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Username:</span>{" "}
                <NavLink
                  to={`/posts/${curElem.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {curElem.username}
                </NavLink>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Name:</span> {curElem.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email:</span> {curElem.email}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> {curElem.phone}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
