// import { useState } from "react";
import { firebaseLogin } from "../utils/firebase-auth";
import { Formik, Form } from 'formik';
import { Box, Button, Container, Paper, TextField } from '@material-ui/core';
import { userSchema } from "../utils/yup-schemas";
import { useContext } from "react";
import NotificationContext from "../context/notificationContext";
import LoadingContext from "../context/loadingContext";
import UserContext from "../context/userContext";

function Login({ history }) {

    const { setNotification } = useContext(NotificationContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { setUser } = useContext(UserContext);

    function handleSubmit({ email, password }, { setSubmitting, resetForm }) {
        setIsLoading(true);
        firebaseLogin(email, password)
            .then(u => {
                setUser({ email: u.email });
                setIsLoading(false);
                setNotification({ open: true, message: 'Login Success' });
                resetForm();
                setSubmitting(false);
                history.push('/portal');
            })
            .catch(e => {
                setIsLoading(false);
                setNotification({ open: true, message: e.message });
                setSubmitting(false);
            })
    }

    return <Container maxWidth="xs">
        <Box textAlign="center">
            <h2>Login</h2>
            <Paper elevation={2}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={userSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched, values, handleChange }) => (
                        <Form>
                            <div>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="email"
                                    disabled={isLoading}
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && !!errors.email}
                                    helperText={errors.email} />
                            </div>
                            <div>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="password"
                                    type="password"
                                    disabled={isLoading}
                                    value={values.password}
                                    onChange={handleChange}
                                    error={errors.password && touched.password}
                                    helperText={errors.password} />
                            </div>
                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || isLoading}>Login</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    </Container>
}

export default Login;