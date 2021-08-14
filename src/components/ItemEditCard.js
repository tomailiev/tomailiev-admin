import { Form, Formik } from "formik";
import { Button, Card, CardActions, CardContent, FormControlLabel, Switch, TextField } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useState } from "react";


function ItemEditCard({ item, switchEditing }) {

    const [featured, setFeatured] = useState(!!item.featured);
    const [eventDate, setEventDate] = useState(item.dateTime?.toDate());

    function handleSubmit(e, o) {
        console.log(e);
        switchEditing();
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
                                                    helperTekeyt={errors[key]} />
                                            </div>
                                        );
                            })}
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" type="submit">
                                Save
                            </Button>
                            <Button size="small" color="primary" onClick={() => resetForm()}>
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