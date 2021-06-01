import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {postPromediosData, postChiData} from '../services/PromediosService';
import CustomizedTables from './ChiTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    gridArea: "methods",
    textAlign: "center",
    marginLeft: "25%",
    marginRight: "25%",
    marginTop: 30
  },
}));

export default function Methods(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [alpha, setAlpha] = useState(0);
    const [promediosData, setPromediosData] = useState({
        alpha: 0.0,
        alphaBy2: 0.0,
        area: 0.0,
        evenlyDistributed: false,
        limitInf: 0.0,
        limitSup: 0.0,
        x: 0.0,
        z: 0.0,
    });
    const [confidence, setConfidence] = useState(0);
    const [chiData, setChiData] = useState({
      limitsInf: [],
      limitsSup: [],
      fo: [],
      fe: [],
      fefo: [],
      n: 0,
      m: 0,
      chiSquareCalc: 0.0,
      chiSquareTable: 0.0,
      evenlyDistributed: false,
      inter: 0.0
  });
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function handleInputChange(event) {
      if (event.target.name === 'alpha'){
        setAlpha(event.target.value);
      }
      else if (event.target.name === 'confidence') {
        setConfidence(event.target.value);
      }
        
    }

    const [meansView, setMeansView] = useState(false);
    const [chiView, setChiView] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        if (event.target.name === 'means') {
        const dataRequest = {
            randomList: props.randomList,
            alpha: alpha
        }
        const response = postPromediosData(dataRequest);
        
        response.then(val => {
            setPromediosData(val);
            setMeansView(true);
            console.log(val);
        });
      }
      else if (event.target.name === 'chi') {
        const dataRequest = {
          randomList: props.randomList,
          alpha: confidence
        }
        const response = postChiData(dataRequest);
        
        response.then(val => {
            setChiData(val);
            setChiView(true);
            console.log(val);
        });
      }
    }

    return (
    <div className={classes.root}>
      {props.visible ? <div>
        <AppBar position="static" style={{backgroundColor: 'black'}}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Prueba de Promedios" {...a11yProps(0)} />
            <Tab label="Prueba de Frecuencias" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Prueba de promedios
          <div className="MeansDataForm">
          <form autoComplete="off" onSubmit={handleSubmit} name="means" >
                <TextField style={{margin: '15px'}} name="alpha" required label="Alfa" variant="outlined" onChange={ handleInputChange } /><br/>
                <Button style={{margin: '15px', textAlign: 'center'}} type="submit" variant="contained" color="secondary" >
                    Generar
                </Button>
          </form>
          </div>
            {   meansView ? <div className="MeansData">
                <p><strong>Promdedio: </strong>{promediosData.x}</p>
                <p><strong>a: </strong>{promediosData.alpha}</p>
                <p><strong>a/2: </strong>{promediosData.alphaBy2}</p>
                <p><strong>area: </strong>{promediosData.area}</p>
                <p><strong>z: </strong>{promediosData.z}</p>
                <p><strong>Limite Inferior: </strong>{promediosData.limitInf}</p>
                <p><strong>Limite Superior: </strong>{promediosData.limitSup}</p>
                <p><strong>{promediosData.evenlyDistributed ? "Distribuidos uniformemente" : "No distribuidos uniformemente"}</strong></p>
                </div> : null
            }
        </TabPanel>
        <TabPanel value={value} index={1}>
          Prueba de Frecuencias
          <form autoComplete="off" onSubmit={handleSubmit} name="chi">
                <TextField style={{margin: '15px'}} name="confidence" required label="Confianza" variant="outlined" onChange={ handleInputChange } /><br/>
                <Button style={{margin: '15px', textAlign: 'center'}} type="submit" variant="contained" color="secondary" >
                    Generar
                </Button>
          </form>
          { chiView ? 
            <div>
              <p><strong>Chi Cuadrado Tabla: </strong>{chiData.chiSquareTable}</p>
              <p><strong>Chi Cuadrado Calculada: </strong>{chiData.chiSquareCalc}</p>
              <p><strong>{chiData.evenlyDistributed ? "Distribuidos uniformemente" : "No distribuidos uniformemente"}</strong></p>
            </div>
            : null }
          { chiView ? <CustomizedTables chiSData={chiData}/> : null }
        </TabPanel>
      </div> : null}
    </div>
    );
  }