import { Provider } from "react-redux";
import { store } from "./app/store.js";
// import AuthModal from "./components/auth/AuthModal";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import VideoCard from "./components/ui/cards/VideoCard.jsx";
function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
      </div>
    </Provider>
  );
}

export default App;
