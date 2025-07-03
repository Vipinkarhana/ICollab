import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentIncubator } from '../../Services/incubatorService';

const IncubatorContext = createContext();

export const IncubatorProvider = ({ children }) => {
  const [status, setStatus] = useState('loading');
  const [incubatorData, setIncubatorData] = useState(null);

  useEffect(() => {
    const fetchIncubatorStatus = async () => {
      try {
        const response = await getCurrentIncubator();

        // Set the entire response as incubatorData
        setIncubatorData(response);
        
        // Set status from response
        setStatus(response?.status || 'not_applied');
      } catch (error) {
        console.error('Failed to fetch incubator status:', error);
        const storedStatus = localStorage.getItem('incubatorStatus');
        setStatus(storedStatus || 'not_applied');
      }
    };

    fetchIncubatorStatus();
  }, []);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    localStorage.setItem('incubatorStatus', newStatus);
  };

  return (
    <IncubatorContext.Provider value={{ 
      status, 
      incubatorData,
      updateStatus
    }}>
      {children}
    </IncubatorContext.Provider>
  );
};

export const useIncubator = () => useContext(IncubatorContext);