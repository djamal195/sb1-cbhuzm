export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'banned';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}