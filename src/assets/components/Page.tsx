import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useId } from './LogInPage/AuthContext';
import axios from 'axios';

const Page: React.FC = () => {
  const { id } = useId();
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
      <h2>Data for ID: {id}</h2>
      {data ? (
        data
      ) : (
        <p>No data found for the specified ID.</p>
      )}
    </div>
    
  );
};

export default Page;