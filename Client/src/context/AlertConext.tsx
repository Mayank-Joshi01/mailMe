import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

type AlertType = 'success' | 'error' | 'info';

interface AlertContextType {
  alert: { show: boolean; message: string; type: AlertType };
  showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: '', type: 'info' as AlertType });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showAlert = useCallback((message: string, type: AlertType = 'info') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setAlert({ show: true, message, type });

    timeoutRef.current = setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
      timeoutRef.current = null;
    }, 3000);
  }, []);

  return (
    <AlertContext.Provider value={{ alert , showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
    

//-- Custom hook for easy access to the AlertContext
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};