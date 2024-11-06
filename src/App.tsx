import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { UserManagement } from './components/UserManagement';
import { MovieList } from './components/MovieList';
import { MovieUpload } from './components/MovieUpload';
import { LoginPage } from './components/LoginPage';
import type { User } from './types/auth';

export default function App() {
  const [currentPath, setCurrentPath] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    if (username === 'djamal19' && password === 'haxer20') {
      setUser({
        id: '1',
        username: 'djamal19',
        password: 'haxer20',
        role: 'admin',
        status: 'active',
        createdAt: '2024-03-10'
      });
    } else {
      alert('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPath('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentPath) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Tableau de Bord</h2>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Derniers Films</h3>
                <MovieList />
              </div>
            </div>
          </div>
        );
      case 'upload':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Télécharger des Films</h2>
            <MovieUpload />
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
            <UserManagement />
          </div>
        );
      case 'films':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Gestion des Films</h2>
            <MovieList />
          </div>
        );
      default:
        return (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold">En développement</h2>
            <p className="text-gray-400">Cette section est en cours de construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar 
        activePath={currentPath} 
        onNavigate={setCurrentPath}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}