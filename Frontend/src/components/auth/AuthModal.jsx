import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal } from "./authSlice.js";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SocialAuth from "./SocialAuth";

export default function AuthModal() {
  const { isOpen, activeTab } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") dispatch(closeAuthModal());
    };

    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, dispatch]);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeAuthModal());
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-xl bg-dark-800 p-6 shadow-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-light">
            {activeTab === "login" ? "Sign In to VideoTube" : "Create Account"}
          </h2>
          <button
            onClick={() => dispatch(closeAuthModal())}
            className="text-gray-400 hover:text-light transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <AuthTabs />
        <div className="mt-6">
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
        <div className="mt-8">
          <SocialAuth />
        </div>
      </div>
    </div>
  );
}
