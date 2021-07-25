import { Button, FormControlLabel, Switch, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useState } from "react";

function AddEditForm(props) {

    const [featured, setFeatured] = useState(props.initialValues.featured);

    const handleSubmit = (e, { setSubmitting, resetForm }) => {
        console.log(e);
    }

    const handleSwitchChange = (e) => {
        setFeatured(e.target.checked);
    }

    return (
        <div>
            <Formik
                initialValues={props.initialValues}
                onSubmit={handleSubmit}
                validationSchema={props.validationSchema}
            >
                {({ isSubmitting, errors, touched, values, handleChange }) => (
                    <Form>
                        {Object.keys(props.initialValues).map(x => {
                            return x !== 'featured'
                                ? (
                                    <div>
                                        <TextField
                                            id={x}
                                            name={x}
                                            type={x}
                                            label={x}
                                            value={values[x]}
                                            onChange={handleChange}
                                            error={touched[x] && !!errors[x]}
                                            helperText={errors[x]} />
                                    </div>
                                )
                                : (
                                    <div>
                                        <FormControlLabel
                                            control={<Switch checked={featured} onChange={handleSwitchChange} name="checkedA" />}
                                            label={x}
                                        />
                                    </div>
                                )
                        })}

                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>Save</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddEditForm