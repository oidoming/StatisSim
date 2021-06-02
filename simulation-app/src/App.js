import './App.css';
import './components/RandomNumsForm';
import RandomNumsForm from './components/RandomNumsForm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NBAStatsPage from './Pages/NBAStatsPage';
import { useState } from 'react';

function App() {
  const [randomNums, setRandomNums] = useState([]);
  console.log(randomNums);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/nbastats">NBAStatsPage</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
          <div className="App">
            <RandomNumsForm setRandomNums={setRandomNums}/>
          </div>
          </Route>
          <Route path="/nbastats">
            <NBAStatsPage randomNums={randomNums}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
