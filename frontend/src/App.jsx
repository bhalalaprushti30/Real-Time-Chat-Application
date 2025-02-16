import './App.css';
import Login from './components/Login';
import ChatPage from './components/ChatPage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login } from './Redux/authenticationSlice';

function App() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.authentication?.username);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      dispatch(login(storedUsername)); 
    }
    setLoading(false); // Set loading to false after checking
  }, [dispatch]);

  if (loading) return null; // Prevent rendering while checking localStorage

  return (
    <div>
      {username ? <ChatPage /> : <Login />}
    </div>
  );
}

export default App;
