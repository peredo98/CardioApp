import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Chart from '../components/Chart';
import Chart2 from '../components/Chart2';
import Chart3 from '../components/Chart3';
import { MDBDataTable, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ProfileIcon from '@material-ui/icons/People';
import EmailIcon from '@material-ui/icons/Email';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import TextField from '@material-ui/core/TextField';
import Moment from 'react-moment';
import Modal from "react-bootstrap/Modal";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import moment from 'moment-timezone';
import 'moment/locale/fr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { auth, Providers, db} from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { arrayUnion, collection, doc, getDocs, updateDoc } from "firebase/firestore";

const $ = require('jquery')
$.DataTable = require('datatables.net')

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


export default function DashboardPage(props) {

  const [me, setMe] = React.useState([]);
  const [mainDashboard, setMainDashboard] = React.useState(true);
  const [settings, setSettings] = React.useState(false);
  const [patientDashboard, setPatientDashboard] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState('')
  const [days, setDays] = React.useState(30)
  const [tableView, setTableView] = React.useState('Chart')
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const [selectedPatientFirstName, setSelectedPatientFirstName] = React.useState('');
  const [selectedPatientLastName, setSelectedPatientLastName] = React.useState('');
  const [selectedPatientEmail, setSelectedPatientEmail] = React.useState('');
  const [selectedPatientID, setSelectedPatientID] = React.useState('')
  const [patientFirstName, setPatientFirstName] = React.useState('');
  const [patientLastName, setPatientLastName] = React.useState('');
  const [patientEmail, setPatientEmail] = React.useState('');
  const [serverMessage, setServerMessage] = React.useState('');
  const [serverMessage2, setServerMessage2] = React.useState('');
  const [serverMessage3, setServerMessage3] = React.useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [el, setEl] = React.useState('');
  const [el2, setEl2] = React.useState('');
  const [el3, setEl3] = React.useState('');
  const [el4, setEl4] = React.useState('');
  const [initialized, setInitialized] = React.useState(false);
  
  const [patients, setPatients] = React.useState([])
  const [allPatients, setAllPatients] = React.useState([])
  const [disabled, setDisabled] = React.useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setDisabled(true);
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        setDisabled(false);
      });
  };

  useEffect(async () => {
		const querySnapshot = await getDocs(collection(db, "Doctor"));
    let m;
		querySnapshot.forEach((doc) => {
		  // doc.data() is never undefined for query doc snapshots
		  if(doc.data().id == auth.currentUser.email){
        m = doc.data()
        setMe(m)
		  }
		});
    const querySnapshot2 = await getDocs(collection(db, "Paciente"));
    let pat = []
    let a = []
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      if(m.pacientes.filter(function(item) { return item == doc.data().id; }).length > 0){
        pat.push(doc.data())
      }
      a.push(doc.data())
    });
    setPatients(pat)
    setAllPatients(a)
    sessionStorage.patients = JSON.stringify(patients)
	}, [])

  function password_check(pass) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.exec(pass) == null) {
      return false
    }
    else {
      return true
    }
  }


  function resetPassword() {
    
  }


  function deletePatient() {
    
  }

  function savePatientChanges() {
    
  }


  function navigatePatient(name) {
    console.log(name)
    var foundPatient
    var patientss = patients
    for (var j = 0; j < patientss.length; j++) {
      if (patientss[j].name === name) {
        foundPatient = patientss[j]
      }
    }

    setSelectedPatientFirstName(foundPatient.name.split(' ')[0])
    setSelectedPatientLastName(foundPatient.name.split(' ')[1])
    setSelectedPatientEmail(foundPatient.email)
    setSelectedPatientID(foundPatient.id)

    setMainDashboard(false)
    setPatientDashboard(true)


  }

  function returnPatient(x) {
    var foundPatient
    for (var j = 0; j < patients.length; j++) {
      if (patients[j].name === selectedPatient) {
        foundPatient = patients[j]
      }
    }
    console.log(foundPatient)

    var timeZone = 'CST'

    var arrayBP = []
    var arrayWS = []
    var d = new Date();
    d.setDate(d.getDate() - x);
    var avgSys = 0
    var avgDia = 0
    var avgBPM = 0
    var avgW = 0
    for (var z = 0; z < foundPatient.bpm.length; z++) {
      var tempDate = new Date(foundPatient.bpm[z]._created_at)
      if (tempDate >= d) {
        arrayBP.push(foundPatient.bpm[z])
        avgSys += parseInt(foundPatient.bpm[z].systolic)
        avgDia += parseInt(foundPatient.bpm[z].diastolic)
        avgBPM += parseInt(foundPatient.bpm[z].pulse)
        avgW += parseInt(foundPatient.ws[z].weight)
      }
    }
    for (var z = 0; z < foundPatient.ws.length; z++) {
      var tempDate = new Date(foundPatient.ws[z]._created_at)
      if (tempDate >= d) {
        arrayWS.push(foundPatient.ws[z])
      }
    }

    if (arrayBP.length > 0) {
      avgSys = avgSys / arrayBP.length
      avgDia = avgDia / arrayBP.length
      avgBPM = avgBPM / arrayBP.length
      avgW = avgW / arrayWS.length
      var highSys = parseInt(arrayBP[0].systolic)
      var highDia = parseInt(arrayBP[0].diastolic)
      var lowSys = parseInt(arrayBP[0].systolic)
      var lowDia = parseInt(arrayBP[0].diastolic)
      for (var c = 0; c < arrayBP.length; c++) {
        if (highSys / highDia < parseInt(arrayBP[c].systolic) / parseInt(arrayBP[c].diastolic)) {
          highSys = parseInt(arrayBP[c].systolic)
          highDia = parseInt(arrayBP[c].diastolic)
        }
        if (lowSys / lowDia > parseInt(arrayBP[c].systolic) / parseInt(arrayBP[c].diastolic)) {
          lowSys = parseInt(arrayBP[c].systolic)
          lowDia = parseInt(arrayBP[c].diastolic)
        }
      }
    } else {
      var highSys = ''
      var highDia = ''
      var lowSys = ''
      var lowDia = ''
      avgSys = ''
      avgSys = ''
      avgDia = ''
      avgDia = ''
    }



    var tableArray2 = []
    var tableArray3 = []
    for (var r = 0; r < arrayBP.length; r++) {

      var tableObj = {
        date: moment(arrayBP[r]._created_at).format('MM/DD/YY'),
        time: moment(arrayBP[r]._created_at).format('h:mm A'),
        systolic: Math.round(parseInt(arrayBP[r].systolic)),
        diastolic: Math.round(parseInt(arrayBP[r].diastolic)),
        pulse: arrayBP[r].pulse
      }
      tableArray2.push(tableObj)
    }
    for (var s = 0; s < arrayWS.length; s++) {
      var weightObj = {
        date: moment(arrayWS[s]._created_at).format('MM/DD/YY'),
        time: moment(arrayWS[s]._created_at).format('h:mm A'),
        weight: (parseFloat(arrayWS[s].weight)).toFixed(2)
      }
      tableArray3.push(weightObj)
    }



    $(el2).DataTable({
      'retrieve': true,
      'lengthMenu': [[10, 100, -1], [10, 100, "All"]],
      'pageLength': 10,
    })
  
    $(el3).DataTable({
      'retrieve': true,
      'lengthMenu': [[10, 100, -1], [10, 100, "All"]],
      'pageLength': 10
    })

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} ref={el4 => setEl4(el4)}>
          <h2>{foundPatient.name} <Select
            style={{ marginBottom: '10px' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            disableUnderline
          >
            <MenuItem style={{ backgroundColor: 'white' }}>Correo: {foundPatient.email}</MenuItem>
          </Select></h2>
          <Grid container spacing={3}>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{avgSys.toFixed(0)}/{avgDia.toFixed(0)}</h4>
                  <h5 style={{ textAlign: 'center' }}>Presi??n promedio</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>??ltimos {x} D??as</p>
                </Container>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{avgBPM.toFixed(0)}</h4>
                  <h5 style={{ textAlign: 'center' }}>Pulso promedio</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>??ltimos {x} D??as</p>
                </Container>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{avgW.toFixed(0)}</h4>
                  <h5 style={{ textAlign: 'center' }}>Peso promedio</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>??ltimos {x} D??as</p>
                </Container>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Container>
                  <h4 style={{ textAlign: 'center', marginTop: '40px' }}>{arrayBP.length}</h4>
                  <h5 style={{ textAlign: 'center' }}>Lecturas</h5>
                  <p style={{ textAlign: 'center', marginTop: '60px' }}>??ltimos {x} D??as</p>
                </Container>
              </Paper>
            </Grid>


          </Grid>
          <div style={{ float: 'right', marginTop: '5px' }}>
            D??as {x === 7 ? <Button style={{ backgroundColor: '#F0F0F0' }} onClick={() => setDays(7)}>7</Button>
              : <Button onClick={() => setDays(7)}>7</Button>
            }
            {x === 15 ? <Button style={{ backgroundColor: '#F0F0F0' }} onClick={() => setDays(30)}>15</Button>
              : <Button onClick={() => setDays(15)}>15</Button>
            }
            {x === 30 ? <Button style={{ backgroundColor: '#F0F0F0' }} onClick={() => setDays(60)}>30</Button>
              : <Button onClick={() => setDays(30)}>30</Button>
            }
          </div>
          <div style={{ float: 'left', marginTop: '5px' }}>
            {/* <Button>Readings</Button> */}
            {tableView === 'Chart' ? <div><Button style={{ backgroundColor: '#F0F0F0' }} >Gr??fica</Button><Button onClick={() => setTableView('Readings')}>Tabla</Button></div> :
              <div><Button onClick={() => setTableView('Chart')}>Gr??fica</Button><Button style={{ backgroundColor: '#F0F0F0' }}>Tabla</Button></div>}

          </div>
        </Container>
        {tableView === 'Chart' ?
          <div style={{ marginTop: '25px' }} id="chart">
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart data={arrayBP} timeZone={timeZone} />
                </Paper>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart2 data={arrayBP} timeZone={timeZone} />
                </Paper>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container} id="chart3">
              <Grid item xs={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart3 data={arrayWS} timeZone={timeZone} />
                </Paper>
              </Grid>
            </Container>
          </div> :
          <div style={{ marginTop: '25px' }} id="chart">
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <h5>Presi??n</h5>
                <Paper>
                  <table class="table stripe" ref={el2 => setEl2(el2)} style={{padding: '30px'}}>
                    <thead>
                      <tr>
                        <th>
                          Fecha
                      </th>
                        <th>
                          Hora
                      </th>
                        <th>
                          Sistolica (mmHg)
                      </th>
                        <th>
                          Diastolica (mmHg)
                      </th>
                        <th>
                          Pulso (bpm)
                      </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableArray2.map((row, index) => (
                        <tr>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.systolic}</td>
                          <td>{row.diastolic}</td>
                          <td>{row.pulse}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Paper>
              </Grid>
            </Container>
            <Container maxWidth="lg" className={classes.container}>
              <Grid item xs={12} lg={12}>
                <h5>Peso</h5>
                <Paper >

                  <table class="table stripe" ref={el3 => setEl3(el3)}>
                    <thead>
                      <tr>
                        <th>
                          Fecha
                      </th>
                        <th>
                          Hora
                      </th>
                        <th>
                          Peso (kg)
                      </th>

                      </tr>
                    </thead>
                    <tbody>
                      {tableArray3.map((row, index) => (
                        <tr>
                          <td>{row.date}</td>
                          <td>{row.time}</td>
                          <td>{row.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Paper>
              </Grid>
            </Container>
          </div>
        }

      </main>
    )
  }

 
  useEffect(() => {
    var tableDataArray = []
    patients.forEach(function (singleData, index) {
      if (singleData.bpm.length === 0) {
        var systolic = ''
        var diastolic = ''
        var bpDate = ''
        var pulse = ''
      } else {
        var systolic = Math.round(parseInt(singleData.bpm[0].systolic))
        var diastolic = Math.round(parseInt(singleData.bpm[0].diastolic))
        var bpDate = moment(singleData.bpm[0]._created_at).format('MM/DD/YY h:mm A')
        var pulse = singleData.bpm[0].pulse
      }
      if (singleData.ws.length === 0) {
        var weight = ''
        var wsDate = ''
      } else {
        var weight = (parseFloat(singleData.ws[0].weight)).toFixed(2);
        var wsDate = moment(singleData.ws[0]._created_at).format('MM/DD/YY h:mm A');
      }
      var name = singleData.name
      var tableRow = {
        name: name,
        bptaken: bpDate,
        bp: systolic + '/' + diastolic,
        pulse: pulse,
        weighttaken: wsDate,
        weight: weight,
      }
      tableDataArray.push(tableRow)
    })
    rows=tableDataArray
    setTableData(tableDataArray)
  }, [patients])
  

  var rows = [];
  const [tableData, setTableData] = React.useState(rows);

  async function addPatient(id) {
    const ref = doc(db, "Doctor", auth.currentUser.email);
    console.log(me)
    setMe({...me, patients: [...me.pacientes, id]})
		await updateDoc(ref, {
			pacientes: arrayUnion(id)
		});

    
  }

  const buttonStyle = {
    backgroundColor: '#FF0088', 
    margin: '1em'
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  $(el).DataTable({
    'retrieve': true,
    'lengthMenu': [[10, 100, -1], [10, 100, "All"]],
    'pageLength': 10
  })
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" style={{ background: '#AC005C' }} className={clsx(classes.appBar, open && classes.appBarShift)} >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Cardio App Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{ backgroundColor: '#C7006A', height: '100%'}}>
          <ListItem button onClick={() => {
            setPatientDashboard(false)
            setSettings(false)
            setMainDashboard(true)
          }}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => {
            setPatientDashboard(false)
            setMainDashboard(false)
            setSettings(true)
          }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => {
            sessionStorage.clear();
            logout();
          }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem></List>
      </Drawer>
      {mainDashboard ?
        <main className={classes.content} show={mainDashboard}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3} >
              <Paper style={{width: '100%', height: '100%'}}>
                <table class="table" ref={el => setEl(el)}>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>??ltima toma de presi??n</th>
                      <th>Presi??n (mmHg)</th>
                      <th>Pulso</th>
                      <th>??ltima medida de peso</th>
                      <th>Peso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr >
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.name}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.bptaken}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.bp}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.pulse}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.weighttaken}</td>
                        <td onClick={() => {
                          setSelectedPatient(row.name)
                          navigatePatient(row.name)
                        }}>{row.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Paper>
            </Grid>

          </Container>
        </main> : console.log('')}

      {patientDashboard ? returnPatient(days) : console.log('Error')}
      {settings ? <main className={classes.content} >
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Paper style={{width: '100%', height: '100%'}}>
              <h4 style={{padding: '1em'}}>A??adir Paciente</h4>
              <p style={{padding: '2em'}}>Solicitudes: </p>
              {allPatients.map((row, index) =>{ 
                return row.doctor == auth.currentUser.email && me.pacientes.filter(function(item) { return item == row.id; }).length == 0 ?
                (  
                    <Paper style={{margin: '1em'}}>
                      <h5 style={{paddingInline: '1.5em', display: 'inline'}}>{row.name}</h5>
                      <Button variant="contained"
                        color="primary"
                        type="submit"
                        style={buttonStyle}
                        className={classes.submit} onClick={() => {addPatient(row.id)}}>
                        Agregar
                      </Button>
                    </Paper>
										
									) : null
                }) 
							}
              <p style={{padding: '2em'}}>No hay m??s solicitudes</p>
            </Paper>
          </Grid>
        </Container>
      </main>
        : console.log('')}

      <Modal show={modalShow} onHide={() => setModalShow(false)} style={{ marginTop: '50px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Notificacion del paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Su notificaci??n ha sido enviada!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalShow(false)}>
            Okay
      </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalShow2} onHide={() => setModalShow2(false)} style={{ marginTop: '50px' }}>
        <Modal.Header closeButton>
          <Modal.Title>Editar paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            id="name"
            label="Nombre"
            name="name"
            autoFocus
            value={selectedPatientFirstName}
            onChange={(event) => setSelectedPatientFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="name"
            label="Apellidos"
            id="name"
            value={selectedPatientLastName}
            onChange={(event) => setSelectedPatientLastName(event.target.value)}
          />

         
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: '15px', width: '40%' }}
            name="email"
            label="Correo"
            value={selectedPatientEmail}
            onChange={(event) => setSelectedPatientEmail(event.target.value)}
          />

          <p>{serverMessage3}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow2(false)}>
            Cerrar
          </Button>
          <Button onClick={deletePatient}>Borrar</Button>
          <Button variant="primary" onClick={savePatientChanges}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}