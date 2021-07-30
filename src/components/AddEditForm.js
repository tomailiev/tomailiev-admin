import { Button, Dialog, FormControlLabel, Switch, TextField } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Form, Formik } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import { useContext, useState } from "react";
import LoadingContext from "../context/loadingContext";
import NotificationContext from "../context/notificationContext";
import * as handleSubmission from '../utils/handleSubmission';
import ItemCard from "./ItemCard";

function AddEditForm(props) {

    const { setNotification } = useContext(NotificationContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [featured, setFeatured] = useState(props.initialValues.featured);
    const [item, setItem] = useState(null);
    const [open, setOpen] = useState(false);


    const handleSubmit = (e, { setSubmitting }) => {
        if (handleSubmission[props.type]) {
            setIsLoading(true);
            handleSubmission[props.type](e)
                .then(i => {
                    setItem(Object.assign(i, featured));
                    setSubmitting(false);
                    setOpen(true);
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsLoading(false);
                    setNotification(err);
                    setSubmitting(false);
                });
        } else {
            console.log(e)
            setItem(e);
            setSubmitting(false);
            setOpen(true);
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
                {({ isSubmitting, errors, touched, values, handleChange, resetForm, setFieldValue }) => (
                    <Form>
                        {Object.keys(props.initialValues).map(x => {
                            return x === 'featured'
                                ? (
                                    <div>
                                        <FormControlLabel
                                            control={<Switch checked={featured} onChange={handleSwitchChange} name="checkedA" />}
                                            label={x}
                                        />
                                    </div>
                                ) : x === 'dateTime'
                                    ? (<div>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DateTimePicker
                                                InputLabelProps={{ shrink: true }}
                                                id={x}
                                                ampm={false}
                                                name={x}
                                                value={values[x]}
                                                onChange={date => setFieldValue(x, date)}
                                                label={x}
                                                onError={console.log}
                                                minDate={new Date()}
                                                format="yyyy/MM/dd hh:mm"
                                                error={touched[x] && !!errors[x]}
                                                helperText={errors[x]}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>)
                                    : (
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
                                    );

                        })}

                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>Preview</Button>
                        <Button variant="contained" color="primary" type="button" onClick={() => resetForm()} >Cancel</Button>

                    </Form>
                )}
            </Formik>
            {item && <Dialog open={open} onClose={() => setOpen(false)}><ItemCard item={item} /></Dialog>}
        </div >
    )
}

export default AddEditForm