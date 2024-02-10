import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useId } from './LogInPage/AuthContext';
import axios from 'axios';
import { json } from 'body-parser';
import "./Page.css"

const Page: React.FC = () => {
  const { id, barrio, nombre }   = useId();
  const [data, setData] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getData/personas`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, barrio, FilterList]);
  var filteredResponse : any = [];

  FilterList();
  async function FilterList()
  {
    
  var tempFiltered = [];
  try {
    if (barrio && barrio !== "todos" && barrio !== "selecciona un barrio") {
      // Filter by barrio
      tempFiltered = data.filter((pers) => pers.perbarrid === barrio);
    } else {
      // Don't filter by barrio
      tempFiltered = data;
    }

    // Filter by name
    if (nombre) {
      tempFiltered = tempFiltered.filter((pers) => pers.pernombre.toUpperCase().includes(nombre.toUpperCase));
    }

    filteredResponse = tempFiltered;
    console.log(filteredResponse);
  } catch {
    console.error("Could not filter data");
  }
  }


  const handlePersonClick = (person: any) => {
    // Toggle the selected person when clicked
    setSelectedPerson((prevSelectedPerson : any) =>
      prevSelectedPerson && prevSelectedPerson.percod === person.percod ? null : person
    );
  };


  return (
    <div>
      <h1>{filteredResponse.length} personas encontradas</h1>
      <ul className="list-group">
        {filteredResponse.map((person : any) => (
          <li
            key={person.percod}
            className={`list-group-item ${selectedPerson && selectedPerson.percod === person.percod ? 'active' : ''}`}
            onClick={() => handlePersonClick(person)}
          >
            {person.pernombre + " " + person.perapellido}
            {selectedPerson && selectedPerson.percod === person.percod && (
              <div className="accordion" id={`accordion-${person.percod}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${person.percod}`}>
                  </h2>
                  <div
                    id={`collapse-${person.percod}`}
                    className="accordion-collapse collapse show"
                    aria-labelledby={`heading-${person.percod}`}
                    data-bs-parent={`#accordion-${person.percod}`}
                  >
                    <div className="accordion-body">
                      <p>CI: {person.perci}</p>
                      <p>CREDENCIAL: {person.percred1 + " " + person.percred2}</p>
                      {/* Add more information as needed */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default Page;