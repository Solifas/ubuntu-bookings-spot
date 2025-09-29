
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Homepage from './Homepage';
import UpdatedHomepage from '../components/UpdatedHomepage';

const Index = () => {
  const { user } = useAuth();
  
  // Show the updated homepage for all users (clients see it as landing page)
  return <UpdatedHomepage />;
};

export default Index;
