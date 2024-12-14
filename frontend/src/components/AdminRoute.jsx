import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);

  // Si le contexte est encore en train de se charger, on affiche un écran de chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur n'est pas admin, redirige vers la page d'accueil
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Si l'utilisateur est authentifié et admin, retourne les enfants (la page demandée)
  return children;
};

export default AdminRoute;
