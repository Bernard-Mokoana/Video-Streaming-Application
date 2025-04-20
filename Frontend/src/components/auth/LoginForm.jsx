import { useForm } from "react-hook-form";
import { loginUser } from "./authSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-light focus:ring-2 focus:ring-primary-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          className="w-full px-4 py-2 rounded-lg bg-dark-700 border border-dark-600 text-light"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium disabled:opacity-70"
      >
        {status === "loading" ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
