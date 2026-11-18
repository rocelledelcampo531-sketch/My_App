import React, { createContext, useContext, useState } from 'react';

type User = {
  name?: string;
  fullName?: string;
  username?: string;
  email?: string;
  bio?: string;
  avatar?: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  author?: string;
};

type AppContextType = {
  user: User | null;
  posts: Post[];
  login: (userData: User) => Promise<void>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  addPost: (post: { title: string; content: string }) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    name: 'User',
    fullName: 'Adang',
    username: '@ediwow',
    email: 'adang@gmail.com',
    bio: 'chengeloi',
    avatar: '',
  });

  const [posts, setPosts] = useState<Post[]>([
    { id: '1', title: 'Welcome to Adang!', content: 'Your mobile app feed is now up and running smoothly.' },
    { id: '2', title: 'Getting Started', content: 'You can now edit your profile and test out posts.' },
  ]);

  const login = async (userData: User) => {
    setUser({ ...user, ...userData });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  const addPost = (newPost: { title: string; content: string }) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      author: user?.fullName || user?.name || 'User',
    };
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <AppContext.Provider value={{ user, posts, login, logout, updateProfile, addPost }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};