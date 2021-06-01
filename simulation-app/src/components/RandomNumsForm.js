import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {postRandomNums} from '../services/RandomNumsService';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import '../App.css';
import Methods from './Methods';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.default,
    },
}));
  
function renderRow(props) {
    const { index, style, data } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${data[index]}`} />
      </ListItem>
    );
}

function RandomNumsForm() {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);

    const [pseudoFormulaData, setPseudoFormulaData] = useState({
        N: 0,
        X0: 0,
        a: 0,
        c: 0,
        M: 0
    });

    const [data, setData] = useState([]);

    function handleInputChange(event) {
        setPseudoFormulaData({
            ...pseudoFormulaData,
            [event.target.name] : event.target.value
        });
    }

    const [cls, setCls] = useState("");
    function handleSubmit(event) {
        event.preventDefault();

        const response = postRandomNums(pseudoFormulaData);
        
        response.then(val => {
            setData(val)
            setVisible(true);
            setCls("container");
            console.log(val)
        })
    }

    return (
        <div className={cls}>
            <div className="PseudoForm">
                <form autoComplete="off" onSubmit={handleSubmit} >
                    <TextField style={{margin: '15px'}} name="n" required label="Cantidad" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                    <TextField style={{margin: '15px'}} name="x0" required label="X0" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                    <TextField style={{margin: '15px'}} name="a" required label="a" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                    <TextField style={{margin: '15px'}} name="c" required label="c" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                    <TextField style={{margin: '15px'}} name="m" required label="M" variant="outlined" onChange={ handleInputChange } type="number" /><br/>
                    <Button style={{margin: '15px', textAlign: 'center'}} type="submit" variant="contained" color="primary" >
                        Generar
                    </Button>
                </form>
            </div>
            {
                data.length ? 
                <div className="RandomNums">
                    <FixedSizeList className="FixedList" height={400} width={300} itemSize={46} itemCount={data.length} itemData={data}>
                        {renderRow}
                    </FixedSizeList>
                </div> : null
            }
            <Methods randomList={data} visible={visible} />
        </div>
    );
}

export default RandomNumsForm;