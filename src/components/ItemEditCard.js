import { Form, Formik } from "formik";
import { Button, Card, CardActions, CardContent } from '@material-ui/core'
import { useContext, useState } from "react";
import { uploadData } from "../utils/firebase-db";
import TypeContext from "../context/typeContext";
import LoadingContext from "../context/loadingContext";
import NotificationContext from "../context/notificationContext";
import Featured from "./FormFields/Featured";
import DateTime from "./FormFields/DateTime";
import GroupName from "./FormFields/GroupName";
import OtherField from "./FormFields/OtherField";

function ItemEditCard({ item, switchEditing }) {

    const { type } = useContext(TypeContext);
    const { setNotification } = useContext(NotificationContext);
    const { setIsLoading } = useContext(LoadingContext);
    // const [eventDate, setEventDate] = useState(item.dateTime);
    const [featured, setFeatured] = useState(item.featured);


    function handleSubmit(e, o) {
        setIsLoading(true);
        // if (type === 'events') {
        //     e.dateTime = eventDate.toString();
        // }
        if (type === 'audios' || type === 'videos' || type === 'recs') {
            e.featured = featured;
        }
        uploadData(type, e)
            .then(() => {
                setIsLoading(false);
                switchEditing();
                setNotification('Upload successful');
            })
            .catch(e => {
                setNotification(e);
                switchEditing();
            });
    }

    return (
        <Card>
            <Formik
                initialValues={item}
                onSubmit={handleSubmit}
            >
                {(formProps) => (
                    <Form>
                        <CardContent>
                            {Object.entries(item).map(([key, value]) => {
                                if (key === 'id') { return null; }
                                return key === 'featured'
                                    ? (
                                        <div key={key}>
                                            <Featured featuredValue={featured} setFeatured={setFeatured} />
                                        </div>
                                    ) : key === 'dateTime'
                                        ? (<div key={key}>
                                            <DateTime {...formProps} />
                                        </div>)
                                        : key === 'groupName'
                                            ? (
                                                <div key={key}>
                                                    <GroupName {...formProps} />
                                                </div>
                                            )
                                            : (
                                                <div key={key}>
                                                    <OtherField fieldType={key} {...formProps} />
                                                </div>
                                            );
                            })}
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" type="submit">
                                Save
                            </Button>
                            <Button size="small" color="primary" onClick={() => { formProps.resetForm(); switchEditing(); }}>
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