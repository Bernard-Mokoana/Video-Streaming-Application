import { useDispatch } from "react-redux";
import { openAuthModal } from "../auth/authSlice";

function LoginButton() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(openAuthModal("login"))}
      className="px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white"
    >
      Sign In
    </button>
  );
}
