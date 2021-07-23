// import { useState } from "react";
import { firebaseLogin } from "../utils/firebase-auth";
import { Formik, Form } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { userSchema } from "../utils/yup-schemas";
import { useContext } from "react";
import NotificationContext from "../context/notificationContext";

function Login({ history }) {

    const { setNotification } = useContext(NotificationContext);

    function handleSubmit({ email, password }, { setSubmitting, resetForm }) {
        firebaseLogin(email, password)
            .then(u => {
                setNotification({ open: true, message: 'Login Success' });
                resetForm();
                history.push('/portal');
                setSubmitting(false);
            })
            .catch(e => {
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