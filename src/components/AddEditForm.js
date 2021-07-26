import { Button, FormControlLabel, Switch, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import NotificationContext from "../context/notificationContext";
import * as handleSubmission from '../utils/handleSubmission';
import ItemCard from "./ItemCard";

function AddEditForm(props) {

    const { setNotification } = useContext(NotificationContext);
    const [featured, setFeatured] = useState(props.initialValues.featured);
    const [item, setItem] = useState(null);


    const handleSubmit = (e, { setSubmitting }) => {
        if (handleSubmission[props.type]) {
            handleSubmission[props.type](e)
                .then(i => {
                    console.log(i);
                    setItem(Object.assign(i, featured));
                    setSubmitting(false);
                })
                .catch(err => {
                    setNotification(err);
                    setSubmitting(false);
                });
        } else {
            console.log(e)
            setItem(e);
            setSubmitting(false);
        }
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
                {({ isSubmitting, errors, touched, values, handleChange, resetForm }) => (
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

                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>Preview</Button>
                        <Button variant="contained" color="primary" type="button" onClick={() => resetForm()} >Cancel</Button>

                    </Form>
                )}
            </Formik>
            {item && <ItemCard item={item} />}
        </div>
    )
}

export default AddEditForm