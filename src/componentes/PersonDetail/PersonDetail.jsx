import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [homeworldName, setHomeworldName] = useState(null); // Estado para almacenar el nombre del planeta
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
        setPerson(response.data);
        setError(false);

        // Obtener el nombre del planeta de origen
        const homeworldResponse = await axios.get(response.data.homeworld);
        setHomeworldName(homeworldResponse.data.name); // Establecer el nombre del planeta
      } catch (error) {
        setPerson(null);
        setHomeworldName(null);
        setError(true);
      }
    };

    fetchPerson();
  }, [id]);

  return (
    <div>
      {error && (
        <div className="error">
          <p>Estos no son los droides que está buscando</p>
          <img src="/img/obiwan.jpg" alt="Obi-Wan Kenobi" />
        </div>
      )}
      {person && (
        <div className="person-detail">
          <h3>Person Detail:</h3>
          <p>Name: {person.name}</p>
          <p>Birth Year: {person.birth_year}</p>
          <p>Homeworld: {homeworldName}</p>
          <p>Height: {person.height}</p>
          <p>Mass: {person.mass}</p>
          <p>Hair Color: {person.hair_color}</p>
        </div>
      )}
    </div>
  );
};

export default PersonDetail;

