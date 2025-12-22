import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user storage (in production, this would be a real backend)
const USERS_KEY = 'gupta_album_users';
const SESSION_KEY = 'gupta_album_session';

interface StoredUser extends User {
  password: string;
}

const getStoredUsers = (): StoredUser[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUser = (user: StoredUser) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const findUserByEmail = (email: string): StoredUser | undefined => {
  return getStoredUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const signUp = async (name: string, email: string, phone: string, password: string) => {
    // Validate inputs
    if (!name || !email || !phone || !password) {
      return { success: false, error: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Create new user
    const newUser: StoredUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password
    };

    saveUser(newUser);

    // Auto sign in after signup
    const sessionUser: User = { id: newUser.id, name, email, phone };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  };

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    const storedUser = findUserByEmail(email);
    
    if (!storedUser) {
      return { success: false, error: 'No account found with this email. Please sign up first.' };
    }

    if (storedUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const sessionUser: User = {
      id: storedUser.id,
      name: storedUser.name,
      email: storedUser.email,
      phone: storedUser.phone
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true };
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
