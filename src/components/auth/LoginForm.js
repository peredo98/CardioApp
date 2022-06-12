import React, {useState} from "react";
import { Form, Row, Col, Container, Select } from "react-bootstrap";
import { Typography, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers, db} from "../../config/firebase";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import login from "../../screens/Login";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("");
    const [paternalSurname, setPaternalSurname] = useState("");
    const [maternalSurname, setMaternalSurname] = useState("");
    const [validated, setValidated] = useState(false);

    const signInWithGoogle = () => {
        setDisabled(true);
        signInWithPopup(auth, Providers.google)
            .then(() => {
                setDisabled(false);
                console.info("TODO: navigate to authenticated screen");
                navigate("/");
            })
            .catch((error) => {
                setErrorMessage(error.code + ": " + error.message);
                setDisabled(false);
            });
    };

    const signInWithEmailAndPwd = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setDisabled(true);
                const user = userCredential.user;
                const querySnapshot = await getDocs(collection(db, "Doctor"));
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if(doc.data().id == email){
                        navigate("../", {replace: true}); 
                    }
                });
                const querySnapshot2 = await getDocs(collection(db, "Paciente"));
                querySnapshot2.forEach((doc) => {
                    if(doc.data().id == email){
                        navigate("../paciente", {replace: true});
                    }
                });
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
    }

    const createUserWithEmailAndPwd = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if(form.checkValidity() === false) {
            setValidated(true);
        } else {
            setDisabled(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // const user = userCredential.user;
                    console.log(userType);
                    if(userType === "Doctor") {
                        setDoc(doc(db, "Doctor", email), {
                            id: email,
                            name: name + ' ' + paternalSurname + ' ' + maternalSurname,
                            email: email,
                            pacientes: [],
                            type: userType
                        }).then(r => {
                            // TODO: Redirect
                            console.log("Document created - ref: " + r);
                            navigate("../", {replace: true});
                        });
                    } else {
                        setDoc(doc(db, "Paciente", email), {
                            id: email,
                            name: name + ' ' + paternalSurname + ' ' + maternalSurname,
                            email: email,
                            bpm: [],
                            ws: [],
                            da: [],
                            gluc: [],
                            doctor: '',
                            type: userType
                        }).then(r => {
                            // TODO: Redirect
                            console.log("Document created - ref: " + r);
                            navigate("../paciente", {replace: true});
                        });
                    }
                })
                .catch((error) => {
                    console.log("Error: " + error.message);
                });
        }
    };

    if(props.authState === 0){
        return (
            <Form>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Center height={"auto"}>
                            <Button
                                disabled={disabled}
                                variant="outlined"
                                onClick={signInWithEmailAndPwd}
                                sx={{ marginBottom: 1, width: "100%" }}
                            >
                                Conectate
                            </Button>
                            <Typography sx={{ mt: 2 }} color={"red"}>
                                {errorMessage}
                            </Typography>
                        </Center>
                    </Row>
                </Container>
            </Form>
        );
    }else{
        return (
            <Form
                noValidate
                validated={validated}
                onSubmit={createUserWithEmailAndPwd}
            >
                <Row className="mb-3">
                    <Col>
                        <Form.Group className="mb">
                            <Form.Label>Tipo de usuario</Form.Label>
                            <Form.Select
                                required
                                onChange={event => setUserType(event.target.value)}
                            >
                                <option>Selecciona...</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Paciente">Paciente</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Nombre"
                                onChange={event => setName(event.target.value)}
                                value={name}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Apellido Paterno"
                                onChange={event => setPaternalSurname(event.target.value)}
                                value={paternalSurname}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido Materno</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Apellido Materno"
                                onChange={event => setMaternalSurname(event.target.value)}
                                value={maternalSurname}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(event) => setEmail(event.target.value)}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb" onChange={(event) => setPassword(event.target.value)}>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                onChange={event => setPassword(event.target.value)}
                                value={password}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Center height="auto">
                            <Button
                                type="submit"
                                className="mt-3"
                                variant="outlined"
                            >
                                Registrarse
                            </Button>
                        </Center>
                    </Col>
                </Row>
            </Form>
        );
    }
};

export default LoginForm;