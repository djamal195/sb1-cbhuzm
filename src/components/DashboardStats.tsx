import React from 'react';
import { Users, Film, Eye, Clock } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      icon: Film,
      label: 'Films totaux',
      value: '24',
      color: 'text-blue-500',
    },
    {
      icon: Users,
      label: 'Utilisateurs',
      value: '156',
      color: 'text-green-500',
    },
    {
      icon: Eye,
      label: 'Vues totales',
      value: '2,451',
      color: 'text-purple-500',
    },
    {
      icon: Clock,
      label: 'Temps de visionnage',
      value: '1,285h',
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gray-700 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}