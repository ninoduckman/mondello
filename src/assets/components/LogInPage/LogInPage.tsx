// EnterIdPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useId } from './AuthContext';

const EnterIdPage: React.FC = () => {
  const [enteredId, setEnteredId] = useState('');
  const navigate = useNavigate();
  const { setId } = useId();

  const handleIdSubmit = () => {
    // Validate the entered ID, e.g., check if it's a valid number
    // You may also want to perform additional validation

    // Set the ID in the context
    setId(enteredId);

    // Navigate to the DisplayDataPage without including the ID in the URL
    navigate('/protected');
  };

  return (
    <div>
      <h2>Enter ID</h2>
      <input
        type="text"
        value={enteredId}
        onChange={(e) => setEnteredId(e.target.value)}
      />
      <button onClick={handleIdSubmit}>Submit</button>
    </div>
  );
};

export default EnterIdPage;
