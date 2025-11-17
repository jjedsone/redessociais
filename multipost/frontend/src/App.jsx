import { useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from './components/PostForm.jsx';
import Login from './components/Login.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/status`, {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpa o estado local
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="app-shell">
        <p>Verificando autenticação...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-shell">
      <div className="app-header">
        <div className="app-header-left">
          <h1>Multipost Dashboard</h1>
          <p className="subtitle">
            Envie vídeos, legendas e hashtags simultaneamente para YouTube, Instagram e TikTok.
          </p>
        </div>
        <div className="app-header-right">
          <div className="user-info">
            <div className="user-status">
              <span className="status-dot online" />
              <span>Online</span>
            </div>
            <span>•</span>
            <span>{user?.username || 'Usuário'}</span>
          </div>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
      <PostForm />
    </div>
  );
}

export default App;

