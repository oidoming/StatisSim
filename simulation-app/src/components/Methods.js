import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {postPromediosData} from '../services/PromediosService';

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
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: 20
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
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function handleInputChange(event) {
        setAlpha(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const dataRequest = {
            randomList: props.randomList,
            alpha: alpha
        }
        const response = postPromediosData(dataRequest);
        
        response.then(val => {
            setPromediosData(val)
            console.log(val)
        })
    }

    return (
    <div className={classes.root}>
      {props.visible ? <div>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Prueba de Promedios" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Prueba de promedios
          <form autoComplete="off" onSubmit={handleSubmit} >
                <TextField style={{margin: '15px'}} name="alpha" required label="Alfa" variant="outlined" onChange={ handleInputChange } /><br/>
                <Button style={{margin: '15px', textAlign: 'center'}} type="submit" variant="contained" color="primary" >
                    Generar
                </Button>
            </form>
            {   <div>
                <p>{promediosData.x}</p>
                <p>{promediosData.alpha}</p>
                <p>{promediosData.alphaBy2}</p>
                <p>{promediosData.area}</p>
                <p>{promediosData.z}</p>
                <p>{promediosData.limitInf}</p>
                <p>{promediosData.limitSup}</p>
                <p>{promediosData.evenlyDistributed ? "Distribuidos uniformemente" : "No distribuidos uniformemente"}</p>
                </div>
            }
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div> : null}
    </div>
    );
  }