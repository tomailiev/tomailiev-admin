import { Box, Button, Dialog, } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import LoadingContext from "../context/loadingContext";
import NotificationContext from "../context/notificationContext";
import * as handleSubmission from '../utils/handleSubmission';
import ItemCard from "./ItemCard";
// import { getContent } from "../utils/firebase-db";
import TypeContext from "../context/typeContext";
// import { formFields } from "./FormFields";
import Featured from "./FormFields/Featured";
import DateTime from "./FormFields/DateTime";
import GroupName from "./FormFields/GroupName";
import OtherField from "./FormFields/OtherField";

function ItemAddForm(props) {

    const { setNotification } = useContext(NotificationContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { type } = useContext(TypeContext);
    const [featured, setFeatured] = useState(props.initialValues.featured);
    const [item, setItem] = useState(null);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     if (type === 'events') {
    //         getContent('groups')
    //             .then(setGroups)
    //             .catch(e => setNotification(e.message));
    //     }
    // }, [type, setNotification]);

    const handleSubmit = (e, { setSubmitting }) => {
        if (handleSubmission[type]) {
            setIsLoading(true);
            handleSubmission[type](e)
                .then(i => {
                    setItem(Object.assign(i, { featured }));
                    setSubmitting(false);
                    setOpen(true);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                    setNotification({ open: true, message: err.message });
                    setSubmitting(false);
                });
        } else {
            console.log(e)
            setItem(e);
            setSubmitting(false);
            setOpen(true);
        }
    }

    return (
        <Box textAlign="center">
            <Formik
                initialValues={props.initialValues}
                onSubmit={handleSubmit}
                validationSchema={props.validationSchema}
            >
                {(formProps) => (
                    <Form>
                        {Object.keys(props.initialValues).map(x => {
                            return x === 'featured'
                                ? (
                                    <div key={x}>
                                        <Featured featuredValue={featured} setFeatured={setFeatured} />
                                    </div>
                                ) : x === 'dateTime'
                                    ? (<div key={x}>
                                        <DateTime {...formProps} />
                                    </div>)
                                    : x === 'groupName'
                                        ? (
                                            <div key={x}>
                                                <GroupName {...formProps} />
                                            </div>
                                        )
                                        : (
                                            <div key={x}>
                                                <OtherField fieldType={x} {...formProps} />
                                            </div>
                                        );
                        })}
                        <Button variant="contained" color="primary" type="submit" disabled={formProps.isSubmitting}>Preview</Button>
                        <Button variant="contained" color="primary" type="button" onClick={() => formProps.resetForm()} >Cancel</Button>

                    </Form>
                )}
            </Formik>
            {item && <Dialog open={open} onClose={() => setOpen(false)}><ItemCard type={type} item={item} /></Dialog>}
        </Box>
    )
}

export default ItemAddForm