import { Provider } from "react-redux";
import { store } from "./app/store.js";
// import AuthModal from "./components/auth/AuthModal";
import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-900 text-white">
        <RegisterForm />
      </div>
    </Provider>
  );
}

export default App;
