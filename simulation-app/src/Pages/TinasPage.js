import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { postTinas } from '../services/ProblemsService';
import TinasTable from '../components/Problems/TinasTable';

export default function TinasPage({randomNums}) {
    const [ShowTable, SetShowTable] = useState(false);
    const [DataResp, setDataResp] = useState({
        tinas: [],
        decision: "", 
        average: 0
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (randomNums.length === 0)
        {
            alert("Por favor genere los numeros pseudoaleatorios primero.");
            return;
        }

        const response = postTinas(randomNums);

        response.then(val => {
            console.log(val);
            setDataResp(val);
            SetShowTable(true);
            console.log(val);
        });
    }

    return (
        <div className="Pi">
            <h2>Camion transportador</h2>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Button style={{margin: '15px'}} variant="contained" color="primary" type="submit">Calcular</Button>
            </form>
            {DataResp.average === 0 ? null : <p><strong>Promedio anual:</strong> {DataResp.average}</p>}
            {DataResp.decision === "" ? null : <p><strong>Desicion:</strong> {DataResp.decision}</p>}
            {ShowTable === false ? null : <TinasTable tinasData={DataResp.tinas}/>}
        </div>
    );
}