import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventIcon from "@material-ui/icons/Event";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Chart from "../components/Chart";
import Chart2 from "../components/Chart2";
import Chart3 from "../components/Chart3";
import {
  MDBDataTable,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import ProfileIcon from "@material-ui/icons/People";
import EmailIcon from "@material-ui/icons/Email";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import TextField from "@material-ui/core/TextField";
import Moment from "react-moment";
import Modal from "react-bootstrap/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MailService from "../components/notification/mailService";
import MailServiceDoctor from "../components/notification/mailServiceDoctor";
import moment from "moment-timezone";
import "moment/locale/fr";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { child, get, getDatabase, ref } from "firebase/database";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth, Providers, db } from "../config/firebase";
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { CalendarToday } from "@material-ui/icons";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const FormularioDiario = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					sistolica: "",
					distolica: "",
					pulso: "",
					peso: "",
				}}
				validate={(valores) => {
					let errores = {};

					// Validaci??n sist??lica
					if (!valores.sistolica) {
						errores.sistolica = "Por favor ingresa una presi??n sist??lica";
					} else if (!/^[0-9]*$/.test(valores.sistolica)) {
						errores.sistolica =
							"La presi??n sist??lica solo puede contener n??meros";
					}

					// Validaci??n sist??lica
					if (!valores.distolica) {
						errores.distolica = "Por favor ingresa una presi??n diast??lica";
					} else if (!/^[0-9]*$/.test(valores.distolica)) {
						errores.distolica =
							"La presi??n diast??lica solo puede contener n??meros";
					}

					// Validaci??n pulso
					if (!valores.pulso) {
						errores.pulso = "Por favor ingresa un pulso";
					} else if (!/^[0-9]*$/.test(valores.pulso)) {
						errores.pulso = "La presi??n diast??lica solo puede contener n??meros";
					}

					// Validaci??n peso
					if (!valores.peso) {
						errores.peso = "Por favor ingresa un peso";
					} else if (!/^[0-9]*$/.test(valores.peso)) {
						errores.peso = "El peso solo puede contener n??meros";
					}

					return errores;
				}}
				onSubmit={async (valores, { resetForm }) => {
					resetForm();
					console.log("Formulario enviado");
					const ref = doc(db, "Paciente", auth.currentUser.email);
					let bpm = {
						_id: Date.now(),
						systolic: valores.sistolica,
						diastolic: valores.distolica,
						pulse: valores.pulso,
						_created_at: new Date().toISOString(),
						_updated_at: new Date().toISOString(),
					}
					let ws = {
						_id: Date.now(),
						weight: valores.peso,
						_created_at: new Date().toISOString(),
						_updated_at: new Date().toISOString(),
					}

					console.log(bpm)
					console.log(ws)
					await updateDoc(ref, {
						bpm: arrayUnion(bpm),
						ws: arrayUnion(ws)
					});
					cambiarFormularioEnviado(true);
					setTimeout(() => cambiarFormularioEnviado(false), 5000);
					MailService("day");
				}}
			>
				{({ errors }) => (
					<Form style={{ width: "100%", height: "100vh" }} className="formulario">
						<div>
							<label htmlFor="sistolica">Presi??n sist??lica</label>
							<Field
								type="text"
								id="sistolica"
								name="sistolica"
								placeholder="Ej. 120"
							/>
							<ErrorMessage
								name="sistolica"
								component={() => (
									<div className="error">{errors.sistolica}</div>
								)}
							/>
						</div>

						<div>
							<label htmlFor="distolica">Presi??n diast??lica</label>
							<Field
								type="text"
								id="distolica"
								name="distolica"
								placeholder="Ej. 80"
							/>
							<ErrorMessage
								name="distolica"
								component={() => (
									<div className="error">{errors.distolica}</div>
								)}
							/>
						</div>

						<div>
							<label htmlFor="pulso">Pulso</label>
							<Field
								type="text"
								id="pulso"
								name="pulso"
								placeholder="Ej. 100"
							/>
							<ErrorMessage
								name="pulso"
								component={() => <div className="error">{errors.pulso}</div>}
							/>
						</div>

						<div>
							<label htmlFor="peso">Peso</label>
							<Field type="text" id="pulso" name="peso" placeholder="Ej. 70" />
							<ErrorMessage
								name="peso"
								component={() => <div className="error">{errors.peso}</div>}
							/>
						</div>

						<button style={{ backgroundColor: "#ac005c" }} type="submit">Enviar</button>
						{formularioEnviado && (
							<p className="exito">Formulario enviado con ??xito!</p>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

const FormularioSemanal = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					diametroAbdominal: "",
					peso: "",
				}}
				validate={(valores) => {
					let errores = {};

					// Validaci??n diametroAbdominal
					if (!valores.diametroAbdominal) {
						errores.diametroAbdominal =
							"Por favor ingresa tu di??metro abdominal";
					} else if (!/^[0-9]*$/.test(valores.diametroAbdominal)) {
						errores.diametroAbdominal =
							"La presi??n diast??lica solo puede contener n??meros";
					}

					// Validaci??n peso
					if (!valores.peso) {
						errores.peso = "Por favor ingresa un peso";
					} else if (!/^[0-9]*$/.test(valores.peso)) {
						errores.peso = "El peso solo puede contener n??meros";
					}

					return errores;
				}}
				onSubmit={(valores, { resetForm }) => {
					resetForm();
					console.log("Formulario enviado");
					cambiarFormularioEnviado(true);
					setTimeout(() => cambiarFormularioEnviado(false), 5000);
					MailService("week");
				}}
			>
				{({ errors }) => (
					<Form style={{ width: "100%", height: "100vh" }} className="formulario">
						<div>
							<label htmlFor="diametroAbdominal">Diametro abdominal</label>
							<Field
								type="text"
								id="diametroAbdominal"
								name="diametroAbdominal"
								placeholder="Ej. 100"
							/>
							<ErrorMessage
								name="diametroAbdominal"
								component={() => (
									<div className="error">{errors.diametroAbdominal}</div>
								)}
							/>
						</div>

						<div>
							<label htmlFor="peso">Peso</label>
							<Field
								type="text"
								id="diametroAbdominal"
								name="peso"
								placeholder="Ej. 70"
							/>
							<ErrorMessage
								name="peso"
								component={() => <div className="error">{errors.peso}</div>}
							/>
						</div>

						<button style={{ backgroundColor: "#ac005c" }} type="submit">Enviar</button>
						{formularioEnviado && (
							<p className="exito">Formulario enviado con ??xito!</p>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

const FormularioMensual = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					glucosa: "",
					trigliceridos: "",
					LDL: "",
					HDL: "",
				}}
				validate={(valores) => {
					let errores = {};

					// Validaci??n sist??lica
					if (!valores.glucosa) {
						errores.glucosa = "Por favor ingresa tu glucosa";
					} else if (!/^[0-9]*$/.test(valores.glucosa)) {
						errores.glucosa =
							"La presi??n sist??lica solo puede contener n??meros";
					}

					// Validaci??n sist??lica
					if (!valores.trigliceridos) {
						errores.trigliceridos = "Por favor ingresa tus triglic??ridos";
					} else if (!/^[0-9]*$/.test(valores.trigliceridos)) {
						errores.trigliceridos =
							"La presi??n diast??lica solo puede contener n??meros";
					}

					// Validaci??n LDL
					if (!valores.LDL) {
						errores.LDL = "Por favor ingresa un LDL";
					} else if (!/^[0-9]*$/.test(valores.LDL)) {
						errores.LDL = "La presi??n diast??lica solo puede SADDDDDDDDDDDDDDDD";
					}

					// Validaci??n HDL
					if (!valores.HDL) {
						errores.HDL = "Por favor ingresa un HDL";
					} else if (!/^[0-9]*$/.test(valores.HDL)) {
						errores.HDL = "El HDL solo puede contener n??meros";
					}

					return errores;
				}}
				onSubmit={(valores, { resetForm }) => {
					resetForm();
					console.log("Formulario enviado");
					cambiarFormularioEnviado(true);
					setTimeout(() => cambiarFormularioEnviado(false), 5000);
					MailService("month");
				}}
			>
				{({ errors }) => (
					<Form style={{ width: "100%", height: "100vh" }} className="formulario">
						<div>
							<label htmlFor="glucosa">Glucosa</label>
							<Field
								type="text"
								id="glucosa"
								name="glucosa"
								placeholder="Ej. 120"
							/>
							<ErrorMessage
								name="glucosa"
								component={() => <div className="error">{errors.glucosa}</div>}
							/>
						</div>

						<div>
							<label htmlFor="trigliceridos">Triglic??ridos</label>
							<Field
								type="text"
								id="trigliceridos"
								name="trigliceridos"
								placeholder="Ej. 80"
							/>
							<ErrorMessage
								name="trigliceridos"
								component={() => (
									<div className="error">{errors.trigliceridos}</div>
								)}
							/>
						</div>

						<div>
							<label htmlFor="LDL">LDL</label>
							<Field type="text" id="LDL" name="LDL" placeholder="Ej. 100" />
							<ErrorMessage
								name="LDL"
								component={() => <div className="error">{errors.LDL}</div>}
							/>
						</div>

						<div>
							<label htmlFor="HDL">HDL</label>
							<Field type="text" id="LDL" name="HDL" placeholder="Ej. 70" />
							<ErrorMessage
								name="HDL"
								component={() => <div className="error">{errors.HDL}</div>}
							/>
						</div>

						<button style={{ backgroundColor: "#ac005c" }} type="submit">Enviar</button>
						{formularioEnviado && (
							<p className="exito">Formulario enviado con ??xito!</p>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const drawerWidth = 240;

const Dashboard = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [formularioDiario, setFormularioDiario] = useState(true);
  const [settings, setSettings] = useState(false);
  const [formularioMensual, setFormularioMensual] = useState(false);
  const [formularioSemanal, setFormularioSemanal] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessage2, setServerMessage2] = useState("");
  const [serverMessage3, setServerMessage3] = useState("");
  const [selectedPatientFirstName, setSelectedPatientFirstName] = useState("");
  const [selectedPatientLastName, setSelectedPatientLastName] = useState("");
  const [selectedPatientEmail, setSelectedPatientEmail] = useState("");
  const [selectedPatientID, setSelectedPatientID] = useState("");
  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
    let doct = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      doct.push(doc.data());
    });
    console.log(doct);
    setDoctors(doct);
  }, []);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "Paciente"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().id == auth.currentUser.email) {
        if (doc.data().doctor != "") {
          setDoctor(doc.data().doctor);
        }
      }
    });
  }, []);

  async function addPatient() {
    const ref = doc(db, "Paciente", auth.currentUser.email);

    await updateDoc(ref, {
      doctor: doctor,
    });

    MailServiceDoctor(doctor, doctorName);
  }

  const buttonStyle = {
    backgroundColor: "#FF0088",
    margin: "1em",
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function resetPassword() {}

  function deletePatient() {}

  function savePatientChanges() {}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        style={{ background: "#AC005C" }}
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
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
        <List style={{ backgroundColor: "#C7006A", height: "100%" }}>
          <ListItem
            button
            onClick={() => {
              setFormularioDiario(true);
              setFormularioSemanal(false);
              setFormularioMensual(false);
              setSettings(false);
            }}
          >
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary="Diario" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setFormularioDiario(false);
              setFormularioSemanal(false);
              setFormularioMensual(false);
              setSettings(true);
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              sessionStorage.clear();
              logout()
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      {formularioDiario ? <FormularioDiario></FormularioDiario> : null}
      {formularioSemanal ? <FormularioSemanal></FormularioSemanal> : null}
      {formularioMensual ? <FormularioMensual></FormularioMensual> : null}
      {settings ? (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Paper style={{ width: "100%", height: "100%" }}>
			  {doctor != '' ?
								<h4 style={{ padding: '1em' }}>Doctor actual: {doctors.filter(function(item) { return item.id == doctor; })[0].name}</h4>: null
							}
							<h4 style={{ padding: '1em' }}>{doctor != '' ? 'Cambiar' :"A??adir"} Doctor</h4>
							<form>
								<FormControl className={classes.formControl} style={{ marginLeft: '1em' }}>
									<InputLabel id="demo-simple-select-label" style={{ width: '200%' }}>Nombre del doctor</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										style={{ width: '200%' }}
										onChange={async (event) => {
											setDoctor(event.target.value.id);
                        setDoctorName(event.target.value.name);
										}}
									>
										{doctors.map((row, index) =>(
												<MenuItem value={row}>{row.name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
                  <p>{serverMessage2}</p>
                </form>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={buttonStyle}
                  className={classes.submit}
                  onClick={addPatient}
                >
                  Agregar
                </Button>
              </Paper>
            </Grid>
          </Container>
        </main>
      ) : (
        console.log("")
      )}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        style={{ marginTop: "50px" }}
      >
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

      <Modal
        show={modalShow2}
        onHide={() => setModalShow2(false)}
        style={{ marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: "15px", width: "40%" }}
            id="name"
            label="Nombre"
            name="name"
            autoFocus
            value={selectedPatientFirstName}
            onChange={(event) =>
              setSelectedPatientFirstName(event.target.value)
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ marginLeft: "15px", width: "40%" }}
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
            style={{ marginLeft: "15px", width: "40%" }}
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
};

export default Dashboard;
