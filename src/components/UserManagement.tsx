import React, { useState } from 'react';
import { User, UserPlus, Shield, Ban } from 'lucide-react';
import type { User as UserType } from '../types/auth';

export function UserManagement() {
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [users, setUsers] = useState<UserType[]>([
    {
      id: '1',
      username: 'djamal19',
      password: 'haxer20',
      role: 'admin',
      status: 'active',
      createdAt: '2024-03-10'
    }
  ]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserType = {
      id: Date.now().toString(),
      username: newUser.username,
      password: newUser.password,
      role: newUser.role as 'admin' | 'moderator' | 'user',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setNewUser({ username: '', password: '', role: 'user' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <UserPlus className="w-6 h-6" />
          Ajouter un utilisateur
        </h3>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rôle
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-md"
              >
                <option value="user">Utilisateur</option>
                <option value="moderator">Modérateur</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ajouter
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Liste des utilisateurs</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3">Utilisateur</th>
                <th className="pb-3">Rôle</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3">Date de création</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700/50">
                  <td className="py-4">{user.username}</td>
                  <td>
                    <span className="flex items-center gap-1">
                      {user.role === 'admin' && <Shield className="w-4 h-4 text-blue-500" />}
                      {user.role === 'moderator' && <Shield className="w-4 h-4 text-green-500" />}
                      {user.role === 'user' && <User className="w-4 h-4 text-gray-500" />}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status === 'active' ? 'Actif' : 'Banni'}
                    </span>
                  </td>
                  <td>{user.createdAt}</td>
                  <td>
                    <div className="flex gap-2">
                      {user.role !== 'admin' && (
                        <>
                          <button 
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-yellow-500"
                            onClick={() => {
                              const newRole = user.role === 'user' ? 'moderator' : 'user';
                              setUsers(users.map(u => 
                                u.id === user.id ? { ...u, role: newRole } : u
                              ));
                            }}
                          >
                            <Shield size={18} />
                          </button>
                          <button 
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-500"
                            onClick={() => {
                              const newStatus = user.status === 'active' ? 'banned' : 'active';
                              setUsers(users.map(u => 
                                u.id === user.id ? { ...u, status: newStatus } : u
                              ));
                            }}
                          >
                            <Ban size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}