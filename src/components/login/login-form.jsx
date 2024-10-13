
'use client';
import { loginAction } from '@/actions/auth-actions';
import { initialResponse } from '@/helpers/form-validation';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Row
} from 'react-bootstrap';
import { useFormState } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import './login-form.scss';
import PasswordInput from '../common/form-fields/password-input';
import SubmitButton from '../common/form-fields/submit-button';

const LoginForm = () => {
    const [state, dispatch] = useFormState(loginAction, initialResponse);//Formun durumunu ve dispatch fonksiyonunu tutar
    const router = useRouter();//Sayfalar arası geçiş yapmayı sağlar
    const searchParams = useSearchParams();//URL'deki parametreleri alır
    const [username, setUsername] = useState('');//Kullanıcı adını tutar
    const [redirectLink, setRedirectLink] = useState('');//Yönlendirelecek linki tutar
    const [user, setUser] = useState('');

    //Kullanıcı adını ve yönlendirilecek linki alır
    useEffect(() => {
        // Get the username from the query parameters
        const usernameFromQuery = searchParams.get('username');
        const linkFromQuery = searchParams.get('link');
        const userFromQuery = searchParams.get('user');
        if (usernameFromQuery && linkFromQuery) {
            setUsername(usernameFromQuery);
            setRedirectLink(linkFromQuery);
            setUser(userFromQuery);
        } else {
            router.push('/'); //Anasayfaya yönlendirir
        }
    }, [router, searchParams]);

    const handleLoginSuccess = () => {
        router.push(redirectLink); // Redirect to the appropriate page
    };

    

    return (
        <Container className="login-form">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="card">
                        <Card.Body>
                            <h4>Lütfen Şifrenizi Girin</h4>

                            {state?.message ? (
                                <Alert variant="danger">{state?.message}</Alert>
                            ) : null}

                            <Form action={dispatch} noValidate>
                                <Form.Group className="mb-3" controlId="user">
                                    <Form.Label>{user}</Form.Label>
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="username"
                                >
                                    <Form.Control
                                        type="hidden"
                                        name="username"
                                        value={username}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="password"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <PasswordInput
                                        name="password"
                                        placeholder="**********"
                                        error={state?.errors?.password}
                                    />
                                </Form.Group>
                                <SubmitButton onSubmit={handleLoginSuccess}>
                                    Login
                                </SubmitButton>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
