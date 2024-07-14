import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from '../Search/Search';
import PersonDetail from '../PersonDetail/PersonDetail';
import SpeciesDetail from '../SpeciesDetail/SpeciesDetail';
import FilmDetail from '../FilmDetail/FilmDetail';
import VehicleDetail from '../VehicleDetail/VehicleDetail';
import PlanetDetail from '../PlanetDetail/PlanetDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/people/:id" element={<PersonDetail />} />
      <Route path="/species/:id" element={<SpeciesDetail />} />
      <Route path="/films/:id" element={<FilmDetail />} />
      <Route path="/vehicles/:id" element={<VehicleDetail />} />
      <Route path="/planets/:id" element={<PlanetDetail />} />
    </Routes>
  );
}

export default App;



