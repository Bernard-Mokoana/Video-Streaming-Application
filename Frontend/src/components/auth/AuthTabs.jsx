import { useDispatch, useSelector } from "react-redux";
import { switchTab } from "./authSlice.js";

export default function AuthTabs() {
  const { activeTab } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="border-b border-dark-600">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => dispatch(switchTab("login"))}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "login"
              ? "border-primary-500 text-primary-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => dispatch(switchTab("register"))}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === "register"
              ? "border-primary-500 text-primary-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          Register
        </button>
      </nav>
    </div>
  );
}
