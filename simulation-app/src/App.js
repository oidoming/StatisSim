import { useEffect, useState } from 'react';
import './App.css';
import {getRandomNums} from './services/RandomNumsService';
import './components/RandomNumsForm';
import RandomNumsForm from './components/RandomNumsForm';

function App() {
  return (
    <div className="App">
      <RandomNumsForm/>
    </div>
  );
}

export default App;
