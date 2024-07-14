import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SpeciesDetail = () => {
  const { id } = useParams();
  const [species, setSpecies] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/species/${id}/`);
        setSpecies(response.data);
        setError(false);
      } catch (error) {
        setSpecies(null);
        setError(true);
      }
    };

    fetchSpecies();
  }, [id]);

  return (
    <div>
      {error && (
        <div className="error">
          <p>Estos no son los droides que está buscando</p>
          <img src="/img/obiwan.jpg" alt="Obi-Wan Kenobi" />
        </div>
      )}
      {species && (
        <div className="species-detail">
          <h3>Species Detail:</h3>
          <p>Name: {species.name}</p>
          <p>Classification: {species.classification}</p>
          <p>Designation: {species.designation}</p>
          <p>Average Height: {species.average_height}</p>
          <p>Skin Colors: {species.skin_colors}</p>
        </div>
      )}
    </div>
  );
};

export default SpeciesDetail;



