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
import moment from "moment-timezone";
import "moment/locale/fr";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { child, get, getDatabase, ref } from "firebase/database";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CalendarToday } from "@material-ui/icons";

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

          // Validación sistólica
          if (!valores.sistolica) {
            errores.sistolica = "Por favor ingresa una presión sistólica";
          } else if (!/^[0-9]*$/.test(valores.sistolica)) {
            errores.sistolica =
              "La presión sistólica solo puede contener números";
          }

          // Validación sistólica
          if (!valores.distolica) {
            errores.distolica = "Por favor ingresa una presión diastólica";
          } else if (!/^[0-9]*$/.test(valores.distolica)) {
            errores.distolica =
              "La presión diastólica solo puede contener números";
          }

          // Validación pulso
          if (!valores.pulso) {
            errores.pulso = "Por favor ingresa un pulso";
          } else if (!/^[0-9]*$/.test(valores.pulso)) {
            errores.pulso = "La presión diastólica solo puede contener números";
          }

          // Validación peso
          if (!valores.peso) {
            errores.peso = "Por favor ingresa un peso";
          } else if (!/^[0-9]*$/.test(valores.peso)) {
            errores.peso = "El peso solo puede contener números";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
          MailService("day");
        }}
      >
        {({ errors }) => (
          <Form className="formulario" style={{ width: "100%" }}>
            <div>
              <label htmlFor="sistolica">Presión sistólica</label>
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
              <label htmlFor="distolica">Presión diastólica</label>
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

            <div>
              <label>
                <Field type="radio" name="sexo" value="hombre" /> hombre
              </label>
              <label>
                <Field type="radio" name="sexo" value="mujer" /> mujer
              </label>
            </div>

            <div>
              <Field
                name="mensaje"
                as="textarea"
                placeholder="Comentarios para el doctor"
              />
            </div>
            <button style={{ backgroundColor: "#ac005c" }} type="submit">
              Enviar
            </button>
            {formularioEnviado && (
              <p className="exito">Formulario enviado con éxito!</p>
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

          // Validación diametroAbdominal
          if (!valores.diametroAbdominal) {
            errores.diametroAbdominal =
              "Por favor ingresa tu diámetro abdominal";
          } else if (!/^[0-9]*$/.test(valores.diametroAbdominal)) {
            errores.diametroAbdominal =
              "La presión diastólica solo puede contener números";
          }

          // Validación peso
          if (!valores.peso) {
            errores.peso = "Por favor ingresa un peso";
          } else if (!/^[0-9]*$/.test(valores.peso)) {
            errores.peso = "El peso solo puede contener números";
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
          <Form
            className="formulario"
            style={{ width: "100%", height: "100vh" }}
          >
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

            <button style={{ backgroundColor: "#ac005c" }} type="submit">
              Enviar
            </button>
            {formularioEnviado && (
              <p className="exito">Formulario enviado con éxito!</p>
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

          // Validación sistólica
          if (!valores.glucosa) {
            errores.glucosa = "Por favor ingresa tu glucosa";
          } else if (!/^[0-9]*$/.test(valores.glucosa)) {
            errores.glucosa =
              "La presión sistólica solo puede contener números";
          }

          // Validación sistólica
          if (!valores.trigliceridos) {
            errores.trigliceridos = "Por favor ingresa tus triglicéridos";
          } else if (!/^[0-9]*$/.test(valores.trigliceridos)) {
            errores.trigliceridos =
              "La presión diastólica solo puede contener números";
          }

          // Validación LDL
          if (!valores.LDL) {
            errores.LDL = "Por favor ingresa un LDL";
          } else if (!/^[0-9]*$/.test(valores.LDL)) {
            errores.LDL = "La presión diastólica solo puede SADDDDDDDDDDDDDDDD";
          }

          // Validación HDL
          if (!valores.HDL) {
            errores.HDL = "Por favor ingresa un HDL";
          } else if (!/^[0-9]*$/.test(valores.HDL)) {
            errores.HDL = "El HDL solo puede contener números";
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
          <Form className="formulario" style={{ width: "100%" }}>
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
              <label htmlFor="trigliceridos">Triglicéridos</label>
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

            <div>
              <label>
                <Field type="radio" name="sexo" value="hombre" /> hombre
              </label>
              <label>
                <Field type="radio" name="sexo" value="mujer" /> mujer
              </label>
            </div>

            <div>
              <Field
                name="mensaje"
                as="textarea"
                placeholder="Comentarios para el doctor"
              />
            </div>

            <button style={{ backgroundColor: "#ac005c" }} type="submit">
              Enviar
            </button>
            {formularioEnviado && (
              <p className="exito">Formulario enviado con éxito!</p>
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

  function addPatient() {
    var inputValue = {
      patientFirstName: patientFirstName,
      patientLastName: patientLastName,
      patientEmail: patientEmail,
    };
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
              setFormularioSemanal(true);
              setFormularioMensual(false);
              setSettings(false);
            }}
          >
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Semanal" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setFormularioDiario(false);
              setFormularioSemanal(false);
              setFormularioMensual(true);
              setSettings(false);
            }}
          >
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText primary="Mensual" />
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
              props.history.push("/");
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
                <h4 style={{ padding: "1em" }}>Cambiar contraseña</h4>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Nueva contraseña"
                    type="Password"
                    name="email"
                    autoFocus
                    onChange={(event) => setPassword1(event.target.value)}
                    style={{ marginLeft: "1em", width: "90%" }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirmar nueva contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => setPassword2(event.target.value)}
                    style={{ marginLeft: "1em", width: "90%" }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submit}
                    onClick={resetPassword}
                    style={buttonStyle}
                  >
                    Reiniciar Contraseña
                  </Button>
                  <p>{serverMessage}</p>
                </form>
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
          <p>Su notificación ha sido enviada!</p>
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
