import React, {useState} from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

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

    const createUserWithEmailAndPwd = (event) => {
        setDisabled(true);
        console.log("Email: " + email + " Pwd: " + password);
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
                            <Form.Control type="text" placeholder="Nombre" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Center height={"auto"}>
                        <Button
                            disabled={disabled}
                            variant="primary"
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
                <Row>
                    <Col>
                        <Form.Group className="mb" controlId="formBasicPassword">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb" controlId="formBasicPassword">
                            <Form.Label>Apellido Paterno</Form.Label>
                            <Form.Control type="text" placeholder="Apellido Paterno" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control type="text" placeholder="Apellido Materno" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(event) => setEmail(event.target.value)}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb" controlId="formBasicPassword" onChange={(event) => setPassword(event.target.value)}>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
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
                        <Button className="mt-3" variant="primary" onClick={createUserWithEmailAndPwd}>
                            Registrarse
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
};

export default LoginForm;