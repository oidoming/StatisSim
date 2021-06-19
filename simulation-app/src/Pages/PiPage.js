import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { postPi } from '../services/ProblemsService';
import PiTable from '../components/Problems/PiTable';

export default function PiPage({randomNums}) {
    const [ShowTable, SetShowTable] = useState(false);
    const [DataResp, setDataResp] = useState({
        piInfo: [],
        pi: 0
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (randomNums.length === 0)
        {
            alert("Por favor genere los numeros pseudoaleatorios primero.");
            return;
        }

        const response = postPi(randomNums);

        response.then(val => {
            console.log(val);
            setDataResp(val);
            SetShowTable(true);
            console.log(val);
        });
    }

    return (
        <div className="Pi">
            <h2>Estimar Pi</h2>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Button style={{margin: '15px'}} variant="contained" color="primary" type="submit">Calcular Pi</Button>
            </form>
            {DataResp.piInfo == 0 ? null : <p><strong>Pi:</strong> {DataResp.pi}</p>}
            {ShowTable===false ? null : <PiTable piData={DataResp.piInfo}/>}
        </div>
    );
}