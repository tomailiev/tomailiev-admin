// import { useState } from "react";
import { firebaseLogin } from "../utils/firebase-auth";
import { Formik, Form, Field } from 'formik'
import { userSchema } from "../utils/yup-schemas";

function Login() {

    return <div>
        <h2>Login</h2>
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={userSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);

                }, 400);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <div><Field type="email" name="email" /></div>
                    {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                    ) : null}
                    <div><Field type="password" name="password" /></div>
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                    ) : null}
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default Login;