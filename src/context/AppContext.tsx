import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  navigationStyle: 'top' | 'side';
  toggleNavigationStyle: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [navigationStyle, setNavigationStyle] = useState<'top' | 'side'>(() => {
    const saved = localStorage.getItem('navigationStyle');
    return (saved as 'top' | 'side') || 'top';
  });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleNavigationStyle = () => {
    const newStyle = navigationStyle === 'top' ? 'side' : 'top';
    setNavigationStyle(newStyle);
    localStorage.setItem('navigationStyle', newStyle);
  };

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <AppContext.Provider value={{
      navigationStyle,
      toggleNavigationStyle,
      sidebarCollapsed,
      setSidebarCollapsed
    }}>
      {children}
    </AppContext.Provider>
  );
};