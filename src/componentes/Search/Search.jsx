import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App/App.css";

const Search = () => {
  const [resource, setResource] = useState("people");
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchResource = async (resource, id) => {
    try {
      const response = await axios.get(`https://swapi.dev/api/${resource}/${id}/`);
      setResult(response.data);
      setError(false);

      
      if (resource === "people" && response.data.homeworld) {
        const homeworldResponse = await axios.get(response.data.homeworld);
        setResult((prevResult) => ({
          ...prevResult,
          homeworld: homeworldResponse.data.name,
        }));
      }
    } catch (error) {
      setResult(null);
      setError(true);
      setErrorMessage("Error al realizar la solicitud. Inténtalo de nuevo.");
    }
  };

  const handleSearch = () => {
    if (!id) {
      setError(true);
      setErrorMessage("Por favor ingresa un ID válido.");
      return;
    }

    fetchResource(resource, id);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <label htmlFor="searchFor">Search for:</label>
          <select
            className="form-select mb-3"
            name="resource"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
          >
            <option value="people">People</option>
            <option value="films">Films</option>
            <option value="species">Species</option>
            <option value="vehicles">Vehicles</option>
            <option value="starships">Starships</option>
            <option value="planets">Planets</option>
          </select>
          <label htmlFor="id">Id: </label>
          <input
            type="number"
            className="form-control mb-3"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="row justify-content-center">
          <div className="col-md-6 mt-3">
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="row justify-content-center">
          <div className="col-md-6 mt-3">
            <div className="card">
              <div className="card-body">
                {resource === "people" && (
                  <div>
                    <h3>{result.name}</h3>
                    <p>Height: {result.height}</p>
                    <p>Birth Year: {result.birth_year}</p>
                    {result.homeworld && <p>Homeworld: {result.homeworld}</p>}
                  </div>
                )}
                {resource === "films" && (
                  <div>
                    <h3>{result.title}</h3>
                    <p>Episode ID: {result.episode_id}</p>
                    <p>Opening Crawl:</p>
                    <p>{result.opening_crawl}</p>
                    <p>Director: {result.director}</p>
                    <p>Producer: {result.producer}</p>
                  </div>
                )}
                {resource === "species" && (
                  <div>
                    <h3>{result.name}</h3>
                    <p>Classification: {result.classification}</p>
                    <p>Designation: {result.designation}</p>
                    <p>Average Height: {result.average_height}</p>
                    <p>Skin Colors: {result.skin_colors}</p>
                  </div>
                )}
                {resource === "vehicles" && (
                  <div>
                    <h3>{result.name}</h3>
                    <p>Model: {result.model}</p>
                    <p>Manufacturer: {result.manufacturer}</p>
                    <p>Cost in Credits: {result.cost_in_credits}</p>
                    <p>Vehicle Class: {result.vehicle_class}</p>
                  </div>
                )}
                {resource === "starships" && (
                  <div>
                    <h3>{result.name}</h3>
                    <p>Model: {result.model}</p>
                    <p>Manufacturer: {result.manufacturer}</p>
                    <p>Cost in Credits: {result.cost_in_credits}</p>
                    <p>Starship Class: {result.starship_class}</p>
                  </div>
                )}
                {resource === "planets" && (
                  <div>
                    <h3>{result.name}</h3>
                    <p>Rotation Period: {result.rotation_period}</p>
                    <p>Orbital Period: {result.orbital_period}</p>
                    <p>Diameter: {result.diameter}</p>
                    <p>Climate: {result.climate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;






