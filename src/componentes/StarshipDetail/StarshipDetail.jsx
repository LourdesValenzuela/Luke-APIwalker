import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StarshipDetail = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStarship = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/starships/${id}/`);
        setStarship(response.data);
        setError(false);
      } catch (error) {
        setStarship(null);
        setError(true);
      }
    };

    fetchStarship();
  }, [id]);

  return (
    <div>
      {error && (
        <div className="error">
          <p>Estos no son los droides que está buscando</p>
          <img src="../src/img/obiwan.jpg" alt="Obi-Wan Kenobi" />
        </div>
      )}
      {starship && (
        <div className="starship-detail">
          <h3>{starship.name}</h3>
          <p>Model: {starship.model}</p>
          <p>Manufacturer: {starship.manufacturer}</p>
          <p>Cost in Credits: {starship.cost_in_credits}</p>
          <p>Starship Class: {starship.starship_class}</p>
        </div>
      )}
    </div>
  );
};

export default StarshipDetail;

