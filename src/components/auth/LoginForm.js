import React, {useState} from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import { Typography, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [paternalSurname, setPaternalSurname] = useState("");
    const [maternalSurname, setMaternalSurname] = useState("");

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
            .then((userCredential) => {
                setDisabled(true);
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
    }

    const createUserWithEmailAndPwd = () => {
        setDisabled(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                console.log("Error: " + error.message);
            });
    };

    if(props.authState === 0){
        return (
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
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
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
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
                        <Button
                            disabled={disabled}
                            variant="contained"
                            onClick={signInWithGoogle}
                        >
                            <GoogleIcon /> Conectate con Google
                        </Button>
                        <Typography sx={{ mt: 2 }} color={"red"}>
                            {errorMessage}
                        </Typography>
                    </Center>
                </Row>
            </Container>
        );
    }else{
        return (
            <Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group className="mb" controlId="formBasicPassword">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                onChange={event => setName(event.target.value)}
                                value={name}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb" controlId="formBasicPassword">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellido Paterno"
                                onChange={event => setPaternalSurname(event.target.value)}
                                value={paternalSurname}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido Materno"
                        onChange={event => setMaternalSurname(event.target.value)}
                        value={maternalSurname}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(event) => setEmail(event.target.value)}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
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
                        <Form.Group className="mb" controlId="formBasicPassword" onChange={(event) => setPassword(event.target.value)}>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={event => setPassword(event.target.value)}
                                value={password}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb" controlId="formBasicPassword">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Center height="auto">
                            <Button
                                className="mt-3"
                                variant="outlined"
                                onClick={createUserWithEmailAndPwd}
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