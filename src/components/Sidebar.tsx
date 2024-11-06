import React from 'react';
import { LayoutDashboard, Upload, Users, Film, LogOut } from 'lucide-react';

interface SidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activePath, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { path: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: 'upload', icon: Upload, label: 'Télécharger' },
    { path: 'films', icon: Film, label: 'Films' },
    { path: 'users', icon: Users, label: 'Utilisateurs' },
  ];

  return (
    <aside className="w-64 bg-gray-900 p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-4">
        <Film className="w-8 h-8 text-blue-500" />
        <span className="text-xl font-bold">Jekle</span>
      </div>
      
      <nav className="flex-1 mt-8">
        <ul className="space-y-2">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <button
                onClick={() => onNavigate(path)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  activePath === path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button 
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-2 mt-auto text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Déconnexion
      </button>
    </aside>
  );
}