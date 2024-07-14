import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
        setFilm(response.data);
        setError(false);
      } catch (error) {
        setFilm(null);
        setError(true);
      }
    };

    fetchFilm();
  }, [id]);

  return (
    <div>
      {error && (
        <div className="error">
          <p>Estos no son los droides que está buscando</p>
          <img src="/img/obiwan.jpg" alt="Obi-Wan Kenobi" />
        </div>
      )}
      {film && (
        <div className="film-detail">
          <h3>Film Detail:</h3>
          <p>Title: {film.title}</p>
          <p>Episode ID: {film.episode_id}</p>
          <p>Opening Crawl:</p>
          <p>{film.opening_crawl}</p>
          <p>Director: {film.director}</p>
          <p>Producer: {film.producer}</p>
        </div>
      )}
    </div>
  );
};

export default FilmDetail;
