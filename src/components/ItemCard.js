import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useState } from "react";

function ItemCard({ item, editMode }) {

    const [editing, setEditing] = useState(editMode);

    function toggleEdit(e) {
        setEditing(!editing);
    }

    return (
        <Card>
            <CardActionArea>
                {(item.imageUrl || item.audioUrl || item.videoUrl) && <CardMedia
                    component={item.imageUrl ? 'img' : 'iframe'}
                    alt="there should be a pic here"
                    width="100%"
                    src={item.imageUrl || item.audioUrl || item.videoUrl}
                    title="there should be a pic here"
                />}
                <CardContent>
                    {editing &&
                        <Formik initialValues={item} onSubmit={toggleEdit}>
                            {() => {
                                return <Form>
                                    {Object.entries(item).map(([key, val]) => {
                                        console.log(key, val);
                                        return (
                                            <TextField
                                                key={key}
                                                value={val}
                                                id={key}
                                                name={key}
                                                type={key}
                                                label={key}
                                                multiline
                                            />
                                        )
                                    })}
                                    <Button type="submit" >Submit</Button>
                                </Form>
                            }}
                        </Formik>}
                    {!editing && <><Typography gutterBottom variant="h5" component="h2">
                        {item.title || item.eventName || item.caption}
                    </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description || item.groupName}
                        </Typography></>}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={toggleEdit} size="small" color="primary">
                    {editing ? 'Save' : 'Edit'}
                </Button>
                <Button size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default ItemCard;