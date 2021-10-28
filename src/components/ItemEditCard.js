import { Form, Formik } from "formik";
import { Button, Card, CardActions, CardContent, FormControlLabel, Switch, TextField } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useContext, useState } from "react";
import { uploadData } from "../utils/firebase-db";
import TypeContext from "../context/typeContext";


function ItemEditCard({ item, switchEditing }) {

    const { type } = useContext(TypeContext);
    const [featured, setFeatured] = useState(!!item.featured);
    const [eventDate, setEventDate] = useState(item.dateTime instanceof Date
        ? item.dateTime
        : item.dateTime instanceof Object
            ? item.dateTime?.toDate()
            : new Date(item.dateTime));

    function handleSubmit(e, o) {
        if (type === 'events') {
            e.dateTime = eventDate
        }
        switchEditing();
        uploadData(type, e)
            .then(console.log)
            .catch(console.error);
    }

    return (
        <Card>
            <Formik
                initialValues={item}
                onSubmit={handleSubmit}
            // validationSchema={props.validationSchema}
            >
                {({ isSubmitting, errors, touched, values, handleChange, setFieldValue, resetForm }) => (
                    <Form>
                        <CardContent>
                            {Object.entries(item).map(([key, value]) => {
                                // console.log(`${key} ==> ${value}`);
                                if (key === 'id') { return null; }

                                return key === 'featured'
                                    ? (
                                        <div key={key}>
                                            <FormControlLabel
                                                control={<Switch checked={featured} onChange={(e) => setFeatured(!featured)} name="featured" />}
                                                label={key}
                                            />
                                        </div>
                                    ) : key === 'dateTime'
                                        ? (<div key={key}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DateTimePicker
                                                    InputLabelProps={{ shrink: true }}
                                                    id={key}
                                                    ampm={false}
                                                    name={key}
                                                    value={eventDate}
                                                    onChange={date => setEventDate(date)}
                                                    label={key}
                                                    onError={console.log}
                                                    // minDate={new Date()}
                                                    format="yyyy/MM/dd hh:mm"
                                                    error={touched[key] && !!errors[key]}
                                                    helperText={errors[key]}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>)
                                        : (
                                            <div key={key}>
                                                <TextField
                                                    multiline
                                                    id={key}
                                                    name={key}
                                                    type={key}
                                                    label={key}
                                                    value={values[key]}
                                                    onChange={handleChange}
                                                    error={touched[key] && !!errors[key]}
                                                    helperText={errors[key]} />
                                            </div>
                                        );
                            })}
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" type="submit">
                                Save
                            </Button>
                            <Button size="small" color="primary" onClick={() => { resetForm(); switchEditing(); }}>
                                Cancel
                            </Button>
                        </CardActions>
                    </Form>
                )}
            </Formik>
        </Card>
    )
}

export default ItemEditCard;