import React from 'react';
import { Ban, CheckCircle, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'banned';
  joinDate: string;
  reports: number;
}

const mockUsers: User[] = [
  { id: '1', name: 'Thomas Martin', email: 'thomas@example.com', status: 'active', joinDate: '2024-02-15', reports: 0 },
  { id: '2', name: 'Marie Dubois', email: 'marie@example.com', status: 'active', joinDate: '2024-02-14', reports: 2 },
  { id: '3', name: 'Lucas Bernard', email: 'lucas@example.com', status: 'banned', joinDate: '2024-02-10', reports: 5 },
];

export function UserList() {
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

  const handleAction = (userId: string, action: 'ban' | 'unban') => {
    console.log(`${action} user ${userId}`);
    setSelectedUser(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-3">Utilisateur</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3">Date d'inscription</th>
              <th className="pb-3">Signalements</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700/50">
                <td className="py-4">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-sm
                    ${user.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'}`}>
                    {user.status === 'active' ? 'Actif' : 'Banni'}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <span className={`${user.reports > 0 ? 'text-yellow-500' : 'text-gray-400'}`}>
                    {user.reports}
                  </span>
                </td>
                <td className="relative">
                  <button 
                    onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <MoreVertical size={20} />
                  </button>
                  
                  {selectedUser === user.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 z-10">
                      {user.status === 'active' ? (
                        <button
                          onClick={() => handleAction(user.id, 'ban')}
                          className="w-full px-4 py-2 text-left flex items-center gap-2 text-red-400 hover:bg-gray-800"
                        >
                          <Ban size={18} />
                          Bannir l'utilisateur
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(user.id, 'unban')}
                          className="w-full px-4 py-2 text-left flex items-center gap-2 text-green-400 hover:bg-gray-800"
                        >
                          <CheckCircle size={18} />
                          Réactiver l'utilisateur
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}