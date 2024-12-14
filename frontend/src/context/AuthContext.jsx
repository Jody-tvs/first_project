import React, { createContext, useState, useEffect } from 'react';
import checkUserSession from '../utils/checkUserSession';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Ajouté pour savoir si on charge les infos de l'utilisateur

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.isAdmin || false);

        const session = await checkUserSession();
        
        if (!session.isAuthenticated) {
          logout(); // Si le token est invalide, on déconnecte l'utilisateur
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
      }

      setLoading(false); // Fin de la vérification de session
    };

    fetchUserData();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.isAdmin || false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, loading, login, logout, setIsAuthenticated, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}