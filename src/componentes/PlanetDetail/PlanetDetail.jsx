import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlanetDetail = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/${id}/`);
        setPlanet(response.data);
        setError(false);
      } catch (error) {
        setPlanet(null);
        setError(true);
      }
    };

    fetchPlanet();
  }, [id]);

  return (
    <div>
      {error && (
        <div className="error">
          <p>Estos no son los droides que está buscando</p>
          <img src="/img/obiwan.jpg" alt="Obi-Wan Kenobi" />
        </div>
      )}
      {planet && (
        <div className="planet-detail">
          <h3>{planet.name}</h3>
          <p>Rotation Period: {planet.rotation_period}</p>
          <p>Orbital Period: {planet.orbital_period}</p>
          <p>Diameter: {planet.diameter}</p>
          <p>Climate: {planet.climate}</p>
        </div>
      )}
    </div>
  );
};

export default PlanetDetail;
