import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { postNBAPlayers } from '../services/NBAStatsService';
import NBAStatsTable from '../components/NBAStatsTable';

export default function NBAStatsPage({randomNums}) {
    const [playerName, setPlayerName] = useState("");
    const [playersName, setPlayersName] = useState([]);
    const [playerRequestData, setPlayerRequestData] = useState({
        name: "",
        ri: []
    });
    //const [playersStats, setPlayersStats] = useState([]);
    const [DataResp, setDataResp] = useState({
        bestPlayer: "",
        playersStats: []
    });

    function generateRequestData() {
        var dataList = []
        var i = 0;
        var j = 7;
        playersName.forEach((name, index) => {
            //setPlayerRequestData({name: name, ri: randomNums.slice(i, j)});
            dataList.push({name: name, ri: randomNums.slice(i, j)});
            i += 7;
            j += 7;
        });
        console.log(dataList);
        return dataList;
    }

    function handleInputChange(event) {
        setPlayerName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const response = postNBAPlayers(generateRequestData());

        response.then(val => {
            console.log(val);
            setDataResp(val);
            console.log(val);
        });
    }

    function addPlayerName(inputText) {
        setPlayersName(prevNames => {
          return [...prevNames, inputText];
        });
      }
    
      function deletePlayerName(id) {
        setPlayersName(prevNames => {
          return prevNames.filter((item, index) => {
            return index !== id;
          });
        });
      }

    return (
      <div className="NBAStats">
        <h2 className="StatsTitle">Estadisticas NBA</h2>
        <div className="StatsForm">
          <div>
              <TextField style={{margin: '15px'}} name="playerName" required label="Nombre jugador" variant="outlined" onChange={ handleInputChange } value={playerName} />
              <Button style={{margin: '15px', marginTop: '25px'}} variant="contained" color="primary" onClick={() => {
                  addPlayerName(playerName);
                  setPlayerName("");
              }}>Agregar</Button><br/>
          </div>
          { playersName.map((name, id) => (
              <li style={{marginLeft: '15px'}} onClick={() => deletePlayerName(id)}>{name}</li>
          ))}
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Button style={{margin: '15px'}} variant="contained" color="primary" type="submit">Enviar datos</Button>
          </form>
        </div>
        <div>
        <NBAStatsTable statsData={DataResp.playersStats}/>
        <h3>El mejor jugador es: {DataResp.bestPlayer}</h3>
        </div>
      </div>
    );
}