import {
  Bars3Icon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  BellIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <header className="bg-zinc-900 text-white h-16 flex items-center px-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center justify-between w-full max-w-8xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-zinc-700 transition duration-200">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex items-center cursor-pointer">
            <div className="text-red-500 font-bold text-xl mr-1">
              <VideoCameraIcon className="h-7 w-7" />
            </div>
            <div className="text-xl font-bold hidden xs:block">
              {/* Stream<span className="text-red-500">vidz</span> */}
              <h1>StreamVidz</h1>
            </div>
          </div>
        </div>

        {/* Center Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-6">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-l-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="flex items-center justify-center h-full bg-zinc-700 px-5 rounded-r-full hover:bg-zinc-600 transition duration-200">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
          <button className="ml-2 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition duration-200">
            <MicrophoneIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 rounded-full hover:bg-zinc-700 md:hidden transition duration-200">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-zinc-700 transition duration-200 hidden sm:flex">
            <VideoCameraIcon className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-zinc-700 transition duration-200">
            <BellIcon className="h-5 w-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-medium hover:bg-blue-600 cursor-pointer transition duration-200">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
