import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { postVolados } from '../services/ProblemsService';
import VoladosTable from '../components/Problems/VoladosTable';

export default function VoladosPage({randomNums}) {
    const [ShowTable, SetShowTable] = useState(false);
    const [voladosInputData, setVoladosInputData] = useState({
        randomNums: randomNums,
        available: 0,
        bet: 0,
        goal: 0
    });

    const [DataResp, setDataResp] = useState({
        voladosInfos: [],
        probOfWin: undefined
    });

    function handleInputChange(event) {
        setVoladosInputData({
            ...voladosInputData,
            [event.target.name] : event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        if (randomNums.length === 0)
        {
            alert("Por favor genere los numeros pseudoaleatorios primero.");
            return;
        }

        const response = postVolados(voladosInputData);

        response.then(val => {
            console.log(val);
            setDataResp(val);
            SetShowTable(true);
            console.log(val);
        });
    }

    return (
        <div className="Pi">
            <h2>Volados</h2>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField style={{margin: '15px'}} name="available" required={true} label="Disponible" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                <TextField style={{margin: '15px'}} name="bet" required label="Apuesta" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                <TextField style={{margin: '15px'}} name="goal" required label="Objetivo" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                <Button style={{margin: '15px'}} variant="contained" color="primary" type="submit">Calcular</Button>
            </form>
            {DataResp.probOfWin == null ? null : <p><strong>Probabilidad de ganar:</strong> {DataResp.probOfWin}</p>}
            {ShowTable === false ? null : <VoladosTable voladosData={DataResp.voladosInfos}/>}
        </div>
    );
}