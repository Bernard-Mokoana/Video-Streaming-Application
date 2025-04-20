import { useDispatch, useSelector } from 'react-redux';
import { closeAuthModal } from './authSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function AuthModal() {
  const { isOpen, activeTab } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl bg-dark-800 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-light">
            {activeTab === 'login' ? 'Sign In' : 'Register'}
          </h2>
          <button 
            onClick={() => dispatch(closeAuthModal())}
            className="text-gray-400 hover:text-light"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <TabSwitcher />
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        <SocialAuth />
      </div>
    </div>
  );
}