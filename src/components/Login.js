// import { useState } from "react";
import { firebaseLogin } from "../utils/firebase-auth";
import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { userSchema } from "../utils/yup-schemas";
import { useContext } from "react";
import NotificationContext from "../context/notificationContext";
import LoadingContext from "../context/loadingContext";
import UserContext from "../context/userContext";

function Login({ history }) {

    const { setNotification } = useContext(NotificationContext);
    const { setIsLoading } = useContext(LoadingContext);
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

    return <div>
        <h2>Login</h2>
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
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password && touched.password}
                            helperText={errors.password} />
                    </div>
                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>Login</Button>
                </Form>
            )}
        </Formik>
    </div>
}

export default Login;