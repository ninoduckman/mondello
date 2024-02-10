// EnterIdPage.tsx
import React, { useState, useEffect } from 'react';
import Page from '../Page';
import { useNavigate } from 'react-router-dom';
import { useId } from './AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const EnterIdPage: React.FC = () => {
  const [enteredId, setEnteredId] = useState('');
  const [barrio, setBarrio] = useState<any[]>([]);
  const [selectedBarrio, setSelectedBarrio] = useState('selecciona un barrio');
  
  const navigate = useNavigate();
  const { setId , _setBarrio } = useId();
  
  const handleIdSubmit = () => {
    // Validate the entered ID, e.g., check if it's a valid number
    // You may also want to perform additional validation

    // Set the ID in the context
    setId(enteredId);
    _setBarrio(selectedBarrio);
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getBarrioData`);
        setBarrio(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });
  

  return (
    <div>
      <h2>Cte. Mondello</h2>
      <div className="label-input">
      <div className='labels'>Nombre: </div>
      <input
        type="text"
        value={enteredId}
        onChange={(e) => setEnteredId(e.target.value)}
      />
      </div>
      <div className="label-input">
      <div className='labels'>
        Barrio: 
      </div>
    <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        {selectedBarrio}
      </Dropdown.Toggle>
      

      <Dropdown.Menu>
      <Dropdown.Item onClick={() => setSelectedBarrio("todos")}>todos</Dropdown.Item>
        {barrio && barrio.map((este, id) => 
        <Dropdown.Item key={id} onClick={() => setSelectedBarrio(este.barrioid)}>{este.barrioid}</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
    </div>

    <button onClick={handleIdSubmit}>Buscar</button>


          <Page></Page>
    </div>
  );
};

export default EnterIdPage;
