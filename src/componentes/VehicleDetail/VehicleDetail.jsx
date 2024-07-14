import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/vehicles/${id}/`);
        setVehicle(response.data);
        setError(false);
      } catch (error) {
        setVehicle(null);
        setError(true);
      }
    };

    fetchVehicle();
  }, [id]);

  return (
    <div>
      {error && (
        <div className="error">
          <p>Estos no son los droides que está buscando</p>
          <img src="/img/obiwan.jpg" alt="Obi-Wan Kenobi" />
        </div>
      )}
      {vehicle && (
        <div className="vehicle-detail">
          <h3>{vehicle.name}</h3>
          <p>Model: {vehicle.model}</p>
          <p>Manufacturer: {vehicle.manufacturer}</p>
          <p>Cost in Credits: {vehicle.cost_in_credits}</p>
          <p>Vehicle Class: {vehicle.vehicle_class}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleDetail;
