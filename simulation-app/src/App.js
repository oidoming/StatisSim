import { useEffect, useState } from 'react';
import './App.css';
import {getRandomNums} from './services/RandomNumsService';
import './components/RandomNumsForm';
import RandomNumsForm from './components/RandomNumsForm';

function App() {
  const [data, setData] = useState([]);
  /*
  useEffect(() => {
    const response = getRandomNums();

    response.then(val => {
      setData(val)
      console.log(val)
    })
  }, []);*/

  return (
    <div className="App">
      <RandomNumsForm/>
      {
        //data.map(val => (
        //  <p>{val}</p>
        //))
      }
    </div>
  );
}

export default App;
