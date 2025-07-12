import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentIncubator, getProgramsCount, getMyPrograms } from '../../Services/incubatorService';

const IncubatorContext = createContext();

export const IncubatorProvider = ({ children }) => {
  const [status, setStatus] = useState('loading');
  const [incubatorData, setIncubatorData] = useState(null);
  const [programsCount, setProgramsCount] = useState(0);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchIncubatorStatus = async () => {
      try {
        const response = await getCurrentIncubator();

        // Set the entire response as incubatorData
        setIncubatorData(response);
        
        // Set status from response
        setStatus(response?.status || 'not_applied');

         // Fetch programs count
        const countResponse = await getProgramsCount(); // New function
        setProgramsCount(countResponse.count);
         // Fetch programs if count > 0
        if(countResponse.count > 0) {
          const programsResponse = await getMyPrograms();
          setPrograms(programsResponse);
        }
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

   // Function to update programs
  const addProgram = (newProgram) => {
    setPrograms(prev => [...prev, newProgram]);
    setProgramsCount(prev => prev + 1);
  };


  return (
    <IncubatorContext.Provider value={{ 
      status, 
      incubatorData,
      updateStatus,
      programsCount,
      programs,
      addProgram
    }}>
      {children}
    </IncubatorContext.Provider>
  );
};

export const useIncubator = () => useContext(IncubatorContext);