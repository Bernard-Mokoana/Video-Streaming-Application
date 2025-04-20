import { GoogleIcon, GitHubIcon, TwitterIcon } from "../icons.jsx";

export default function SocialAuth() {
  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dark-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-dark-800 text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => handleSocialLogin("google")}
          className="inline-flex justify-center py-2 px-4 border border-dark-600 rounded-md shadow-sm bg-dark-700 text-sm font-medium text-light hover:bg-dark-600 transition-colors"
        >
          <GoogleIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleSocialLogin("github")}
          className="inline-flex justify-center py-2 px-4 border border-dark-600 rounded-md shadow-sm bg-dark-700 text-sm font-medium text-light hover:bg-dark-600 transition-colors"
        >
          <GitHubIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleSocialLogin("twitter")}
          className="inline-flex justify-center py-2 px-4 border border-dark-600 rounded-md shadow-sm bg-dark-700 text-sm font-medium text-light hover:bg-dark-600 transition-colors"
        >
          <TwitterIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
